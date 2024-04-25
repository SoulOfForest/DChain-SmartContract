// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IOracleSimple.sol";
import "./interfaces/IDChainStaking.sol";
import "./interfaces/IDDXVault.sol";
import "./interfaces/IDDXStaking.sol";
import "./DChainBase.sol";
import "hardhat/console.sol";

contract DGEStaking is DChainBase, IDDXStaking {
    struct StakingInfo {
        uint256 totalStakes;
        uint256 totalStakesInUSD;
        uint256 claimedInterest;
        uint64 dueDate;
        uint64 timeStake;
        uint64 lastClaimedTime;
        uint64 lastUpdatedTime;
        uint64 createdAt;
    }

    // Info of each pool.
    struct PoolInfo {
        uint256 minDepositInUSD; // minimun amount that can be deposit
        uint64 period; // period of pool
        uint64 APR; // APR of pool : 5000 = 50%
        bool status; // status of pool
        uint64 lastUpdated;
    }

    struct OfferedCurrency {
        uint256 decimal;
        uint256 rate;
    }

    uint64 private constant INTEREST_RATE_PRECISION_POINT = 10000; 
    uint32 private constant ONE_DAY_IN_SECONDS = 1 days;
    uint32 private constant ONE_YEAR_IN_SECONDS = 365 days;

    IERC20WithBurn public rewardToken;

    IDDXVault public vault;
    IDChainStaking public dwStaking;
    
    address public treasury;
    address public admin;

    address public oracle;

    uint256 public totalStaked;

    bool public emergencyCancelled;

    // Asset token -> Offered Currency (to $)
    mapping(address => OfferedCurrency) public offeredCurrencies;
    // user -> current staking infos
    mapping(uint => mapping(address => StakingInfo)) public stakingInfos;

    // Info of each pool.
    PoolInfo[] public poolInfo;

    event Deposited(uint256 indexed pid, address indexed user, uint256 amount, uint256 amountInUSD);
    event Withdraw(address indexed user, uint256 amount);
    event RewardHarvested(address indexed claimer, uint indexed pid, uint256 amount, uint256 amountInUSD);
    event Withdrawed(address indexed claimer, uint indexed pid, uint256 amount, uint256 amountInUSD);
    event PoolAdded(uint256 _minDepositInUSD, uint64 _APR, uint128 _period);    
    
    function initialize(address _owner, address _oracle, address _treasury, IERC20WithBurn _rewardToken, IDChainStaking _dwStaking) external initializer {
        __DChainBase_init(_owner);
        
        /// @dev: ZA - Zero address
        require(_treasury != address(0), "ZA");
        require(address(_rewardToken) != address(0), "ZA");
        require(address(_dwStaking) != address(0), "ZA");

        dwStaking = _dwStaking;
        treasury = _treasury;
        rewardToken = _rewardToken;
        admin = msg.sender;
        oracle = _oracle;

        _setupRole(SUB_ADMIN_ROLE, _owner);

        // Max approve for transfer from 
        rewardToken.approve(address(this), type(uint256).max);
    }
    
    /// -----------------------------------
    /// --------- Update Function ---------
    /// -----------------------------------

    function setDDXVault(IDDXVault _vault) external onlyRole(SUB_ADMIN_ROLE) {
        require(address(_vault) != address(0), "pool: DDX vault cannot be zero address");
        vault = _vault;
    }


    // how to convert from 1 Token - to $
    function setOfferedCurrency(address _currency, uint _rate, uint _decimal) external onlyRole(SUB_ADMIN_ROLE) {
        OfferedCurrency storage offeredCurrency = offeredCurrencies[_currency];
        offeredCurrency.rate = _rate;
        offeredCurrency.decimal = _decimal;
    }


    /// -----------------------------------
    /// ---------- Core Function ----------
    /// -----------------------------------

    function setPoolPeriod(uint _pid, uint64 _period) external onlyRole(SUB_ADMIN_ROLE) {        
        PoolInfo storage pool = poolInfo[_pid];
        require(pool.status, "This pool is close");

        pool.period = _period;
        pool.lastUpdated = uint64(block.timestamp);
    }

    function setPoolAPR(uint _pid, uint64 _apr) external onlyRole(SUB_ADMIN_ROLE) {        
        PoolInfo storage pool = poolInfo[_pid];
        require(pool.status, "This pool is close");
        require(_apr <= INTEREST_RATE_PRECISION_POINT, "pool apr is too high");

        pool.APR = _apr;
        pool.lastUpdated = uint64(block.timestamp);
    }

    function addPool(uint256 _minDepositInUSD, uint64 _APR, uint64 _period) external onlyRole(SUB_ADMIN_ROLE) {        
        poolInfo.push(PoolInfo({
            minDepositInUSD: _minDepositInUSD,
            APR: _APR,
            period: _period,
            status: true,
            lastUpdated: uint64(block.timestamp)
        }));

        emit PoolAdded(_minDepositInUSD, _APR, _period);
    }

    function depositByVault(uint _pid, uint _originAmount, uint _lockedAmount, address _user) external override whenNotPaused nonReentrant {
        require(_msgSender() == address(vault), "pool: Not stake by vault");
        
        PoolInfo storage pool = poolInfo[_pid];

        uint totalStakeAmount = _originAmount + _lockedAmount;

        require(totalStakeAmount > 0, "pool: amount cannot be zero");
        require(pool.status, "This pool is close");

        // Forward from vault to smart contract 
        _forwardRewardToken(address(vault), _originAmount);
        uint amountOutInUSD = _validateMinimumStakingAmount(_pid, totalStakeAmount);

        _harvest(_pid, _user);

        _updateUserStakingInfo(_pid, _user, totalStakeAmount, amountOutInUSD);
    }

    function deposit(uint256 _pid, uint256 _amount) public whenNotPaused nonReentrant {
        require(_amount > 0, "pool: amount cannot be zero");
        _deposit(_msgSender(), _pid, _amount);
    }

    function withdraw(uint _pid) external whenNotPaused nonReentrant {
        address sender = msg.sender;

        StakingInfo storage stakingInfo = stakingInfos[_pid][sender];
        require(stakingInfo.totalStakesInUSD > 0, "pool: total stakes must greater than 0");
        require(block.timestamp > stakingInfo.dueDate, "pool: due date req not meet");

        _harvest(_pid, sender);

        // uint256 rewardsInRewardTokens = _convertUSDToRewardToken(stakingInfo.totalStakesInUSD);
        // require(rewardsInRewardTokens > 0, "pool: reward not enough to harvest");

        // Transfer the interest amount to owner
        rewardToken.transferFrom(treasury, sender, stakingInfo.totalStakes);
        
        emit Withdrawed(sender, _pid, stakingInfo.totalStakes, stakingInfo.totalStakesInUSD);
        delete stakingInfos[_pid][sender];
    }

    function restakeWithVault(uint _pid, uint _originAmount, uint _lockedAmount, address _user) external override whenNotPaused nonReentrant {
        require(_msgSender() == address(vault), "pool: Not stake by vault");
        
        PoolInfo storage pool = poolInfo[_pid];
        require(pool.status, "This pool is close");
        
        uint totalStakeAmount = _originAmount + _lockedAmount;

        StakingInfo storage stakingInfo = stakingInfos[_pid][_user];
        require(stakingInfo.totalStakesInUSD > 0, "pool: total stakes must greater than 0");
        require(block.timestamp > stakingInfo.dueDate, "pool: due date req not meet");

        _harvest(_pid, _user);

        // reset time stake to update new state
        stakingInfo.timeStake = 0;

        // Forward user tokens to smart contract 
        _forwardRewardToken(_msgSender(), _originAmount);
        uint amountOutInUSD = _validateMinimumStakingAmount(_pid, totalStakeAmount);

        _updateUserStakingInfo(_pid, _user, totalStakeAmount, amountOutInUSD);
    }  

    function claimReward(uint _pid) external nonReentrant whenNotPaused {
        address sender = msg.sender;
        _harvest(_pid, sender);
    }

    function pendingRewardInUSD(uint256 _pid, address _user) public view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        StakingInfo storage stakingInfo = stakingInfos[_pid][_user];

        uint64 current = uint64(block.timestamp);
        
        if (current <= stakingInfo.lastClaimedTime) {
            return 0;
        }

        if (current > stakingInfo.dueDate) {
            current = stakingInfo.dueDate;
        }

        // Get total number of interest periods from the last time claimed
        uint64 passedDuration = current - stakingInfo.lastClaimedTime; 

        uint256 pendingInterest = stakingInfo.totalStakesInUSD * passedDuration * pool.APR / INTEREST_RATE_PRECISION_POINT / ONE_YEAR_IN_SECONDS;

        return pendingInterest;
    }

    function getAmountDDXByUSD(uint _amountInUSD) external override returns(uint) {
        return _convertUSDToRewardToken(_amountInUSD);
    }

    function _deposit(address sender, uint256 _pid, uint256 _amount) internal {
        PoolInfo storage pool = poolInfo[_pid];

        require(pool.status, "This pool is close");
        
        // Forward user tokens to smart contract 
        uint stakingAmount = _forwardRewardToken(sender, _amount);
        uint amountOutInUSD = _validateMinimumStakingAmount(_pid, stakingAmount);

        _harvest(_pid, sender);

        _updateUserStakingInfo(_pid, sender, stakingAmount, amountOutInUSD);
    }

    // Reward token - asset
    function _validateMinimumStakingAmount(uint256 _pid, uint256 _stakingAmount) internal returns(uint256 totalStakingAmountInUSD) {
        PoolInfo storage pool = poolInfo[_pid];
        StakingInfo storage stakingInfo = stakingInfos[_pid][msg.sender];
        
        uint256 amountOut;

        if (oracle != address(0)) {
            // Update oracle Pricing when time elapsed has passed
            if (block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >  IOracleSimple(oracle).PERIOD()) { 
                IOracleSimple(oracle).update();
            }

            amountOut = IOracleSimple(oracle).consult(address(rewardToken), _stakingAmount);
        }

        if (amountOut > 0) {
            totalStakingAmountInUSD = amountOut;
        } else { 
            // This case fallback to pre setup price
            totalStakingAmountInUSD = getStakingAmountInUSD(address(rewardToken), _stakingAmount);  // Get amount in case we don't have an active oracle
        }

        stakingInfo.totalStakesInUSD += totalStakingAmountInUSD;

        // Needs to be make sure staking amount by $ greater than minimum amount
        require(stakingInfo.totalStakesInUSD >= pool.minDepositInUSD, "pool: minimum staking amount not reached");
    }

    function _convertUSDToRewardToken(uint256 _amountInUSD) internal returns(uint256) {
        if (oracle != address(0)) {
            // Update oracle Pricing when time elapsed has passed
            if (block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >  IOracleSimple(oracle).PERIOD()) { 
                IOracleSimple(oracle).update();
            }

            return IOracleSimple(oracle).consult(IOracleSimple(oracle).token1(), _amountInUSD);
        }

        // Get amount in case we don't have an active oracle
        return getStakingAmountByPegToken(address(rewardToken), _amountInUSD); 
    }

    /**
     * @dev Get Staking token amount in offered currencies
     * @param _amount Amount of purchase token
     * @return Return amount of respective IDO token
     */
    function getStakingAmountInUSD(
        address _token,
        uint _amount
    ) public view returns (uint) {
        OfferedCurrency memory currency = offeredCurrencies[_token];
        return
            (_amount * (10 ** currency.decimal)) / currency.rate;
    }

    function getStakingAmountByPegToken(
        address _token,
        uint _amount
    ) public view returns (uint) {
        OfferedCurrency memory currency = offeredCurrencies[_token];
        return
            (_amount * currency.rate) / (10 ** currency.decimal);
    }

    function _forwardRewardToken(address sender, uint256 amount) internal returns(uint256) {
        uint256 totalStakingbefore = rewardToken.balanceOf(address(this));
        // Locking principal deposit amount
        rewardToken.transferFrom(sender, address(this), amount);
        // Get balance of contract after staking
        uint256 totalStakingAfter = rewardToken.balanceOf(address(this));

        return totalStakingAfter - totalStakingbefore;
    }

    function _updateUserStakingInfo(uint _pid, address _user, uint _stakingAmount, uint _amountOutInUSD) internal {
        PoolInfo storage pool = poolInfo[_pid];
        StakingInfo storage stakingInfo = stakingInfos[_pid][_user];

        if (stakingInfo.timeStake == 0) {
            stakingInfo.createdAt = uint64(block.timestamp);
            stakingInfo.timeStake = uint64(block.timestamp);
            stakingInfo.lastClaimedTime = uint64(block.timestamp);
            stakingInfo.dueDate = stakingInfo.timeStake +  pool.period;
        }
       
        stakingInfo.lastUpdatedTime = uint64(block.timestamp);
        stakingInfo.totalStakesInUSD += _amountOutInUSD;
        stakingInfo.totalStakes += _stakingAmount;
       
        totalStaked += _stakingAmount;

        emit Deposited(_pid, _user, _stakingAmount, _amountOutInUSD);
    }

    function _harvest(uint _pid, address _sender) internal {
        StakingInfo storage stakingInfo = stakingInfos[_pid][_sender];

        uint256 rewardsInUSD = pendingRewardInUSD(_pid, _sender);
        uint256 rewardsInRewardTokens = dwStaking.getAmountDWByUSD(rewardsInUSD);

        if (rewardsInRewardTokens > 0) {
            // Transfer the interest amount to owner
            IERC20WithBurn(dwStaking.rewardToken()).transferFrom(treasury, _sender, rewardsInRewardTokens);
            
            uint64 lastClaimedTime = uint64(block.timestamp);
    
            if (lastClaimedTime > stakingInfo.dueDate) {
                lastClaimedTime = stakingInfo.dueDate;
            }

            stakingInfo.lastClaimedTime = lastClaimedTime;
        }
        
        stakingInfo.claimedInterest += rewardsInUSD;
        stakingInfo.lastUpdatedTime = uint64(block.timestamp);
        
        emit RewardHarvested(_sender, _pid, rewardsInRewardTokens, rewardsInUSD);
    }

    /// -----------------------------------
    /// --------- Pause Function ----------
    /// -----------------------------------

    function pause() external onlyAdmin {
        _pause();
    }

    function unpause() external onlyAdmin {
        _unpause();
    }
}
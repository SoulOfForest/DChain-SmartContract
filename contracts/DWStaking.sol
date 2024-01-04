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
import "./interfaces/IDWVault.sol";
import "./DChainBase.sol";
import "hardhat/console.sol";

contract DWStaking is IDChainStaking, DChainBase {
    struct StakingInfo {
        uint256 totalExpectedInterest;
        uint256 totalStakesInUSD;
        uint256 claimedInterest;
        uint64 claimDuration;
        uint64 dueDate;
        uint64 lastClaimedTime;
        uint64 lastUpdatedTime;
        uint64 createdAt;
    }

    struct StakeToken {
        bool created;
    }

    struct OfferedCurrency {
        uint256 decimal;
        uint256 rate;
    }

    uint64 private constant INTEREST_RATE_PRECISION_POINT = (10 ** 18); 
    uint32 private constant ONE_DAY_IN_SECONDS = 1 days;
    uint32 private constant ONE_YEAR_IN_SECONDS = 365 days;


    IERC20 public rewardToken;
    IERC20 public extraRewardToken;

    IDDXVault public DDXVault;
    IDWVault public vault;
    IDDXStaking public DDXStaking;
    
    address public treasury;
    address public admin;

    uint256 public totalStakingContracts;

    uint256 public totalStaked;
    uint256 public minimumStakingAmountInUSD; 
    uint256 public maximumEarningsInPercent;

    uint64 public claimDuration;
    uint256 public directInterest;
    
    uint256[9] public commissionInterestLevels;

    bool public emergencyCancelled;

    // Asset token -> Offered Currency (to $)
    mapping(address => OfferedCurrency) public offeredCurrencies;
    mapping(address => StakeToken) public allowedStakeTokens;
    // Asset token => oracle
    mapping(address => address) public assetPrices;
    // referrer -> number of F1s
    mapping(address => uint256) public totalReferralInvitations;
    // sender -> referrer 
    mapping(address => address) public referredBy;
    // sender -> current staking infos
    mapping(uint => StakingInfo) public stakingContracts;
    // staking contract id -> owner
    mapping(uint => address) public stakingContractOwnedBy;

    event ContractCreated(uint256 indexed contractId, address indexed user, address indexed stakeToken, address referrer, uint256 amount, uint256 amountInUSD);
    event StakingContractCreated(address indexed user, address indexed referrer, uint indexed contractId, uint stakingAmount);
    event Withdraw(address indexed user, uint256 amount);
    event RewardHarvested(uint256 indexed contractId, address indexed claimer, uint256 amount, uint256 amountInUSD);

    function initialize(address _owner, address _treasury, IERC20 _rewardToken, IERC20 _extraRewardToken) external initializer {
        __DChainBase_init(_owner);
        
        /// @dev: ZA - Zero address
        require(_treasury != address(0), "ZA");
        require(address(_rewardToken) != address(0), "ZA");

        treasury = _treasury;
        rewardToken = _rewardToken;
        extraRewardToken = _extraRewardToken;
        admin = msg.sender;

        /// Commission for the invitation and only get once
        commissionInterestLevels = [
            1500, // 15%
            1000, // 10%
            500,  // 5%
            500,  // 5%
            500,  // 5%
            0,
            0,
            0,
            0
        ];


        claimDuration = 600 days; // 20 months
        directInterest = 50000000000000000; // 5%
        minimumStakingAmountInUSD = 100 * (10 ** 6); // Minimum will be 100$
        maximumEarningsInPercent = 2000000000000000000; // 200%

        _setupRole(SUB_ADMIN_ROLE, _owner);

        // Max approve for transfer from 
        rewardToken.approve(address(this), type(uint256).max);
    }

    /// -----------------------------------
    /// --------- Update Function ---------
    /// -----------------------------------

    function setDDXStaking(IDDXStaking _staking) external onlyRole(SUB_ADMIN_ROLE) {
        require(address(_staking) != address(0), "pool: DDX Staking cannot be zero address");
        DDXStaking = _staking;
    }

    function setDWVault(IDWVault _vault) external onlyRole(SUB_ADMIN_ROLE) {
        require(address(_vault) != address(0), "pool: DW vault cannot be zero address");
        vault = _vault;
    }

    function setDDXVault(IDDXVault _vault) external onlyRole(SUB_ADMIN_ROLE) {
        require(address(_vault) != address(0), "pool: DDX vault cannot be zero address");
        DDXVault = _vault;
    }

    function setAssetOracle(address _pegToken, address _oracle) external onlyRole(SUB_ADMIN_ROLE) {
        assetPrices[_pegToken] = _oracle;
    }

    // how to convert from 1 Token - to $
    function setOfferedCurrency(address _currency, uint _rate, uint _decimal) external onlyRole(SUB_ADMIN_ROLE) {
        OfferedCurrency storage offeredCurrency = offeredCurrencies[_currency];
        offeredCurrency.rate = _rate;
        offeredCurrency.decimal = _decimal;
    }

    function setAllowedStakeToken(address _stakeToken) external onlyRole(SUB_ADMIN_ROLE) {
        StakeToken storage stakeToken = allowedStakeTokens[_stakeToken];
        require(!stakeToken.created, "Allowed token is already existed!");
        stakeToken.created = true;
    }

    /// -----------------------------------
    /// ---------- Core Function ----------
    /// -----------------------------------

    function depositByVault(uint256 _originAmount, uint _lockedAmount, address _user, address _referrer) external override whenNotPaused nonReentrant {
        require(_msgSender() == address(vault), "pool: Not stake by vault");
        
        uint totalStakeAmount = _originAmount + _lockedAmount;

        require(totalStakeAmount > 0, "pool: amount cannot be zero");

        // Forward from vault to smart contract 
        _forwardRewardToken(address(vault), _originAmount);
        uint amountOutInUSD = _validateMinimumStakingAmount(address(rewardToken), totalStakeAmount);

        // If user choose to stake with platform token, need to specify which peg token you want to convert to 
        if (_originAmount > 0) {
            rewardToken.burn(_originAmount);
        }

        _joinByReferral(_user, _referrer, totalStakeAmount);
        _createStakingContract(_user, address(rewardToken), _referrer, totalStakeAmount, amountOutInUSD);
    
        _rewardDDXToUser(amountOutInUSD, _user);
    }

    function deposit(uint256 amount, address stakeToken, address referrer) external whenNotPaused nonReentrant {
        address sender = msg.sender;

        require(amount > 0, "pool: amount cannot be zero");
        require(sender != address(0), "pool: stake address can not be zero address");

        // Forward user tokens to smart contract 
        uint stakingAmount = _forwardRewardToken(sender, amount);
        uint amountOutInUSD = _validateMinimumStakingAmount(stakeToken, stakingAmount);

        // If uesr choose to stake with other tokens, the token needs to be in the allowed list.
        if (stakeToken != address(rewardToken)) {
            StakeToken memory allowedStakeToken = allowedStakeTokens[stakeToken];
            require(allowedStakeToken.created, "pool: stake token is not allowed");
        }
        
        // If user choose to stake with platform token, need to specify which peg token you want to convert to 
        if (stakeToken == address(rewardToken)) {
            rewardToken.burn(stakingAmount);
        }

        _joinByReferral(sender, referrer, stakingAmount);
        _createStakingContract(sender, stakeToken, referrer, stakingAmount, amountOutInUSD);

        _rewardDDXToUser(amountOutInUSD, sender);
    }

    function claimMultipleRewards(uint[] memory _contractIds) external whenNotPaused {
        for (uint i; i < _contractIds.length;) {
            claimReward(_contractIds[i]);
            unchecked {
                i++;
            }
        }
    }

    function claimReward(uint _contractId) public nonReentrant whenNotPaused {
        _harvest(_msgSender(), _contractId);
    }

    function _harvest(address _sender, uint _contractId) internal {
        require(stakingContractOwnedBy[_contractId] == _sender, "pool: contract id not belongs to this owner");
        
        StakingInfo storage stakingInfo = stakingContracts[_contractId];

        uint256 rewardsInUSD = pendingRewardInUSD(_contractId);
        uint256 rewardsInRewardTokens = _convertUSDToRewardToken(rewardsInUSD);

        require(rewardsInRewardTokens > 0, "pool: reward not enough to harvest");

        // Transfer the interest amount to owner
        rewardToken.transferFrom(treasury, _sender, rewardsInRewardTokens);
        
        uint64 lastClaimedTime = uint64(block.timestamp);

        if (lastClaimedTime > stakingInfo.dueDate) {
            lastClaimedTime = stakingInfo.dueDate;
        }

        stakingInfo.lastUpdatedTime = uint64(block.timestamp);
        stakingInfo.lastClaimedTime = lastClaimedTime;
        stakingInfo.claimedInterest += rewardsInUSD;
        
        console.log(_contractId, _sender, rewardsInRewardTokens, rewardsInUSD);
        emit RewardHarvested(_contractId, _sender, rewardsInRewardTokens, rewardsInUSD);
    }

    function pendingRewardInUSD(uint256 _contractId) public view returns (uint256) {
        StakingInfo memory stakingInfo = stakingContracts[_contractId];

        uint64 current = uint64(block.timestamp);

        if (current <= stakingInfo.lastClaimedTime) {
            return 0;
        }

        if (current > stakingInfo.dueDate) {
            current = stakingInfo.dueDate;
        }

        // Get total number of interest periods from the last time claimed
        uint64 passedDuration = uint64(block.timestamp) - stakingInfo.lastClaimedTime; 

        uint256 pendingInterest = stakingInfo.totalExpectedInterest * passedDuration * INTEREST_RATE_PRECISION_POINT / claimDuration / INTEREST_RATE_PRECISION_POINT;

        return pendingInterest;
    }

    // Reward token - asset
    function _validateMinimumStakingAmount(address _stakeToken, uint256 _stakingAmount) internal returns(uint256 totalStakingAmountInUSD) {
        address oracle = assetPrices[_stakeToken];

        uint256 amountOut;

        if (oracle != address(0)) {
            // Update oracle Pricing when time elapsed has passed
            if (block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >  IOracleSimple(oracle).PERIOD()) { 
                IOracleSimple(oracle).update();
            }

            amountOut = IOracleSimple(oracle).consult(_stakeToken, _stakingAmount);
        }

        if (amountOut > 0) {
            totalStakingAmountInUSD = amountOut;
        } else { 
            // This case fallback to pre setup price
            totalStakingAmountInUSD = getStakingAmountInUSD(_stakeToken, _stakingAmount);  // Get amount in case we don't have an active oracle
        }

        // Needs to be make sure staking amount by $ greater than minimum amount
        require(totalStakingAmountInUSD >= minimumStakingAmountInUSD, "pool: minimum staking amount not reached");
    }

    function _convertUSDToRewardToken(uint256 _amountInUSD) internal returns(uint256) {
        address oracle = assetPrices[address(rewardToken)];

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

    function _convertUSDToExtraRewardToken(uint256 _amountInUSD) internal returns(uint256) {
        address oracle = assetPrices[address(extraRewardToken)];

        if (oracle != address(0)) {
            // Update oracle Pricing when time elapsed has passed
            if (block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >  IOracleSimple(oracle).PERIOD()) { 
                IOracleSimple(oracle).update();
            }

            return IOracleSimple(oracle).consult(IOracleSimple(oracle).token1(), _amountInUSD);
        }

        // Get amount in case we don't have an active oracle
        return getStakingAmountByPegToken(address(extraRewardToken), _amountInUSD); 
    }

    function getAmountDWByUSD(uint _amountInUSD) external override returns(uint) {
        return _convertUSDToRewardToken(_amountInUSD);
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

    function _joinByReferral(address _sender, address _referrer, uint _stakingAmount) internal {
        // Validate Referrals
        if (_referrer != address(0)) {
            require(referredBy[_sender] == address(0) && _referrer != _sender,"pool: user already joined by referral");
            
            referredBy[_sender] = _referrer;
            totalReferralInvitations[_referrer] += 1;

            // Give direct intetest to the refferer
            uint256 directInterestForReffer = _stakingAmount * directInterest / INTEREST_RATE_PRECISION_POINT;
            rewardToken.transferFrom(treasury, _referrer, directInterestForReffer);
        }
    }

    function _createStakingContract(address _user, address _stakeToken, address _referrer, uint _stakingAmount, uint _amountOutInUSD) internal {
        uint contractId = totalStakingContracts;

        StakingInfo storage stakingInfo = stakingContracts[contractId];
        stakingInfo.createdAt = uint64(block.timestamp);
        stakingInfo.lastClaimedTime = uint64(block.timestamp);
        stakingInfo.lastUpdatedTime = uint64(block.timestamp);
        stakingInfo.totalStakesInUSD = _amountOutInUSD;
        stakingInfo.totalExpectedInterest =  stakingInfo.totalStakesInUSD  * maximumEarningsInPercent / INTEREST_RATE_PRECISION_POINT;
        stakingInfo.claimDuration = claimDuration;
        stakingInfo.dueDate = stakingInfo.createdAt +  stakingInfo.claimDuration;

        totalStaked += _stakingAmount;
        totalStakingContracts++;

        stakingContractOwnedBy[contractId] = _user;

        emit ContractCreated(contractId, _user, _stakeToken, _referrer, _stakingAmount, _amountOutInUSD);
    }

    function _rewardDDXToUser(uint _amountOutInUSD, address _user) internal {
        // Transfer extra DDX reward token to investor
        uint extraRewardTokenAmount = DDXStaking.getAmountDDXByUSD(_amountOutInUSD);
        if (extraRewardTokenAmount > 0 && DDXVault.rewardApplicable()) {
            DDXVault.rewardFromDWStaking(_user, extraRewardTokenAmount);
        }
    }

    /// -----------------------------------
    /// --------- Pause Function ----------
    /// -----------------------------------

    function pause() external onlyRole(SUB_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(SUB_ADMIN_ROLE) {
        _unpause();
    }
}
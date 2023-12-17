// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./interfaces/IIDOPool.sol";
import "./interfaces/IOracleSimple.sol";
import "hardhat/console.sol";
contract DchainFixedStaking is Ownable, Pausable, ReentrancyGuard {
    struct StakingContract {
        uint256 totalStakes;
        uint256 totalWithdrawed;
        uint256 claimedInterest;
        uint64 lastUpdatedTime;
        uint64 lastTimeDeposited;
        uint64 lastTimeClaimed;
        bool created;
    }

    uint64 private constant INTEREST_RATE_PRECISION_POINT = (10 ** 18); 
    uint32 private constant ONE_DAY_IN_SECONDS = 1 days;
    uint32 private constant ONE_YEAR_IN_SECONDS = 365 days;
    /// @notice ten minutes in seconds
    uint32 public constant TEN_MINUTES = 600;
    uint16 private constant PRECISION_POINT = 10_000;

    // One cycle duration    
    uint64 public cycleDuration = 1 days;
    // Interest distribute per period for calculating interest
    uint64 public periodDuration = 1 hours;

    // Max Interest per day 
    uint16 public interestIncreasePerCycle = 5; // 0.05% 
    uint16 public maxInterestPerPeriod = 250; // 2.5% max interest
    uint16 public baseInterestPerPeriod = 40; // 0.4%

    /// @notice The address of oracle
    address public oracle;

    IERC20 public rewardToken;
    
    address public treasury;
    
    address public admin;

    bool public poolStatus;

    uint256 public totalStakingContracts;
    
    uint256 public totalStaked;
    uint256 public minimumStakingAmount; 
    
    uint256[9] public commissionInterestLevels;

     // referrer -> number of F1s
    mapping(address => uint256) public totalReferralInvitations;
    // sender -> referrer 
    mapping(address => address) public referredBy;
    // referrer -> commission level(1,2,3,4,5,6,7,8,9) -> referral invitations 
    mapping(address => mapping(uint256 => uint256)) public referralInvitationsByCommissionLevel;
    // sender -> contract id -> current staking infos
    mapping(address => mapping(uint256 => StakingContract)) public userStakingContracts;
    // sender -> commissions
    mapping(address => uint) public userInterestCommissions;

    event Deposit(address indexed user, uint indexed contractId, uint256 amount);
    event StakingContractCreated(address indexed user, address indexed referrer, uint indexed contractId, uint stakingAmount);
    event Withdraw(address indexed user, uint256 amount);
    event RewardHarvested(address indexed claimer, uint256 amount);
    event RewardCommissionPaid(address indexed origin, address indexed receiver, uint256 level, uint256 amount);

    constructor(address _treasury, address _oracle, IERC20 _rewardToken) {
        /// @dev: ZA - Zero address
        require(_treasury != address(0), "ZA");
        require(_oracle != address(0), "ZA");
        require(address(_rewardToken) != address(0), "ZA");

        oracle = _oracle;
        treasury = _treasury;
        rewardToken = _rewardToken;
        admin = msg.sender;
        poolStatus = true;

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

        minimumStakingAmount = 100 * (10 ** 18);
    }

    /// -----------------------------------
    /// ---------- View Function ----------
    /// -----------------------------------

    function joinByReferral(address _user) external view returns(bool) {
        return referredBy[_user] != address(0);
    }


    function getF1Invited(address _user) public view returns(uint256) {
        return totalReferralInvitations[_user];
    }

    /// -----------------------------------
    /// --------- Update Function ---------
    /// -----------------------------------

    function updateAdmin(address _admin) external onlyOwner {
        admin = _admin;
    }

    function updateTreasury(address _treasury) external onlyAdmin {
        treasury = _treasury;
    }

    /// -----------------------------------
    /// ---------- Core Function ----------
    /// -----------------------------------

    function createStakingContract(uint256 amount, address referrer) external whenNotPaused {
        address sender = msg.sender;

        require(amount > 0, "pool: amount cannot be zero");
        require(sender != address(0), "pool: stake address can not be zero address");

        totalStakingContracts++;

        uint contractId = totalStakingContracts;
        
        StakingContract storage stakingContract = userStakingContracts[sender][contractId];

        uint stakingAmount = _forwardRewardToken(sender, amount);

        _validateMinimumStakingAmount(stakingAmount);

        // Validate Referrals
        if (referrer != address(0)) {
            require(referredBy[sender] == address(0),"pool: user already joined by referral");
            
            referredBy[sender] = referrer;
            totalReferralInvitations[referrer] += 1;
        }

        stakingContract.lastTimeClaimed = uint64(block.timestamp);
        stakingContract.lastTimeDeposited = uint64(block.timestamp);
        stakingContract.lastUpdatedTime = uint64(block.timestamp);
        stakingContract.totalStakes = stakingAmount;
        stakingContract.created = true;

        totalStaked += stakingAmount;

        emit StakingContractCreated(msg.sender, referrer, contractId, stakingAmount);
    }

    // function withdraw() external nonReentrant whenNotPaused {
    //     address account = msg.sender;
    //     StakingContract storage stakingContractData = userStakingInfos[account];

    //     // require(block.timestamp >= stakingContractData.lastTimeDeposited + stakingContractData.interestDuration, "pool: still Locked");

    //     // ---- check pending rewards left ---
    //     uint256 totalPendingRewards;
    //     uint64 claimTimesReward;

    //     (totalPendingRewards, claimTimesReward) = poolPendingRewardPerday(account);

    //     if (totalPendingRewards > 0) {
    //         _harvest(account);
    //     }
    //     // ---- check pending rewards left ---

    //     require(block.timestamp >= stakingContractData.lastClaimStaked, "not time to claim"); 
    //     require(stakingContractData.totalStakes > 0, "pool: greater than zero");

    //     uint256 totalStakedClaimable;

    //     uint64 claimTimes = ((uint64(block.timestamp) - stakingContractData.lastClaimStaked) / uint64(ONE_DAY_IN_SECONDS)) + 1;

    //     if (stakingContractData.claimStakedPerDay == 0) {
    //         stakingContractData.claimStakedPerDay = stakingContractData.totalStakes / (stakingContractData.vestingDuration / ONE_DAY_IN_SECONDS);
    //     }

    //     require(stakingContractData.claimStakedPerDay > 0, "pool: claim staked per day must greater than zero");

    //     if (block.timestamp >= stakingContractData.lastTimeDeposited + stakingContractData.interestDuration + stakingContractData.vestingDuration) {
    //         totalStakedClaimable = stakingContractData.totalStakes;
    //         rewardToken.transferFrom(treasury, msg.sender, totalStakedClaimable);
            
    //         stakingContractData.maxClaim = 0;
    //         stakingContractData.totalStakes = 0;
    //         stakingContractData.totalClaimed = 0;
    //         stakingContractData.totalWithdrawClaimed = stakingContractData.totalStakes;
    //     }
    //     else {
    //         totalStakedClaimable = stakingContractData.claimStakedPerDay * claimTimes;
    //         require(stakingContractData.totalWithdrawClaimed + totalStakedClaimable <= stakingContractData.totalStakes, "pool: your staked less than your withdraw");
    //         rewardToken.transferFrom(treasury, msg.sender, totalStakedClaimable);
    //         stakingContractData.totalStakes = stakingContractData.totalStakes - totalStakedClaimable;
    //         stakingContractData.totalWithdrawClaimed = stakingContractData.totalWithdrawClaimed + totalStakedClaimable;
    //     }

    //     // stakingContractData.maxClaim = (stakingContractData.totalStakes * maxInterest) / PRECISION_POINT;
    //     stakingContractData.lastClaimStaked = stakingContractData.lastClaimStaked + (claimTimes * ONE_DAY_IN_SECONDS);

    //     totalStaked -= totalStakedClaimable;

    //     emit Withdraw(msg.sender, totalStakedClaimable);   
    // }

    function claimReward(uint _contractId) external nonReentrant whenNotPaused {
        _harvest(_contractId, msg.sender);
    }

    function _harvest(uint256 _contractId, address _account) internal {
        StakingContract storage stakingContractData = userStakingContracts[_account][_contractId];

        require(stakingContractData.created, "pool: this contract is not belongs to this owner");

        (uint256 totalPendingRewards, uint64 numberOfInterestPeriods) = pendingReward(_account, _contractId);

        _rewardCommissionToAllReferralLevels(
            _account,
            totalPendingRewards
        );

        // Transfer the interest amount to owner
        rewardToken.transferFrom(treasury, _account, totalPendingRewards);


        stakingContractData.lastUpdatedTime = uint64(block.timestamp);
        stakingContractData.lastTimeClaimed = stakingContractData.lastTimeClaimed + numberOfInterestPeriods * periodDuration;

        stakingContractData.claimedInterest += totalPendingRewards;
        
        emit RewardHarvested(_account, totalPendingRewards);
    }

    function pendingReward(address _account, uint _contractId) public view returns (uint256, uint64) {
        StakingContract storage stakingContractData = userStakingContracts[_account][_contractId];

        if (uint64(block.timestamp) <= stakingContractData.lastTimeClaimed || !stakingContractData.created) {
            return (0, 0);
        }

        // Get total number of interest periods from the last time claimed
        uint64 numberOfInterestPeriods = (uint64(block.timestamp) - stakingContractData.lastTimeClaimed) / periodDuration + 1; 

        // Maximum number periods per cycle
        uint64 numberOfPeriodsPerCycles = cycleDuration / periodDuration; 

        // Get Maximum number cycles and equivalent periods
        uint64 maximumNumberOfCycles = (maxInterestPerPeriod - baseInterestPerPeriod) / interestIncreasePerCycle;
        uint64 maximumNumberOfPeriods = maximumNumberOfCycles * numberOfPeriodsPerCycles;

        uint64 numberOfClaimedInterestPeriods = 0;
        
        // @dev: If last time claimed has been changed due to harvest, -> calculate number of claimed interest periods
        if (stakingContractData.lastTimeClaimed > stakingContractData.lastTimeDeposited) {
            numberOfClaimedInterestPeriods = (stakingContractData.lastTimeClaimed - stakingContractData.lastTimeDeposited) / periodDuration;
        }

        console.log("numberOfClaimedInterestPeriods: ", numberOfClaimedInterestPeriods, numberOfInterestPeriods);

        uint256 interest = 0;
        uint64 originalNumberOfInterestPeriods = numberOfInterestPeriods;

        if (numberOfClaimedInterestPeriods > maximumNumberOfPeriods) {
            interest = stakingContractData.totalStakes * maxInterestPerPeriod * numberOfInterestPeriods / PRECISION_POINT;
        } else {
            uint64 currentCycle = numberOfClaimedInterestPeriods / numberOfPeriodsPerCycles + 1;
            uint64 periodsLeftInCurrentCycle = currentCycle * numberOfPeriodsPerCycles - numberOfClaimedInterestPeriods; 

            uint64 currentCycleInterestRate = baseInterestPerPeriod + interestIncreasePerCycle * (currentCycle - 1);

            if (periodsLeftInCurrentCycle < numberOfInterestPeriods) {
                interest += stakingContractData.totalStakes * currentCycleInterestRate * periodsLeftInCurrentCycle / PRECISION_POINT;
                numberOfInterestPeriods = numberOfInterestPeriods - periodsLeftInCurrentCycle;
            } else {
                interest += stakingContractData.totalStakes * currentCycleInterestRate * numberOfInterestPeriods / PRECISION_POINT;
                numberOfInterestPeriods = 0;
            }

            // It will goes to the next cycle
            if (numberOfInterestPeriods > 0) {
                uint64 numberOfCycles = numberOfInterestPeriods / numberOfPeriodsPerCycles;
                uint64 numberOfPeriodsLeft = numberOfInterestPeriods - numberOfCycles * numberOfPeriodsPerCycles;
                console.log("Number of periods left: ", numberOfInterestPeriods, numberOfPeriodsLeft, currentCycleInterestRate + numberOfCycles + 1);
                
                interest += stakingContractData.totalStakes * (numberOfCycles * currentCycleInterestRate + (interestIncreasePerCycle * (numberOfCycles + 1) * numberOfCycles / 2)) / PRECISION_POINT;
                interest += stakingContractData.totalStakes * (currentCycleInterestRate + (numberOfCycles + 1) * interestIncreasePerCycle) * numberOfPeriodsLeft / PRECISION_POINT;
            }
        }

        return (interest, originalNumberOfInterestPeriods);
    }

    function _validateMinimumStakingAmount(uint256 _stakingAmount) internal {
        // Update oracle Pricing when time elapsed has passed
        if (block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >  IOracleSimple(oracle).PERIOD()) { 
            IOracleSimple(oracle).update();
        }

        uint256 amountOut = IOracleSimple(oracle).consult(address(rewardToken), _stakingAmount);

        // Needs to be make sure staking amount by $ greater than minimum amount
        require(amountOut >= minimumStakingAmount, "pool: minimum staking amount not reached");
    }

    function _rewardCommissionToAllReferralLevels(address _account, uint256 _amount) internal {
        uint256 level = 1;
        address sentinel = _account;

        while (level <= commissionInterestLevels.length) {
            address referrer = referredBy[sentinel];

            if (referrer == address(0)) {
                break;
            }

            uint256 commissionAmount = _amount * commissionInterestLevels[level - 1] / PRECISION_POINT;
            
            // Add commission amount to the refeerer
            userInterestCommissions[referrer] += commissionAmount;

            rewardToken.transferFrom(
                treasury,
                referrer,
                commissionAmount
            );

            emit RewardCommissionPaid(
                _account,
                referrer,
                level,
                commissionAmount
            );    
            
            sentinel = referrer;
            level++;
        }
    }

    function _forwardRewardToken(address sender, uint256 amount) internal returns(uint256) {
        uint256 totalStakingbefore = rewardToken.balanceOf(address(this));
        // Locking principal deposit amount
        rewardToken.transferFrom(sender, address(this), amount);
        // Get balance of contract after staking
        uint256 totalStakingAfter = rewardToken.balanceOf(address(this));

        return totalStakingAfter - totalStakingbefore;
    }

    // function _updateUserStakingInfo(uint256 _contractId, address _sender) internal {
    //     StakingContract storage stakingContract = userStakingContracts[_sender][_contractId];

    //     if (stakingContract.lastTimeDeposited > 0) {
    //         uint256 interestAmount = pendingReward(_sender, _contractId);

    //         if (interestAmount > 0) {
    //             _rewardCommissionToAllReferralLevels(_sender, interestAmount);

    //             rewardToken.transferFrom(treasury, _sender, interestAmount);
    //             stakingContract.claimedStakingInterest += interestAmount;
    //             stakingContract.lastTimeClaimed = uint64(block.timestamp);
    //         }
    //     }
    // }

    /// -----------------------------------
    /// --------- Pause Function ----------
    /// -----------------------------------

    function Pause() external onlyAdmin {
        poolStatus = false;
        _pause();
    }

    function UnPause() external onlyAdmin {
        poolStatus = true;
        _unpause();
    }


    /// --------------------------------
    /// ------- Modifier Function ------
    /// --------------------------------

    modifier onlyAdmin() {
        require(msg.sender == admin, "Permission: User is not admin");
        _;
    }
}
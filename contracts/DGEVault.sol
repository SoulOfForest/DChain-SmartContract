// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./DChainBase.sol";
import "./interfaces/IERC20.sol";
import "./interfaces/IDDXStaking.sol";
import "./interfaces/IDDXVault.sol";
import "./libraries/TransferHelper.sol";
import "hardhat/console.sol";

contract DGEVault is DChainBase, IDDXVault {
    struct VestingSchedule {
        // beneficiary of tokens after they are released
        address beneficiary;
        // cliff time of the vesting start in seconds since the UNIX epoch
        uint256 cliff;
        // start time of the vesting period in seconds since the UNIX epoch
        uint256 start;
        // duration of the vesting period in seconds
        uint256 duration;
        // duration of a slice period for the vesting in seconds
        uint256 slicePeriodSeconds;
        // whether or not the vesting is revocable
        bool revocable;
        // total amount of tokens to be released at the end of the vesting
        uint256 amountTotal;
        // amount of tokens released
        uint256 released;
        // whether or not the vesting has been revoked
        bool revoked;
    }

    uint256 private constant PRECISION_POINT = 10000;

    uint public override startVestingTime;
    uint public vestingDuration;
    uint public vestingPeriodInSeconds;

    address public treasury;
    address public admin;
    address public DDXStaking;
    address public DWStaking;

    IERC20WithBurn public rewardToken;

    bool public override rewardApplicable;

    uint256 private vestingSchedulesTotalAmount;
    
    bytes32[] private vestingSchedulesIds;
    mapping(bytes32 => VestingSchedule) private vestingSchedules;
    mapping(address => uint256) private holdersVestingCount;

    function initialize(
        address _owner,
        IERC20WithBurn _rewardToken, 
        address _treasury, 
        address _DWStaking,
        address _DDXStaking,
        uint _startVestingTime
    ) external initializer {
        /// @dev: ZA - Zero address
        require(_DWStaking != address(0), "ZA");
        require(_DDXStaking != address(0), "ZA");
        require(address(_rewardToken) != address(0), "ZA");
        require(_treasury != address(0), "ZA");

        startVestingTime = _startVestingTime;

        rewardToken = _rewardToken;
        treasury = _treasury;
        DDXStaking = _DDXStaking;
        DWStaking = _DWStaking;

        vestingDuration = 10 * 30 days; // 10 months, 10% - 1 month
        vestingPeriodInSeconds = 30 days; // 10 
        rewardApplicable = true;

        _setupRole(SUB_ADMIN_ROLE, _owner);
    }

    function stakeWithVault(
        uint256 _pid,
        uint256 _originAmount,
        uint256 _lockedAmount
    ) external {
        address sender = msg.sender;
        
        if (_lockedAmount > 0 && block.timestamp <= startVestingTime) {
            VestingSchedule storage vestingSchedule = _getVestingSchedule(computeVestingScheduleIdForAddressAndIndex(sender, 0));
            
            require(vestingSchedule.beneficiary == sender, "pool: vesting schedule not existed");
            require(rewardToken.allowance(sender, address(this)) >= _originAmount, "pool: allowance not enough");
            require(vestingSchedule.amountTotal >= _lockedAmount, "pool: vesting schedule amount total not enough to cover staking");
            
            vestingSchedule.amountTotal -= _lockedAmount;
        } else {
            require(_lockedAmount == 0, "Locked amount must be 0");
        }

        if (_originAmount > 0) {
            TransferHelper.safeTransferFrom(address(rewardToken), _msgSender(), address(this), _originAmount);
        }
        
        rewardToken.approve(DDXStaking, _originAmount);
        IDDXStaking(DDXStaking).depositByVault(_pid, _originAmount, _lockedAmount, sender);

    }

    function reStakeWithVault(
        uint256 _pid,
        uint256 _originAmount,
        uint256 _lockedAmount
    ) external {
        address sender = msg.sender;
        
        if (_lockedAmount > 0 && block.timestamp <= startVestingTime) {
            VestingSchedule storage vestingSchedule = _getVestingSchedule(computeVestingScheduleIdForAddressAndIndex(sender, 0));
            
            require(vestingSchedule.beneficiary == sender, "pool: vesting schedule not existed");
            require(rewardToken.allowance(sender, address(this)) >= _originAmount, "pool: allowance not enough");
            require(vestingSchedule.amountTotal >= _lockedAmount, "pool: vesting schedule amount total not enough to cover staking");
            
            vestingSchedule.amountTotal -= _lockedAmount;
        } else {
            require(_lockedAmount == 0, "Locked amount must be 0");
        }

        if (_originAmount > 0) {
            TransferHelper.safeTransferFrom(address(rewardToken), _msgSender(), address(this), _originAmount);
        }
        
        rewardToken.approve(DDXStaking, _originAmount);
        IDDXStaking(DDXStaking).restakeWithVault(_pid, _originAmount, _lockedAmount, sender);

    }

    function multipleRelease(
        bytes32[] calldata vestingScheduleIds
    ) external nonReentrant whenNotPaused{
        for (uint i; i < vestingScheduleIds.length;) {
            release(vestingScheduleIds[i]);
            unchecked {
                i++;
            }
        }
    }

    /**
     * @notice Release vested amount of tokens.
     * @param vestingScheduleId the vesting schedule identifier
     */
    function release(
        bytes32 vestingScheduleId
    ) public nonReentrant whenNotPaused onlyIfVestingScheduleNotRevoked(vestingScheduleId) {
        VestingSchedule storage vestingSchedule = vestingSchedules[
            vestingScheduleId
        ];
        bool isBeneficiary = msg.sender == vestingSchedule.beneficiary;

        require(
            isBeneficiary,
            "TokenVesting: only beneficiary and owner can release vested tokens"
        );
        uint256 vestedAmount = _computeReleasableAmount(vestingSchedule);
        vestingSchedule.released = vestingSchedule.released + vestedAmount;
        address payable beneficiaryPayable = payable(
            vestingSchedule.beneficiary
        );
        vestingSchedulesTotalAmount = vestingSchedulesTotalAmount - vestedAmount;
        TransferHelper.safeTransfer(address(rewardToken), beneficiaryPayable, vestedAmount);
    }


    function rewardFromDWStaking(address _beneficiary, uint256 _amount) external override {
        require(msg.sender == DWStaking, "vault: must be called from DWStaking");
        require(rewardApplicable, "vault: ddx reward duration is ended");

        if (block.timestamp > startVestingTime) {
            _createVestingSchedule(_beneficiary, block.timestamp, 0, vestingDuration, vestingPeriodInSeconds, true, _amount);
        } else {
            VestingSchedule storage vestingSchedule = _getVestingSchedule(computeVestingScheduleIdForAddressAndIndex(_beneficiary, 0));

            if (vestingSchedule.beneficiary == address(0)) {
                _createVestingSchedule(_beneficiary, startVestingTime, 0, vestingDuration, vestingPeriodInSeconds, true, _amount);
                return;
            }

            vestingSchedule.amountTotal += _amount;
            
        }
    }

    function toggleRewardApplicable() external onlyRole(SUB_ADMIN_ROLE) {
        rewardApplicable = rewardApplicable ? false : true;
    }

    /**
     * @notice Returns the vesting schedule information for a given holder and index.
     * @return the vesting schedule structure information
     */
    function getVestingScheduleByAddressAndIndex(
        address holder,
        uint256 index
    ) public view returns (VestingSchedule memory) {
        return
            _getVestingSchedule(
                computeVestingScheduleIdForAddressAndIndex(holder, index)
            );
    }

     /**
     * @dev Computes the vesting schedule identifier for an address and an index.
     */
    function computeVestingScheduleIdForAddressAndIndex(
        address holder,
        uint256 index
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(holder, index));
    }

    /**
     * @dev Computes the next vesting schedule identifier for a given holder address.
     */
    function computeNextVestingScheduleIdForHolder(
        address holder
    ) public view returns (bytes32) {
        return
            computeVestingScheduleIdForAddressAndIndex(
                holder,
                holdersVestingCount[holder]
            );
    }

    function _verifyAllowance(address _user, address _token, uint _amount) internal view returns(bool) {
        uint allowance = IERC20WithBurn(_token).allowance(_user, address(this));
        return allowance >= _amount;
    }


    function _deliverTokens(address _beneficiary, uint _amount) internal {
        TransferHelper.safeTransferFrom(address(rewardToken), treasury, _beneficiary, _amount);
    }

     /**
     * @notice Returns the vesting schedule information for a given identifier.
     * @return the vesting schedule structure information
    */
    function _getVestingSchedule(
        bytes32 vestingScheduleId
    ) internal view returns (VestingSchedule storage) {
        return vestingSchedules[vestingScheduleId];
    }

    /**
     * @dev Computes the releasable amount of tokens for a vesting schedule.
     * @return the amount of releasable tokens
     */
    function _computeReleasableAmount(
        VestingSchedule memory vestingSchedule
    ) internal view returns (uint256) {
        // Retrieve the current time.
        uint256 currentTime = block.timestamp;
        // If the current time is before the cliff, no tokens are releasable.
        if ((currentTime < vestingSchedule.cliff) || vestingSchedule.revoked) {
            return 0;
        }
        // If the current time is after the vesting period, all tokens are releasable,
        // minus the amount already released.
        else if (
            currentTime >= vestingSchedule.start + vestingSchedule.duration
        ) {
            return vestingSchedule.amountTotal - vestingSchedule.released;
        }
        // Otherwise, some tokens are releasable.
        else {
            // Compute the number of full vesting periods that have elapsed.
            uint256 timeFromStart = currentTime - vestingSchedule.start;
            uint256 secondsPerSlice = vestingSchedule.slicePeriodSeconds;
            uint256 vestedSlicePeriods = timeFromStart / secondsPerSlice;
            uint256 vestedSeconds = vestedSlicePeriods * secondsPerSlice;
            // Compute the amount of tokens that are vested.
            uint256 vestedAmount = (vestingSchedule.amountTotal *
                vestedSeconds) / vestingSchedule.duration;
            // Subtract the amount already released and return.
            return vestedAmount - vestingSchedule.released;
        }
    }

    /**
     * @notice Creates a new vesting schedule for a beneficiary.
     * @param _beneficiary address of the beneficiary to whom vested tokens are transferred
     * @param _start start time of the vesting period
     * @param _cliff duration in seconds of the cliff in which tokens will begin to vest
     * @param _duration duration in seconds of the period in which the tokens will vest
     * @param _slicePeriodSeconds duration of a slice period for the vesting in seconds
     * @param _revocable whether the vesting is revocable or not
     * @param _amount total amount of tokens to be released at the end of the vesting
     */
    function _createVestingSchedule(
        address _beneficiary,
        uint256 _start,
        uint256 _cliff,
        uint256 _duration,
        uint256 _slicePeriodSeconds,
        bool _revocable,
        uint256 _amount
    ) internal {
        require(_duration > 0, "TokenVesting: duration must be > 0");
        require(_amount > 0, "TokenVesting: amount must be > 0");
        require(
            _slicePeriodSeconds >= 1,
            "TokenVesting: slicePeriodSeconds must be >= 1"
        );
        require(_duration >= _cliff, "TokenVesting: duration must be >= cliff");
        bytes32 vestingScheduleId = computeNextVestingScheduleIdForHolder(
            _beneficiary
        );
        uint256 cliff = _start + _cliff;
        vestingSchedules[vestingScheduleId] = VestingSchedule(
            _beneficiary,
            cliff,
            _start,
            _duration,
            _slicePeriodSeconds,
            _revocable,
            _amount,
            0,
            false
        );
        vestingSchedulesTotalAmount = vestingSchedulesTotalAmount + _amount;
        vestingSchedulesIds.push(vestingScheduleId);
        uint256 currentVestingCount = holdersVestingCount[_beneficiary];
        holdersVestingCount[_beneficiary] = currentVestingCount + 1;
    }


    

    /// --------------------------------
    /// ------- Modifier Function ------
    /// --------------------------------

    /**
     * @dev Reverts if the vesting schedule does not exist or has been revoked.
     */
    modifier onlyIfVestingScheduleNotRevoked(bytes32 vestingScheduleId) {
        require(!vestingSchedules[vestingScheduleId].revoked);
        _;
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";
import "./interfaces/IDChainStaking.sol";
import "./libraries/TransferHelper.sol";
import "./DChainBase.sol";

contract DGWVault is DChainBase {
  event PendingSoldTokenClaimed(
    address indexed claimer,
    address indexed beneficiary,
    uint soldTokens
  );

  event BuyTokenByToken(
    address indexed investor,
    address indexed offerToken,
    address indexed beneficiary,
    uint amount,
    uint soldTokens
  );

  event TokenReleased(address indexed beneficiary, uint vestedAmount);

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

  struct OfferedCurrency {
    uint256 decimals;
    uint256 rate;
    bool created;
  }

  uint256 private constant PRECISION_POINT = 10000;

  uint256 public tgePercentage;

  uint public openTime;
  uint public closeTime;
  uint public lockBeforeVesting;
  uint public vestingDuration;
  uint public vestingPeriodInSeconds;

  address public treasury;
  address public admin;
  address public fundReceiver;
  address public DWStaking;

  IERC20WithBurn public soldToken;

  uint public totalRaiseAmount; // In Sold token
  uint public totalRaised; // in Offer currency

  uint public totalSold; // In Sold token

  uint256 private vestingSchedulesTotalAmount;

  // Asset token -> Offered Currency (to $)
  mapping(address => OfferedCurrency) public offeredCurrencies;
  // Sender -> pending claim
  mapping(address => uint) public pendingSoldTokenClaim;
  // sender -> vesting schedule
  mapping(address => VestingSchedule) public vestingSchedules;

  mapping(address => uint) public totalPurchased;

  bool public allowToStakeUsingLockedBalance;

  function initialize(
    address _owner,
    IERC20WithBurn _soldToken,
    address _treasury,
    address _fundReceiver,
    address _DWStaking,
    uint _tgePercentage,
    uint _totalRaiseAmount,
    uint _lockBeforeVesting,
    uint _openTime,
    uint _duration
  ) external initializer {
    __DChainBase_init(_owner);

    /// @dev: ZA - Zero address
    require(_DWStaking != address(0), "ZA");
    require(address(_soldToken) != address(0), "ZA");
    require(_treasury != address(0), "ZA");
    require(_fundReceiver != address(0), "ZA");
    require(_tgePercentage <= PRECISION_POINT, "EOP");

    openTime = _openTime;
    closeTime = openTime + _duration;
    lockBeforeVesting = _lockBeforeVesting;

    soldToken = _soldToken;
    treasury = _treasury;
    fundReceiver = _fundReceiver;
    DWStaking = _DWStaking;
    totalRaiseAmount = _totalRaiseAmount;
    tgePercentage = _tgePercentage;
    admin = _owner;

    vestingDuration = 10 * 30 days; // 10% per month
    vestingPeriodInSeconds = 30 days; // one per month
  }

  /**
   * @notice Release vested amount of tokens.
   */
  function release() public nonReentrant {
    VestingSchedule storage vestingSchedule = vestingSchedules[msg.sender];
    bool isBeneficiary = msg.sender == vestingSchedule.beneficiary;

    require(
      isBeneficiary,
      "TokenVesting: only beneficiary can release vested tokens"
    );
    uint256 vestedAmount = _computeReleasableAmount(vestingSchedule);
    require(
      vestedAmount > 0,
      "TokenVesting: cannot release tokens, not enough vested tokens"
    );
    vestingSchedule.released = vestingSchedule.released + vestedAmount;
    address payable beneficiaryPayable = payable(vestingSchedule.beneficiary);
    vestingSchedulesTotalAmount = vestingSchedulesTotalAmount - vestedAmount;
    _deliverTokens(beneficiaryPayable, vestedAmount);

    emit TokenReleased(beneficiaryPayable, vestedAmount);
  }

  function setTotalSold(uint _totalSold) external onlyRole(SUB_ADMIN_ROLE) {
    totalSold = _totalSold;
  }

  function setAllowToStakeUsingLockedBalance(
    bool _allowToStakeUsingLockedBalance
  ) external onlyRole(SUB_ADMIN_ROLE) {
    allowToStakeUsingLockedBalance = _allowToStakeUsingLockedBalance;
  }

  function setCloseTime(uint256 _closeTime) external onlyRole(SUB_ADMIN_ROLE) {
    closeTime = _closeTime;
  }

  function setOpenTime(uint256 _openTime) external onlyRole(SUB_ADMIN_ROLE) {
    openTime = _openTime;
  }

  function setLockBeforeVesting(uint256 _lockBeforeVesting) external onlyAdmin {
    lockBeforeVesting = _lockBeforeVesting;
  }

  function stakeWithVault(
    uint256 _originAmount,
    uint256 _lockedAmount,
    address _referrer
  ) external {
    address sender = msg.sender;
    VestingSchedule storage vestingSchedule = vestingSchedules[sender];

    if (_lockedAmount > 0 && availableToStakeThroughVault(sender)) {
      require(
        allowToStakeUsingLockedBalance,
        "pool: not allow to stake using locked balance"
      );
      require(
        vestingSchedule.beneficiary == sender,
        "pool: vesting schedule not existed"
      );
      require(
        vestingSchedule.amountTotal >= _lockedAmount,
        "pool: vesting schedule amount total not enough to cover staking"
      );

      vestingSchedule.amountTotal -= _lockedAmount;
    } else {
      require(_lockedAmount == 0, "locked amount must be 0");
    }

    require(
      soldToken.allowance(sender, address(this)) >= _originAmount,
      "pool: allowance not enough"
    );

    if (_originAmount > 0) {
      TransferHelper.safeTransferFrom(
        address(soldToken),
        _msgSender(),
        address(this),
        _originAmount
      );
      soldToken.approve(DWStaking, _originAmount);
    }

    IDChainStaking(DWStaking).depositByVault(
      _originAmount,
      _lockedAmount,
      sender,
      _referrer
    );
  }

  function buyTokenWithToken(
    address _offerToken,
    address _beneficiary,
    uint256 _amount
  ) external whenNotPaused nonReentrant {
    OfferedCurrency memory offeredCurrency = offeredCurrencies[_offerToken];

    require(
      offeredCurrency.rate != 0,
      "PresalePool::Offer currency rate is invalid!"
    );
    require(_validPurchase(), "PresalePool::Pool is ended!");
    require(
      _verifyAllowance(msg.sender, _offerToken, _amount),
      "PresalePool::Allowance for offered token unreached!"
    );

    uint soldTokenAmount = _getSoldTokensByOfferedCurrency(
      _offerToken,
      _amount
    );
    require(
      soldTokenAmount + totalSold <= totalRaiseAmount,
      "PresalePool::Purchase amount exceeds max amount!"
    );

    _forwardFundTransfer(_offerToken, _amount);

    pendingSoldTokenClaim[_beneficiary] += soldTokenAmount;
    totalPurchased[_beneficiary] += soldTokenAmount;

    totalRaised = totalRaised + _amount;
    totalSold = totalSold + soldTokenAmount;

    emit BuyTokenByToken(
      _msgSender(),
      _offerToken,
      _beneficiary,
      _amount,
      soldTokenAmount
    );
  }

  function claim(address _beneficiary) external whenNotPaused nonReentrant {
    uint pendingTokenAmount = pendingSoldTokenClaim[_msgSender()];

    require(block.timestamp > closeTime, "pool: sale is not ended");
    require(
      block.timestamp <= closeTime + lockBeforeVesting,
      "pool: claim time is ended"
    );
    require(
      pendingTokenAmount > 0,
      "pool: pending claim amount must be positive"
    );

    // Calculate TGE Amount
    uint tgeAmount = (pendingTokenAmount * tgePercentage) / PRECISION_POINT;
    uint remainmingAmount = pendingTokenAmount - tgeAmount;

    // Deliver TGE Amount to user's beneficiary address
    if (tgeAmount > 0) {
      _deliverTokens(_beneficiary, tgeAmount);
    }

    VestingSchedule storage vestingSchedule = vestingSchedules[_beneficiary];

    if (vestingSchedule.beneficiary == address(0)) {
      _createVestingSchedule(
        _beneficiary,
        closeTime + lockBeforeVesting,
        0,
        vestingDuration,
        vestingPeriodInSeconds,
        true,
        remainmingAmount
      );
    } else {
      vestingSchedule.amountTotal += remainmingAmount;
    }

    pendingSoldTokenClaim[_msgSender()] = 0;

    emit PendingSoldTokenClaimed(
      _msgSender(),
      _beneficiary,
      pendingTokenAmount
    );
  }

  function setTGEPercentage(uint256 _tgePercentage) external onlyAdmin {
    require(_tgePercentage <= PRECISION_POINT, "EOP");
    tgePercentage = _tgePercentage;
  }

  function setTotalRaiseAmount(uint256 _totalRaiseAmount) external onlyAdmin {
    totalRaiseAmount = _totalRaiseAmount;
  }

  // how to convert from 1 Token - to $
  function setOfferedCurrency(
    address _currency,
    uint _rate,
    uint _decimals
  ) external onlyRole(SUB_ADMIN_ROLE) {
    OfferedCurrency storage offeredCurrency = offeredCurrencies[_currency];
    offeredCurrency.rate = _rate;
    offeredCurrency.decimals = _decimals;
  }

  function releasableAmount(address _user) external view returns (uint) {
    return _computeReleasableAmount(vestingSchedules[_user]);
  }

  function availableToStakeThroughVault(
    address _user
  ) public view returns (bool) {
    VestingSchedule storage vestingSchedule = vestingSchedules[_user];
    return block.timestamp <= vestingSchedule.start;
  }

  function _verifyAllowance(
    address _user,
    address _token,
    uint _amount
  ) internal view returns (bool) {
    uint allowance = IERC20WithBurn(_token).allowance(_user, address(this));
    return allowance >= _amount;
  }

  function getSoldTokenFromOfferedCurrency(
    address _token,
    uint _amount
  ) public view returns (uint) {
    return _getSoldTokensByOfferedCurrency(_token, _amount);
  }

  function _getSoldTokensByOfferedCurrency(
    address _token,
    uint _amount
  ) internal view returns (uint) {
    OfferedCurrency memory offeredCurrency = offeredCurrencies[_token];
    return (_amount * offeredCurrency.rate) / (10 ** offeredCurrency.decimals);
  }

  function _deliverTokens(address _beneficiary, uint _amount) internal {
    TransferHelper.safeTransferFrom(
      address(soldToken),
      treasury,
      _beneficiary,
      _amount
    );
  }

  function _forwardFundTransfer(address _token, uint _value) internal {
    TransferHelper.safeTransferFrom(_token, _msgSender(), fundReceiver, _value);
  }

  function _validPurchase() internal view returns (bool) {
    bool withinPerioid = block.timestamp >= openTime &&
      block.timestamp <= closeTime;
    return withinPerioid;
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
    else if (currentTime >= vestingSchedule.start + vestingSchedule.duration) {
      return vestingSchedule.amountTotal - vestingSchedule.released;
    }
    // Otherwise, some tokens are releasable.
    else {
      // Compute the number of full vesting periods that have elapsed.
      uint256 timeFromStart = currentTime - vestingSchedule.start;
      uint256 secondsPerSlice = vestingSchedule.slicePeriodSeconds;
      uint256 vestedSlicePeriods = (timeFromStart / secondsPerSlice) + 1;
      uint256 vestedSeconds = vestedSlicePeriods * secondsPerSlice;
      // Compute the amount of tokens that are vested.
      uint256 vestedAmount = (vestingSchedule.amountTotal * vestedSeconds) /
        vestingSchedule.duration;
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
    uint256 cliff = _start + _cliff;
    vestingSchedules[_beneficiary] = VestingSchedule(
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
  }

  /// --------------------------------
  /// ------- Modifier Function ------
  /// --------------------------------
}

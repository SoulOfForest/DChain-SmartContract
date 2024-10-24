// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20WithBurn } from "./interfaces/IERC20.sol";
import "./interfaces/IOracleSimple.sol";
import "./interfaces/IDChainStaking.sol";
import "./interfaces/IDDXVault.sol";
import "./interfaces/IDDXStaking.sol";
import "./interfaces/IDWVault.sol";
import "./interfaces/IEACAggregatorProxy.sol";
import "./DChainBase.sol";
import "./libraries/TransferHelper.sol";
import "./interfaces/IDGWBlacklist.sol";
import "./libraries/OracleLibrary.sol";
import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";

contract DGWStaking is IDChainStaking, DChainBase {
  using SafeERC20 for IERC20WithBurn;
  struct StakingInfo {
    uint256 totalExpectedInterest;
    uint256 totalStakesInUSD;
    uint256 claimedInterest;
    uint64 claimDuration;
    uint64 dueDate;
    uint64 lastClaimedTime;
    uint64 lastUpdatedTime;
    uint64 createdAt;
    address stakeToken;
    uint256 totalStakesInToken;
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

  IERC20WithBurn public override rewardToken;
  IERC20WithBurn public extraRewardToken;

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
  // sender => direct bonus
  mapping(address => uint256) public directBonus;

  // asset dress -> allowed
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

  mapping(address => bool) public couldBecomeReferrer;

  address public fundReceiver;
  address public root;

  mapping(address => bool) public directBonusRefreshExecuted;
  mapping(address => uint) public ddxRewardDistributionCount;

  uint public maximumDDXRewardDistributionCount;
  uint public extraRewardBonusPercentage;

  // Asset token => (chainlink supports)
  mapping(address => address) public assetPricesWithChainLink;

  mapping(address => address) public assetPricesWithUniV3PoolCompatible;

  IDGWBlacklist public blacklist;

  event ComissionDirectBonus(
    address indexed user,
    address indexed recipient,
    uint256 amount,
    uint amountInUSD
  );
  event ContractCreated(
    uint256 indexed contractId,
    address indexed user,
    address indexed stakeToken,
    address referrer,
    uint256 amount,
    uint256 amountInUSD,
    uint256 interestAmountInUSD,
    uint64 dueDate
  );
  event StakingContractCreated(
    address indexed user,
    address indexed referrer,
    uint indexed contractId,
    uint stakingAmount
  );
  event Withdraw(address indexed user, uint256 amount);
  event RewardHarvested(
    uint256 indexed contractId,
    address indexed claimer,
    uint256 amount,
    uint256 amountInUSD
  );

  event DDXRewarded(address indexed user, uint256 amount, uint256 amountInUSD);

  function initialize(
    address _owner,
    address _treasury,
    address _fundReceiver,
    IERC20WithBurn _rewardToken,
    IERC20WithBurn _extraRewardToken
  ) external initializer {
    __DChainBase_init(_owner);

    /// @dev: ZA - Zero address
    require(_treasury != address(0), "ZA");
    require(address(_rewardToken) != address(0), "ZA");

    fundReceiver = _fundReceiver;
    treasury = _treasury;
    rewardToken = _rewardToken;
    extraRewardToken = _extraRewardToken;
    admin = msg.sender;

    /// Commission for the invitation and only get once
    commissionInterestLevels = [
      1500, // 15%
      1000, // 10%
      500, // 5%
      500, // 5%
      500, // 5%
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

  function setBlacklist(
    IDGWBlacklist _blacklist
  ) external onlyRole(SUB_ADMIN_ROLE) {
    blacklist = _blacklist;
  }

  function setRoot(address _root) external onlyAdmin {
    root = _root;
  }

  function setAssetUniV3PoolCompatible(
    address _stakeToken,
    address _pool
  ) external onlyRole(SUB_ADMIN_ROLE) {
    assetPricesWithUniV3PoolCompatible[_stakeToken] = _pool;
  }

  function setChainLinkAssetOracle(
    address _stakeToken,
    address _oracle
  ) external onlyRole(SUB_ADMIN_ROLE) {
    assetPricesWithChainLink[_stakeToken] = _oracle;
  }

  function setExtraRewardBonusPercentage(
    uint256 _extraRewardBonusPercentage
  ) external onlyRole(SUB_ADMIN_ROLE) {
    extraRewardBonusPercentage = _extraRewardBonusPercentage;
  }

  function setMaximumDDXRewardDistribution(
    uint256 _maximumDDXRewardDistributionCount
  ) external onlyRole(SUB_ADMIN_ROLE) {
    maximumDDXRewardDistributionCount = _maximumDDXRewardDistributionCount;
  }

  function setMinimumStakingInUSD(
    uint256 _minimumStakingAmountInUSD
  ) external onlyRole(SUB_ADMIN_ROLE) {
    minimumStakingAmountInUSD = _minimumStakingAmountInUSD;
  }

  function setDirectInterest(
    uint256 _directInterest
  ) external onlyRole(SUB_ADMIN_ROLE) {
    require(
      _directInterest <= INTEREST_RATE_PRECISION_POINT,
      "pool: Direct Interest rate could not higher than 100%"
    );
    directInterest = _directInterest;
  }

  function setFundReceiver(address _fundReceiver) external onlyAdmin {
    fundReceiver = _fundReceiver;
  }

  function setClaimDuration(
    uint64 _claimDuration
  ) external onlyRole(SUB_ADMIN_ROLE) {
    claimDuration = _claimDuration;
  }

  function setDDXStaking(
    IDDXStaking _staking
  ) external onlyRole(SUB_ADMIN_ROLE) {
    require(
      address(_staking) != address(0),
      "pool: DDX Staking cannot be zero address"
    );
    DDXStaking = _staking;
  }

  function setDWVault(IDWVault _vault) external onlyRole(SUB_ADMIN_ROLE) {
    require(
      address(_vault) != address(0),
      "pool: DW vault cannot be zero address"
    );
    vault = _vault;
  }

  function setDDXVault(IDDXVault _vault) external onlyRole(SUB_ADMIN_ROLE) {
    require(
      address(_vault) != address(0),
      "pool: DDX vault cannot be zero address"
    );
    DDXVault = _vault;
  }

  function setAssetOracle(
    address _pegToken,
    address _oracle
  ) external onlyRole(SUB_ADMIN_ROLE) {
    assetPrices[_pegToken] = _oracle;
  }

  // how to convert from 1 Token - to $
  function setOfferedCurrency(
    address _currency,
    uint _rate,
    uint _decimal
  ) external onlyRole(SUB_ADMIN_ROLE) {
    OfferedCurrency storage offeredCurrency = offeredCurrencies[_currency];
    offeredCurrency.rate = _rate;
    offeredCurrency.decimal = _decimal;
  }

  function setAllowedStakeToken(
    address _stakeToken
  ) external onlyRole(SUB_ADMIN_ROLE) {
    StakeToken storage stakeToken = allowedStakeTokens[_stakeToken];
    require(!stakeToken.created, "Allowed token is already existed!");
    stakeToken.created = true;
  }

  function refreshDirectBonus(
    address[] memory _addresses
  ) external onlyRole(SUB_ADMIN_ROLE) {
    for (uint i = 0; i < _addresses.length; i++) {
      if (!directBonusRefreshExecuted[_addresses[i]]) {
        directBonusRefreshExecuted[_addresses[i]] = true;
        directBonus[_addresses[i]] = _convertTokenToUSD(
          address(rewardToken),
          directBonus[_addresses[i]]
        );
      }
    }
  }

  /// -----------------------------------
  /// ---------- Core Function ----------
  /// -----------------------------------

  function depositByVault(
    uint256 _originAmount,
    uint _lockedAmount,
    address _user,
    address _referrer
  ) external override whenNotPaused nonReentrant {
    require(_msgSender() == address(vault), "pool: Not stake by vault");

    uint totalStakeAmount = _originAmount + _lockedAmount;

    require(totalStakeAmount > 0, "pool: amount cannot be zero");

    // Forward from vault to smart contract
    _forwardStakeToken(address(rewardToken), address(vault), _originAmount);
    uint amountOutInUSD = _validateMinimumStakingAmount(
      address(rewardToken),
      totalStakeAmount
    );

    // If user choose to stake with platform token, need to specify which peg token you want to convert to
    if (_originAmount > 0) {
      rewardToken.burn(_originAmount);
    }

    _referrer = _joinByReferral(_user, _referrer, amountOutInUSD);
    _createStakingContract(
      _user,
      address(rewardToken),
      _referrer,
      totalStakeAmount,
      amountOutInUSD
    );

    _rewardDDXToUser(amountOutInUSD, _user);
  }

  function deposit(
    uint256 amount,
    address stakeToken,
    address referrer
  ) external whenNotPaused nonReentrant {
    address sender = msg.sender;

    require(amount > 0, "pool: amount cannot be zero");
    require(
      sender != address(0),
      "pool: stake address can not be zero address"
    );

    // Forward user tokens to smart contract
    uint stakingAmount = _forwardStakeToken(stakeToken, sender, amount);
    uint amountOutInUSD = _validateMinimumStakingAmount(
      stakeToken,
      stakingAmount
    );

    // If uesr choose to stake with other tokens, the token needs to be in the allowed list.
    if (stakeToken != address(rewardToken)) {
      StakeToken memory allowedStakeToken = allowedStakeTokens[stakeToken];
      require(allowedStakeToken.created, "pool: stake token is not allowed");
    }

    // If user choose to stake with platform token, need to specify which peg token you want to convert to
    if (stakeToken == address(rewardToken)) {
      rewardToken.burn(stakingAmount);
    } else {
      IERC20WithBurn(stakeToken).safeTransfer(fundReceiver, amount);
    }

    referrer = _joinByReferral(sender, referrer, amountOutInUSD);
    _createStakingContract(
      sender,
      stakeToken,
      referrer,
      stakingAmount,
      amountOutInUSD
    );

    _rewardDDXToUser(amountOutInUSD, sender);
  }

  function claimMultipleRewards(
    uint[] memory _contractIds
  ) external whenNotPaused {
    for (uint i; i < _contractIds.length; ) {
      claimReward(_contractIds[i]);
      unchecked {
        i++;
      }
    }
  }

  function claimReward(uint _contractId) public nonReentrant whenNotPaused {
    if (address(blacklist) != address(0)) {
      require(
        !blacklist.blacklisted(_msgSender()),
        "pool: user is blacklisted"
      );
    }

    _harvest(_msgSender(), _contractId);
  }

  function _harvest(address _sender, uint _contractId) internal {
    require(
      stakingContractOwnedBy[_contractId] == _sender,
      "pool: contract id not belongs to this owner"
    );

    StakingInfo storage stakingInfo = stakingContracts[_contractId];

    uint256 rewardsInUSD = pendingRewardInUSD(_contractId);
    uint256 rewardsInRewardTokens = _convertUSDToRewardToken(rewardsInUSD);

    if (rewardsInRewardTokens > 0) {
      // Transfer the interest amount to owner
      rewardToken.transferFrom(treasury, _sender, rewardsInRewardTokens);

      uint64 lastClaimedTime = uint64(block.timestamp);

      if (lastClaimedTime > stakingInfo.dueDate) {
        lastClaimedTime = stakingInfo.dueDate;
      }

      stakingInfo.lastClaimedTime = lastClaimedTime;
      stakingInfo.claimedInterest += rewardsInUSD;
    }

    stakingInfo.lastUpdatedTime = uint64(block.timestamp);

    emit RewardHarvested(
      _contractId,
      _sender,
      rewardsInRewardTokens,
      rewardsInUSD
    );
  }

  function pendingRewardInUSD(
    uint256 _contractId
  ) public view returns (uint256) {
    if (
      address(blacklist) != address(0) &&
      blacklist.blacklisted(stakingContractOwnedBy[_contractId])
    ) {
      return 0;
    }

    StakingInfo memory stakingInfo = stakingContracts[_contractId];

    uint64 current = uint64(block.timestamp);

    if (current <= stakingInfo.lastClaimedTime) {
      return 0;
    }

    if (current > stakingInfo.dueDate) {
      current = stakingInfo.dueDate;
    }

    // Get total number of interest periods from the last time claimed
    uint64 passedDuration = current - stakingInfo.lastClaimedTime;

    uint256 pendingInterest = (stakingInfo.totalExpectedInterest *
      passedDuration *
      INTEREST_RATE_PRECISION_POINT) /
      stakingInfo.claimDuration /
      INTEREST_RATE_PRECISION_POINT;

    return pendingInterest;
  }

  // Reward token - asset
  function _validateMinimumStakingAmount(
    address _stakeToken,
    uint256 _stakingAmount
  ) internal returns (uint256 totalStakingAmountInUSD) {
    address oracle = assetPrices[_stakeToken];
    address chainLinkOracle = assetPricesWithChainLink[_stakeToken];
    address uniswapV3CompatiblePool = assetPricesWithUniV3PoolCompatible[
      _stakeToken
    ];

    uint256 amountOut;

    if (chainLinkOracle != address(0)) {
      int256 assetPrice = IEACAggregatorProxy(chainLinkOracle).latestAnswer();
      uint256 decimals = (10 **
        (IEACAggregatorProxy(chainLinkOracle).decimals() +
          IERC20WithBurn(_stakeToken).decimals() -
          6));
      amountOut = (_stakingAmount * uint256(assetPrice)) / decimals;
    }

    if (
      chainLinkOracle == address(0) && uniswapV3CompatiblePool != address(0)
    ) {
      amountOut = _calculatePriceUsingUniswapV3PoolOracle(
        _stakeToken,
        _stakingAmount,
        false
      );
    }

    if (chainLinkOracle == address(0) && oracle != address(0)) {
      // Update oracle Pricing when time elapsed has passed
      if (
        block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >
        IOracleSimple(oracle).PERIOD()
      ) {
        IOracleSimple(oracle).update();
      }

      amountOut = IOracleSimple(oracle).consult(_stakeToken, _stakingAmount);
    }

    if (amountOut > 0) {
      totalStakingAmountInUSD = amountOut;
    } else {
      // This case fallback to pre setup price
      totalStakingAmountInUSD = getStakingAmountInUSD(
        _stakeToken,
        _stakingAmount
      ); // Get amount in case we don't have an active oracle
    }

    // Needs to be make sure staking amount by $ greater than minimum amount
    require(
      totalStakingAmountInUSD >= minimumStakingAmountInUSD,
      "pool: minimum staking amount not reached"
    );
  }

  function _convertTokenToUSD(
    address _stakeToken,
    uint256 _stakingAmount
  ) internal returns (uint256) {
    uint totalStakingAmountInUSD;

    address oracle = assetPrices[_stakeToken];
    address chainLinkOracle = assetPricesWithChainLink[_stakeToken];
    address uniswapV3CompatiblePool = assetPricesWithUniV3PoolCompatible[
      _stakeToken
    ];

    uint256 amountOut;

    if (chainLinkOracle != address(0)) {
      int256 assetPrice = IEACAggregatorProxy(chainLinkOracle).latestAnswer();
      uint256 decimals = (10 **
        (IEACAggregatorProxy(chainLinkOracle).decimals() +
          IERC20WithBurn(_stakeToken).decimals() -
          6));
      amountOut = (_stakingAmount * uint256(assetPrice)) / decimals;
    }

    if (
      chainLinkOracle == address(0) && uniswapV3CompatiblePool != address(0)
    ) {
      amountOut = _calculatePriceUsingUniswapV3PoolOracle(
        address(rewardToken),
        _stakingAmount,
        false
      );
    }

    if (chainLinkOracle == address(0) && oracle != address(0)) {
      // Update oracle Pricing when time elapsed has passed
      if (
        block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >
        IOracleSimple(oracle).PERIOD()
      ) {
        IOracleSimple(oracle).update();
      }

      amountOut = IOracleSimple(oracle).consult(_stakeToken, _stakingAmount);
    }

    if (amountOut > 0) {
      totalStakingAmountInUSD = amountOut;
    } else {
      // This case fallback to pre setup price
      totalStakingAmountInUSD = getStakingAmountInUSD(
        _stakeToken,
        _stakingAmount
      ); // Get amount in case we don't have an active oracle
    }

    return totalStakingAmountInUSD;
  }

  function _convertTokenToUSDWithoutV2Oracle(
    address _stakeToken,
    uint256 _stakingAmount
  ) internal view returns (uint256) {
    uint totalStakingAmountInUSD;

    address chainLinkOracle = assetPricesWithChainLink[_stakeToken];
    address uniswapV3CompatiblePool = assetPricesWithUniV3PoolCompatible[
      _stakeToken
    ];

    uint256 amountOut;

    if (chainLinkOracle != address(0)) {
      int256 assetPrice = IEACAggregatorProxy(chainLinkOracle).latestAnswer();
      uint256 decimals = (10 **
        (IEACAggregatorProxy(chainLinkOracle).decimals() +
          IERC20WithBurn(_stakeToken).decimals() -
          6));
      amountOut = (_stakingAmount * uint256(assetPrice)) / decimals;
    }

    if (
      chainLinkOracle == address(0) && uniswapV3CompatiblePool != address(0)
    ) {
      amountOut = _calculatePriceUsingUniswapV3PoolOracle(
        address(rewardToken),
        _stakingAmount,
        false
      );
    }

    if (amountOut > 0) {
      totalStakingAmountInUSD = amountOut;
    } else {
      // This case fallback to pre setup price
      totalStakingAmountInUSD = getStakingAmountInUSD(
        _stakeToken,
        _stakingAmount
      ); // Get amount in case we don't have an active oracle
    }

    return totalStakingAmountInUSD;
  }

  function _convertUSDToRewardTokenWithoutV2Oracle(
    uint256 _amountInUSD
  ) internal view returns (uint256) {
    address uniswapV3CompatiblePool = assetPricesWithUniV3PoolCompatible[
      address(rewardToken)
    ];

    if (uniswapV3CompatiblePool != address(0)) {
      return
        _calculatePriceUsingUniswapV3PoolOracle(
          address(rewardToken),
          _amountInUSD,
          true
        );
    }

    // Get amount in case we don't have an active oracle
    return getStakingAmountByPegToken(address(rewardToken), _amountInUSD);
  }

  function _convertUSDToRewardToken(
    uint256 _amountInUSD
  ) internal returns (uint256) {
    address oracle = assetPrices[address(rewardToken)];
    address uniswapV3CompatiblePool = assetPricesWithUniV3PoolCompatible[
      address(rewardToken)
    ];

    if (uniswapV3CompatiblePool != address(0)) {
      return
        _calculatePriceUsingUniswapV3PoolOracle(
          address(rewardToken),
          _amountInUSD,
          true
        );
    }

    if (uniswapV3CompatiblePool == address(0) && oracle != address(0)) {
      // Update oracle Pricing when time elapsed has passed
      if (
        block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >
        IOracleSimple(oracle).PERIOD()
      ) {
        IOracleSimple(oracle).update();
      }

      address consultToken = IOracleSimple(oracle).token0();

      if (consultToken == address(rewardToken)) {
        consultToken = IOracleSimple(oracle).token1();
      }

      return IOracleSimple(oracle).consult(consultToken, _amountInUSD);
    }

    // Get amount in case we don't have an active oracle
    return getStakingAmountByPegToken(address(rewardToken), _amountInUSD);
  }

  function _calculatePriceUsingUniswapV3PoolOracle(
    address _token,
    uint256 _originAmount,
    bool _revert
  ) internal view returns (uint256) {
    address uniswapV3CompatiblePool = assetPricesWithUniV3PoolCompatible[
      address(_token)
    ];

    if (uniswapV3CompatiblePool != address(0)) {
      (int24 tick, ) = OracleLibrary.consult(uniswapV3CompatiblePool, 60); // 1 minute is good to go

      address token0 = IUniswapV3Pool(uniswapV3CompatiblePool).token0();
      address token1 = IUniswapV3Pool(uniswapV3CompatiblePool).token1();

      address baseToken = _token == token0 ? token0 : token1;
      address quoteToken = _token == token0 ? token1 : token0;

      (baseToken, quoteToken) = _revert
        ? (quoteToken, baseToken)
        : (baseToken, quoteToken);

      return
        OracleLibrary.getQuoteAtTick(
          tick,
          uint128(_originAmount),
          baseToken,
          quoteToken
        );
    }

    return 0;
  }

  function _convertUSDToExtraRewardToken(
    uint256 _amountInUSD
  ) internal returns (uint256) {
    address oracle = assetPrices[address(extraRewardToken)];

    if (oracle != address(0)) {
      // Update oracle Pricing when time elapsed has passed
      if (
        block.timestamp - IOracleSimple(oracle).getBlockTimestampLast() >
        IOracleSimple(oracle).PERIOD()
      ) {
        IOracleSimple(oracle).update();
      }

      address consultToken = IOracleSimple(oracle).token0();

      if (consultToken == address(extraRewardToken)) {
        consultToken = IOracleSimple(oracle).token1();
      }

      return IOracleSimple(oracle).consult(consultToken, _amountInUSD);
    }

    // Get amount in case we don't have an active oracle
    return getStakingAmountByPegToken(address(extraRewardToken), _amountInUSD);
  }

  function getAmountDWByUSD(
    uint _amountInUSD
  ) external override returns (uint) {
    return _convertUSDToRewardToken(_amountInUSD);
  }

  function getAmountDWByUSDWithoutOracle(
    uint _amountInUSD
  ) external view returns (uint) {
    return _convertUSDToRewardTokenWithoutV2Oracle(_amountInUSD);
  }

  function getAmountUSDByToken(
    address _stakeToken,
    uint256 _stakingAmount
  ) external override returns (uint) {
    return _convertTokenToUSD(_stakeToken, _stakingAmount);
  }

  function getAmountUSDByTokenWithoutV2Oracle(
    address _stakeToken,
    uint256 _stakingAmount
  ) external view returns (uint) {
    return _convertTokenToUSDWithoutV2Oracle(_stakeToken, _stakingAmount);
  }

  function getAmountUSDByTokenUsingUniswapOracle(
    address _stakeToken,
    uint256 _stakingAmount
  ) external view returns (uint) {
    return
      _calculatePriceUsingUniswapV3PoolOracle(
        _stakeToken,
        _stakingAmount,
        false
      );
  }

  function getAmountDWByUSDStatic(uint _amountInUSD) external returns (uint) {
    (bool success, bytes memory data) = address(this).call(
      abi.encodeWithSignature("getAmountDWByUSD(uint256)", _amountInUSD)
    );
    return abi.decode(data, (uint256));
  }

  function getAmountUSDByTokenStatic(
    address _stakeToken,
    uint256 _stakingAmount
  ) external returns (uint) {
    (bool success, bytes memory data) = address(this).call(
      abi.encodeWithSignature(
        "getAmountUSDByToken(address,uint256)",
        _stakeToken,
        _stakingAmount
      )
    );
    return abi.decode(data, (uint256));
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
    return (_amount * (10 ** currency.decimal)) / currency.rate;
  }

  function getStakingAmountByPegToken(
    address _token,
    uint _amount
  ) public view returns (uint) {
    OfferedCurrency memory currency = offeredCurrencies[_token];
    return (_amount * currency.rate) / (10 ** currency.decimal);
  }

  function getMultipleContractInfos(
    uint256[] calldata _contractIds
  ) external view returns (StakingInfo[] memory) {
    StakingInfo[] memory detailStakingInfos = new StakingInfo[](
      _contractIds.length
    );

    for (uint i = 0; i < _contractIds.length; i++) {
      detailStakingInfos[i] = stakingContracts[_contractIds[i]];
    }

    return detailStakingInfos;
  }

  function getAllPendingRewards(
    uint256[] calldata _contractIds
  ) external view returns (uint) {
    uint availableToClaim = 0;

    for (uint i = 0; i < _contractIds.length; i++) {
      availableToClaim += pendingRewardInUSD(_contractIds[i]);
    }

    return availableToClaim;
  }

  function _forwardStakeToken(
    address stakeToken,
    address sender,
    uint256 amount
  ) internal returns (uint256) {
    uint256 totalStakingbefore = IERC20WithBurn(stakeToken).balanceOf(
      address(this)
    );
    // Locking principal deposit amount
    IERC20WithBurn(stakeToken).safeTransferFrom(sender, address(this), amount);
    // Get balance of contract after staking
    uint256 totalStakingAfter = IERC20WithBurn(stakeToken).balanceOf(
      address(this)
    );

    return totalStakingAfter - totalStakingbefore;
  }

  function _joinByReferral(
    address _sender,
    address _referrer,
    uint _stakingAmount
  ) internal returns (address) {
    bool noReferrerAtFirst = false;

    if (_referrer == address(0) && referredBy[_sender] == address(0)) {
      referredBy[_sender] = root;
      totalReferralInvitations[root] += 1;
      noReferrerAtFirst = true;
    }

    // Validate Referrals
    if (_referrer != address(0)) {
      require(
        couldBecomeReferrer[_referrer],
        "pool: this user has not joined the system yet!"
      );
      require(
        referredBy[_sender] == address(0) && _referrer != _sender,
        "pool: user already joined by referral"
      );

      address referrerReferredBy = referredBy[_referrer];

      if (referrerReferredBy != address(0) && referrerReferredBy == _sender) {
        revert("pool: failed because of circulating referral circle");
      }

      referredBy[_sender] = _referrer;
      totalReferralInvitations[_referrer] += 1;
    }

    if (referredBy[_sender] != address(0)) {
      address referrerBy = referredBy[_sender];

      uint256 rewardsInRewardTokens = _convertUSDToRewardToken(_stakingAmount);
      uint256 rewardsInUSD = (_stakingAmount * directInterest) /
        INTEREST_RATE_PRECISION_POINT;
      // Give direct intetest to the refferer
      uint256 directInterestForReffer = (rewardsInRewardTokens *
        directInterest) / INTEREST_RATE_PRECISION_POINT;
      rewardToken.transferFrom(treasury, referrerBy, directInterestForReffer);

      // Update direct bonus for investor's parent
      directBonus[referrerBy] += rewardsInUSD;
      emit ComissionDirectBonus(
        _sender,
        referrerBy,
        directInterestForReffer,
        rewardsInUSD
      );
    }

    if (noReferrerAtFirst) {
      return root;
    }

    return _referrer;
  }

  function _createStakingContract(
    address _user,
    address _stakeToken,
    address _referrer,
    uint _stakingAmount,
    uint _amountOutInUSD
  ) internal {
    uint contractId = totalStakingContracts;

    StakingInfo storage stakingInfo = stakingContracts[contractId];
    stakingInfo.createdAt = uint64(block.timestamp);
    stakingInfo.lastClaimedTime = uint64(block.timestamp);
    stakingInfo.lastUpdatedTime = uint64(block.timestamp);
    stakingInfo.totalStakesInUSD = _amountOutInUSD;
    stakingInfo.totalExpectedInterest =
      (stakingInfo.totalStakesInUSD * maximumEarningsInPercent) /
      INTEREST_RATE_PRECISION_POINT;
    stakingInfo.claimDuration = claimDuration;
    stakingInfo.dueDate = stakingInfo.createdAt + stakingInfo.claimDuration;
    stakingInfo.stakeToken = _stakeToken;
    stakingInfo.totalStakesInToken = _stakingAmount;

    totalStaked += _stakingAmount;
    totalStakingContracts++;

    stakingContractOwnedBy[contractId] = _user;

    // This user could become the referrer
    if (!couldBecomeReferrer[_user]) {
      couldBecomeReferrer[_user] = true;
    }

    emit ContractCreated(
      contractId,
      _user,
      _stakeToken,
      _referrer,
      _stakingAmount,
      _amountOutInUSD,
      stakingInfo.totalExpectedInterest - stakingInfo.totalStakesInUSD,
      stakingInfo.dueDate
    );
  }

  function _rewardDDXToUser(uint _amountOutInUSD, address _user) internal {
    uint userDDxRewardDistributionCount = ddxRewardDistributionCount[_user];
    bool exceedsMaximumRewardDistributionCount = userDDxRewardDistributionCount >=
        maximumDDXRewardDistributionCount;

    // In case, users DDX claim times has exceeds maximum distribution count, do nothing
    if (exceedsMaximumRewardDistributionCount) {
      return;
    }

    // Transfer extra DDX reward token to investor
    uint extraRewardTokenAmount = DDXStaking.getAmountDDXByUSD(
      (_amountOutInUSD * extraRewardBonusPercentage) /
        INTEREST_RATE_PRECISION_POINT
    );
    if (extraRewardTokenAmount > 0 && DDXVault.rewardApplicable()) {
      DDXVault.rewardFromDWStaking(_user, extraRewardTokenAmount);
      ddxRewardDistributionCount[_user] += 1;

      emit DDXRewarded(_user, extraRewardTokenAmount, _amountOutInUSD);
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

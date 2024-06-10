// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IDChainStaking } from "../interfaces/IDChainStaking.sol";
import { IERC20WithBurn } from "../interfaces/IERC20.sol";
import "../DChainBase.sol";

contract MockDGWSwap is DChainBase {
  using SafeERC20 for IERC20WithBurn;

  enum SwapType {
    EXACT_IN,
    EXACT_OUT
  }

  IDChainStaking public DWStaking;

  IERC20WithBurn public rewardToken;
  IERC20WithBurn public usdt;

  function initialize(
    address _owner,
    IDChainStaking _dwStaking,
    IERC20WithBurn _rewardToken,
    IERC20WithBurn _usdt
  ) external initializer {
    __DChainBase_init(_owner);
    require(address(_rewardToken) != address(0), "ZA");
    require(address(_dwStaking) != address(0), "ZA");

    rewardToken = _rewardToken;
    usdt = _usdt;
    DWStaking = _dwStaking;
  }

  function setDWStaking(IDChainStaking _DWStaking) external onlyAdmin {
    DWStaking = _DWStaking;
  }

  function setRewardToken(IERC20WithBurn _rewardToken) external onlyAdmin {
    rewardToken = _rewardToken;
  }

  function setUSDT(IERC20WithBurn _usdt) external onlyAdmin {
    usdt = _usdt;
  }

  function withdrawTokens(address _token, address _user) external onlyAdmin {
    IERC20WithBurn(_token).safeTransfer(
      _user,
      IERC20WithBurn(_token).balanceOf(address(this))
    );
  }

  function swap(
    address[2] memory _path,
    SwapType _type,
    uint _amount
  ) external whenNotPaused {
    uint amountRequired;
    uint amountOut;

    if (_path[0] == address(rewardToken)) {
      require(_path[1] == address(usdt), "Token output not matched");
    } else if (_path[0] == address(usdt)) {
      require(_path[1] == address(rewardToken), "Token output not matched");
    } else {
      revert();
    }

    if (_type == SwapType.EXACT_IN) {
      amountRequired = _amount;
      if (_path[0] == address(rewardToken)) {
        amountOut = DWStaking.getAmountUSDByToken(
          address(rewardToken),
          _amount
        );
      } else {
        amountOut = DWStaking.getAmountDWByUSD(_amount);
      }
    } else {
      amountOut = _amount;
      if (_path[0] == address(rewardToken)) {
        amountRequired = DWStaking.getAmountDWByUSD(_amount);
      } else {
        amountRequired = DWStaking.getAmountUSDByToken(
          address(rewardToken),
          _amount
        );
      }
    }

    IERC20WithBurn(_path[0]).safeTransferFrom(
      _msgSender(),
      address(this),
      amountRequired
    );
    IERC20WithBurn(_path[1]).transfer(_msgSender(), amountOut);
  }

  function pause() external onlyRole(SUB_ADMIN_ROLE) {
    _pause();
  }

  function unpause() external onlyRole(SUB_ADMIN_ROLE) {
    _unpause();
  }
}

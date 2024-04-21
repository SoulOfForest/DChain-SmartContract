// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC20.sol";

interface IDChainStaking {
    function getAmountUSDByToken(address _stakeToken, uint256 _stakingAmount) external returns(uint);
    function getAmountDWByUSD(uint _amountInUSD) external returns(uint);
    function depositByVault(uint256 _originAmount, uint _lockedAmount, address _user, address referrer) external;
    function rewardToken() external view returns(IERC20WithBurn);
}

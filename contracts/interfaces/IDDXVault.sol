// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDDXVault {
    function rewardFromDWStaking(address _beneficiary, uint256 _amount) external;
    function rewardApplicable() external view returns(bool);
    function startVestingTime() external view returns(uint256);
}

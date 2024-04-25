// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDDXStaking {
    function depositByVault(uint256 _pid, uint256 _originAmount, uint _lockedAmount, address _user) external;
    function getAmountDDXByUSD(uint256 _amountInUSD) external returns(uint);
    function restakeWithVault(uint _pid, uint _originAmount, uint _lockedAmount, address _user) external;
}

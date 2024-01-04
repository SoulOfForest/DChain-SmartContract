// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDChainStaking {
    function getAmountDWByUSD(uint _amountInUSD) external returns(uint);
    function depositByVault(uint256 _originAmount, uint _lockedAmount, address _user, address referrer) external;
    // function stakingContracts(uint256 contractId) external view returns()
}

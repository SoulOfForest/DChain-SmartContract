// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IRegister {
    function register(address _recipient) external returns (uint256 tokenId);
}


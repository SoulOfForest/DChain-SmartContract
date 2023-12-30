//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IOracleSimple {

    function getBlockTimestampLast() external view returns (uint32);

    function consult(address token, uint amountIn) external view returns (uint amountOut);

    function update() external;

    function token0() external view returns(address);
    
    function token1() external view returns(address);

    function PERIOD() external view returns(uint);
}
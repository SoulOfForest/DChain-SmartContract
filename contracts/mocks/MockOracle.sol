//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.6;


import "@uniswap/lib/contracts/libraries/FixedPoint.sol";

import "../interfaces/IPancakeFactory.sol";
import "../interfaces/IPancakePair.sol";

import '../libraries/PancakeOracleLibrary.sol';
import '../libraries/PancakeLibrary.sol';
import "hardhat/console.sol";
// fixed window oracle that recomputes the average price for the entire period once every period
// note that the price average is only guaranteed to be over at least 1 period, but may be over a longer period
contract MockOracle {
    using FixedPoint for *;

    uint public constant PERIOD = 600;
    uint32  public blockTimestampLast;
    address public immutable token0;
    address public immutable token1;

    uint public price0Average;
    uint public price1Average;

    constructor(address _token0, address _token1) public {
        token0 = _token0;
        token1 = _token1;

        price0Average = 500000000000000000;
        price1Average = 2000000000000000000;
        blockTimestampLast = uint32(block.timestamp);
    }

    function update() external {
         blockTimestampLast = uint32(block.timestamp);
    }

    // note this will always return 0 before update has been called successfully for the first time.
    function consult(address token, uint amountIn) external view returns (uint amountOut) {
        if (token == token0) {
            amountOut = price0Average * amountIn / (10 ** 18);
            console.log(amountOut);
        } else {
            require(token == token1, 'ExampleOracleSimple: INVALID_TOKEN');
            amountOut = price1Average * amountIn / (10 ** 18);
        }

    }

    function getBlockTimestampLast() external view returns (uint32) {
        return blockTimestampLast;
    }
}
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.6;


import "@uniswap/lib/contracts/libraries/FixedPoint.sol";

import "../interfaces/IPancakeFactory.sol";
import "../interfaces/IPancakePair.sol";

import '../libraries/PancakeOracleLibrary.sol';
import '../libraries/PancakeLibrary.sol';

// fixed window oracle that recomputes the average price for the entire period once every period
// note that the price average is only guaranteed to be over at least 1 period, but may be over a longer period
contract MockOracle {
    using FixedPoint for *;

    uint public constant PERIOD = 600;

    address public immutable token0;
    address public immutable token1;

    uint    public price0CumulativeLast;
    uint    public price1CumulativeLast;
    uint32  public blockTimestampLast;
    FixedPoint.uq112x112 public price0Average;
    FixedPoint.uq112x112 public price1Average;

    constructor(address tokenA, address tokenB, uint224 _price0Average, uint224 _price1Average) {
        token0 = tokenA;
        token1 = tokenB;
        price0Average = FixedPoint.uq112x112(_price0Average);
        price1Average = FixedPoint.uq112x112(_price1Average);
    }

    function update() external {
        
    }

    function updatePrice(uint224 _price0Average, uint224 _price1Average) external {
        price0Average = FixedPoint.uq112x112(_price0Average);
        price1Average = FixedPoint.uq112x112(_price1Average);
    }

    // note this will always return 0 before update has been called successfully for the first time.
    function consult(address token, uint amountIn) external view returns (uint amountOut) {
        if (token == token0) {
            amountOut = price0Average.mul(amountIn).decode144();
        } else {
            require(token == token1, 'ExampleOracleSimple: INVALID_TOKEN');
            amountOut = price1Average.mul(amountIn).decode144();
        }
    }

    function getBlockTimestampLast() external view returns (uint32) {
        return blockTimestampLast;
    }
}
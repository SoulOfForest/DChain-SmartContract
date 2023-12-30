import { BigNumber } from 'bignumber.js'

export function encodePrice(reserve0: string, reserve1: string) {
    return [new BigNumber(reserve1).multipliedBy(new BigNumber(2).pow(112)).div(reserve0).integerValue(), new BigNumber(reserve0).multipliedBy(new BigNumber(2).pow(112)).div(reserve1).integerValue()]
}
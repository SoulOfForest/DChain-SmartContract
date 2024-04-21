import { BigNumber } from 'bignumber.js'
import axios from 'axios';
import { ethers } from 'ethers';

export function encodePrice(reserve0: string, reserve1: string) {
    return [new BigNumber(reserve1).multipliedBy(new BigNumber(2).pow(112)).div(reserve0).integerValue(), new BigNumber(reserve0).multipliedBy(new BigNumber(2).pow(112)).div(reserve1).integerValue()]
}

export function decodePrice(price0Average: string) {
    return new BigNumber(price0Average).div(new BigNumber(2).pow(112)).toString();
}


const main = async () => {
    console.log(new BigNumber(101).div(1e18).toFixed());
    // const randomNumber = ethers.utils.randomBytes(32);
    // const commitment = ethers.utils.keccak256(randomNumber);
    // console.log("commitment: ", ethers.utils.hexlify(randomNumber), commitment);
    // const url = `https://fortuna-staging.dourolabs.app/v1/chains/blast-testnet/revelations/5859`;
    // console.log(await axios.get(`${url}`));
}

main();
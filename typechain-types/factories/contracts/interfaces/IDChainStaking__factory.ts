/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IDChainStaking,
  IDChainStakingInterface,
} from "../../../contracts/interfaces/IDChainStaking";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_originAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lockedAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "referrer",
        type: "address",
      },
    ],
    name: "depositByVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountInUSD",
        type: "uint256",
      },
    ],
    name: "getAmountDWByUSD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakeToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_stakingAmount",
        type: "uint256",
      },
    ],
    name: "getAmountUSDByToken",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [
      {
        internalType: "contract IERC20WithBurn",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IDChainStaking__factory {
  static readonly abi = _abi;
  static createInterface(): IDChainStakingInterface {
    return new utils.Interface(_abi) as IDChainStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDChainStaking {
    return new Contract(address, _abi, signerOrProvider) as IDChainStaking;
  }
}

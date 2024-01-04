/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IDDXStaking,
  IDDXStakingInterface,
} from "../../../contracts/interfaces/IDDXStaking";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pid",
        type: "uint256",
      },
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
    name: "getAmountDDXByUSD",
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
] as const;

export class IDDXStaking__factory {
  static readonly abi = _abi;
  static createInterface(): IDDXStakingInterface {
    return new utils.Interface(_abi) as IDDXStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IDDXStaking {
    return new Contract(address, _abi, signerOrProvider) as IDDXStaking;
  }
}

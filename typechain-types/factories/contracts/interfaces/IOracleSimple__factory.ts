/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IOracleSimple,
  IOracleSimpleInterface,
} from "../../../contracts/interfaces/IOracleSimple";

const _abi = [
  {
    inputs: [],
    name: "PERIOD",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "consult",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlockTimestampLast",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IOracleSimple__factory {
  static readonly abi = _abi;
  static createInterface(): IOracleSimpleInterface {
    return new utils.Interface(_abi) as IOracleSimpleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IOracleSimple {
    return new Contract(address, _abi, signerOrProvider) as IOracleSimple;
  }
}

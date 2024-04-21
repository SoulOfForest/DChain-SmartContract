/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IUncxTokenVesting,
  IUncxTokenVestingInterface,
} from "../../../contracts/interfaces/IUncxTokenVesting";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address payable",
            name: "owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startEmission",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "endEmission",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "condition",
            type: "address",
          },
        ],
        internalType: "struct IUncxTokenVesting.LockParams[]",
        name: "_lock_params",
        type: "tuple[]",
      },
    ],
    name: "lock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IUncxTokenVesting__factory {
  static readonly abi = _abi;
  static createInterface(): IUncxTokenVestingInterface {
    return new utils.Interface(_abi) as IUncxTokenVestingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IUncxTokenVesting {
    return new Contract(address, _abi, signerOrProvider) as IUncxTokenVesting;
  }
}
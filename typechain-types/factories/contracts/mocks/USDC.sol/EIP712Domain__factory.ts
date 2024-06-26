/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  EIP712Domain,
  EIP712DomainInterface,
} from "../../../../contracts/mocks/USDC.sol/EIP712Domain";

const _abi = [
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b5060818061001e6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80633644e51514602d575b600080fd5b60336045565b60408051918252519081900360200190f35b6000548156fea264697066735822122028fc0f6e7803277f2dc8d46989634923f1210a2bd4fc6bbe94e7396c9c11373164736f6c634300060c0033";

type EIP712DomainConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EIP712DomainConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EIP712Domain__factory extends ContractFactory {
  constructor(...args: EIP712DomainConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<EIP712Domain> {
    return super.deploy(overrides || {}) as Promise<EIP712Domain>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): EIP712Domain {
    return super.attach(address) as EIP712Domain;
  }
  override connect(signer: Signer): EIP712Domain__factory {
    return super.connect(signer) as EIP712Domain__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EIP712DomainInterface {
    return new utils.Interface(_abi) as EIP712DomainInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EIP712Domain {
    return new Contract(address, _abi, signerOrProvider) as EIP712Domain;
  }
}

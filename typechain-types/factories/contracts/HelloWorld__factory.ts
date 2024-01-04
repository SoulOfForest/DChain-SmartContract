/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  HelloWorld,
  HelloWorldInterface,
} from "../../contracts/HelloWorld";

const _abi = [
  {
    inputs: [],
    name: "getGreet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greet",
        type: "string",
      },
    ],
    name: "setGreet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c0604052600c60809081526b48656c6c6f2c204d6f64652160a01b60a05260009061002b90826100dd565b5034801561003857600080fd5b5061019c565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061006857607f821691505b60208210810361008857634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156100d857600081815260208120601f850160051c810160208610156100b55750805b601f850160051c820191505b818110156100d4578281556001016100c1565b5050505b505050565b81516001600160401b038111156100f6576100f661003e565b61010a816101048454610054565b8461008e565b602080601f83116001811461013f57600084156101275750858301515b600019600386901b1c1916600185901b1785556100d4565b600085815260208120601f198616915b8281101561016e5788860151825594840194600190910190840161014f565b508582101561018c5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610445806101ab6000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80639698086b14610046578063cfae32171461005b578063d705a4b514610079575b600080fd5b6100596100543660046101c7565b610081565b005b610063610091565b6040516100709190610278565b60405180910390f35b61006361011f565b600061008d828261034f565b5050565b6000805461009e906102c6565b80601f01602080910402602001604051908101604052809291908181526020018280546100ca906102c6565b80156101175780601f106100ec57610100808354040283529160200191610117565b820191906000526020600020905b8154815290600101906020018083116100fa57829003601f168201915b505050505081565b60606000805461012e906102c6565b80601f016020809104026020016040519081016040528092919081815260200182805461015a906102c6565b80156101a75780601f1061017c576101008083540402835291602001916101a7565b820191906000526020600020905b81548152906001019060200180831161018a57829003601f168201915b5050505050905090565b634e487b7160e01b600052604160045260246000fd5b6000602082840312156101d957600080fd5b813567ffffffffffffffff808211156101f157600080fd5b818401915084601f83011261020557600080fd5b813581811115610217576102176101b1565b604051601f8201601f19908116603f0116810190838211818310171561023f5761023f6101b1565b8160405282815287602084870101111561025857600080fd5b826020860160208301376000928101602001929092525095945050505050565b600060208083528351808285015260005b818110156102a557858101830151858201604001528201610289565b506000604082860101526040601f19601f8301168501019250505092915050565b600181811c908216806102da57607f821691505b6020821081036102fa57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561034a57600081815260208120601f850160051c810160208610156103275750805b601f850160051c820191505b8181101561034657828155600101610333565b5050505b505050565b815167ffffffffffffffff811115610369576103696101b1565b61037d8161037784546102c6565b84610300565b602080601f8311600181146103b2576000841561039a5750858301515b600019600386901b1c1916600185901b178555610346565b600085815260208120601f198616915b828110156103e1578886015182559484019460019091019084016103c2565b50858210156103ff5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea26469706673582212204c6bdf036a56c41451db5b173a9e23328a39bdaca2d4efd94e01d4e0476c7bc664736f6c63430008100033";

type HelloWorldConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HelloWorldConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HelloWorld__factory extends ContractFactory {
  constructor(...args: HelloWorldConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<HelloWorld> {
    return super.deploy(overrides || {}) as Promise<HelloWorld>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): HelloWorld {
    return super.attach(address) as HelloWorld;
  }
  override connect(signer: Signer): HelloWorld__factory {
    return super.connect(signer) as HelloWorld__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HelloWorldInterface {
    return new utils.Interface(_abi) as HelloWorldInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HelloWorld {
    return new Contract(address, _abi, signerOrProvider) as HelloWorld;
  }
}
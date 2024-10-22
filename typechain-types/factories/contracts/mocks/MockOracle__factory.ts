/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MockOracle,
  MockOracleInterface,
} from "../../../contracts/mocks/MockOracle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint224",
        name: "_price0Average",
        type: "uint224",
      },
      {
        internalType: "uint224",
        name: "_price1Average",
        type: "uint224",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
    inputs: [],
    name: "blockTimestampLast",
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
    name: "price0Average",
    outputs: [
      {
        internalType: "uint224",
        name: "_x",
        type: "uint224",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price0CumulativeLast",
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
    inputs: [],
    name: "price1Average",
    outputs: [
      {
        internalType: "uint224",
        name: "_x",
        type: "uint224",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "price1CumulativeLast",
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
    inputs: [],
    name: "token0",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
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
  {
    inputs: [
      {
        internalType: "uint224",
        name: "_price0Average",
        type: "uint224",
      },
      {
        internalType: "uint224",
        name: "_price1Average",
        type: "uint224",
      },
    ],
    name: "updatePrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60c060405234801561001057600080fd5b506040516105b83803806105b88339818101604052608081101561003357600080fd5b5080516020808301516040808501516060958601516001600160601b031995871b86166080529290951b90931660a052825180830184526001600160e01b0394851690819052600380546001600160e01b031990811690921790558351928301909352929092169182905260048054909116909117905560805160601c60a05160601c6104db6100dd60003980610266528061039a5250806101ca52806101f052506104db6000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c8063a4e3a72f11610071578063a4e3a72f14610159578063a6bb453914610187578063b4d1d7951461018f578063c5700a0214610197578063d21220a7146101b8578063e56522a9146101c0576100b4565b80630dfe1681146100b95780633ddac953146100dd5780635909c0d51461011b5780635a3d5493146101235780635e6aaf2c1461012b578063a2e620451461014f575b600080fd5b6100c16101c8565b604080516001600160a01b039092168252519081900360200190f35b610109600480360360408110156100f357600080fd5b506001600160a01b0381351690602001356101ec565b60408051918252519081900360200190f35b61010961030d565b610109610313565b610133610319565b604080516001600160e01b039092168252519081900360200190f35b610157610328565b005b6101576004803603604081101561016f57600080fd5b506001600160e01b038135811691602001351661032a565b610133610377565b610109610386565b61019f61038c565b6040805163ffffffff9092168252519081900360200190f35b6100c1610398565b61019f6103bc565b7f000000000000000000000000000000000000000000000000000000000000000081565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316836001600160a01b031614156102645760408051602081019091526003546001600160e01b031681526102549061024f90846103c8565b610446565b6001600160901b03169050610307565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316836001600160a01b0316146102d45760405162461bcd60e51b81526004018080602001828103825260228152602001806104616022913960400191505060405180910390fd5b60408051602081019091526004546001600160e01b031681526102fb9061024f90846103c8565b6001600160901b031690505b92915050565b60005481565b60015481565b6004546001600160e01b031681565b565b60408051602080820183526001600160e01b0394851691829052600380546001600160e01b0319908116909317905582519081019092529190921691829052600480549091169091179055565b6003546001600160e01b031681565b61025881565b60025463ffffffff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b60025463ffffffff1690565b6103d061044d565b60008215806103f657505082516001600160e01b0316828102908382816103f357fe5b04145b6104315760405162461bcd60e51b81526004018080602001828103825260238152602001806104836023913960400191505060405180910390fd5b60408051602081019091529081529392505050565b5160701c90565b604051806020016040528060008152509056fe4578616d706c654f7261636c6553696d706c653a20494e56414c49445f544f4b454e4669786564506f696e743a204d554c5449504c49434154494f4e5f4f564552464c4f57a2646970667358221220b0ab4b2d0b64409e49bdf25af47ed0ed1db2d1ce5f98e5af5759124315f927d764736f6c63430007060033";

type MockOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockOracle__factory extends ContractFactory {
  constructor(...args: MockOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    _price0Average: PromiseOrValue<BigNumberish>,
    _price1Average: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockOracle> {
    return super.deploy(
      tokenA,
      tokenB,
      _price0Average,
      _price1Average,
      overrides || {}
    ) as Promise<MockOracle>;
  }
  override getDeployTransaction(
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    _price0Average: PromiseOrValue<BigNumberish>,
    _price1Average: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      tokenA,
      tokenB,
      _price0Average,
      _price1Average,
      overrides || {}
    );
  }
  override attach(address: string): MockOracle {
    return super.attach(address) as MockOracle;
  }
  override connect(signer: Signer): MockOracle__factory {
    return super.connect(signer) as MockOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockOracleInterface {
    return new utils.Interface(_abi) as MockOracleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockOracle {
    return new Contract(address, _abi, signerOrProvider) as MockOracle;
  }
}

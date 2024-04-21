/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  OracleSimple,
  OracleSimpleInterface,
} from "../../../../contracts/keepers/DWOracle.sol/OracleSimple";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "factory",
        type: "address",
      },
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
] as const;

const _bytecode =
  "0x60e06040523480156200001157600080fd5b5060405162000f9538038062000f95833981810160405260608110156200003757600080fd5b508051602080830151604090930151919291906000906200006790859085908590620004776200037d821b17901c565b9050806001600160a01b03166080816001600160a01b031660601b81525050806001600160a01b0316630dfe16816040518163ffffffff1660e01b815260040160206040518083038186803b158015620000c057600080fd5b505afa158015620000d5573d6000803e3d6000fd5b505050506040513d6020811015620000ec57600080fd5b505160601b6001600160601b03191660a0526040805163d21220a760e01b815290516001600160a01b0383169163d21220a7916004808301926020929190829003018186803b1580156200013f57600080fd5b505afa15801562000154573d6000803e3d6000fd5b505050506040513d60208110156200016b57600080fd5b505160601b6001600160601b03191660c05260408051635909c0d560e01b815290516001600160a01b03831691635909c0d5916004808301926020929190829003018186803b158015620001be57600080fd5b505afa158015620001d3573d6000803e3d6000fd5b505050506040513d6020811015620001ea57600080fd5b505160005560408051635a3d549360e01b815290516001600160a01b03831691635a3d5493916004808301926020929190829003018186803b1580156200023057600080fd5b505afa15801562000245573d6000803e3d6000fd5b505050506040513d60208110156200025c57600080fd5b505160015560408051630240bc6b60e21b8152905160009182916001600160a01b03851691630902f1ac916004808301926060929190829003018186803b158015620002a757600080fd5b505afa158015620002bc573d6000803e3d6000fd5b505050506040513d6060811015620002d357600080fd5b50805160208201516040909201516002805463ffffffff191663ffffffff909216919091179055925090506001600160701b038216158015906200031f57506001600160701b03811615155b62000371576040805162461bcd60e51b815260206004820181905260248201527f4578616d706c654f7261636c6553696d706c653a204e4f5f5245534552564553604482015290519081900360640190fd5b50505050505062000533565b600080806200038d858562000450565b604080516001600160601b0319606094851b811660208084019190915293851b81166034830152825160288184030181526048830184528051908501207fff0000000000000000000000000000000000000000000000000000000000000060688401529a90941b9093166069840152607d8301989098527efb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5609d808401919091528851808403909101815260bd909201909752805196019590952095945050505050565b600080826001600160a01b0316846001600160a01b03161415620004a65760405162461bcd60e51b815260040180806020018281038252602381526020018062000f726023913960400191505060405180910390fd5b826001600160a01b0316846001600160a01b031610620004c8578284620004cb565b83835b90925090506001600160a01b0382166200052c576040805162461bcd60e51b815260206004820152601c60248201527f50616e63616b654c6962726172793a205a45524f5f4144445245535300000000604482015290519081900360640190fd5b9250929050565b60805160601c60a05160601c60c05160601c6109ff620005736000398061022d528061044952508061019152806101b75250806102f952506109ff6000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c8063a2e6204511610071578063a2e6204514610144578063a6bb45391461014e578063b4d1d79514610156578063c5700a021461015e578063d21220a71461017f578063e56522a914610187576100a9565b80630dfe1681146100ae5780633ddac953146100d25780635909c0d5146101105780635a3d5493146101185780635e6aaf2c14610120575b600080fd5b6100b661018f565b604080516001600160a01b039092168252519081900360200190f35b6100fe600480360360408110156100e857600080fd5b506001600160a01b0381351690602001356101b3565b60408051918252519081900360200190f35b6100fe6102d4565b6100fe6102da565b6101286102e0565b604080516001600160e01b039092168252519081900360200190f35b61014c6102ef565b005b610128610426565b6100fe610435565b61016661043b565b6040805163ffffffff9092168252519081900360200190f35b6100b6610447565b61016661046b565b7f000000000000000000000000000000000000000000000000000000000000000081565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316836001600160a01b0316141561022b5760408051602081019091526003546001600160e01b0316815261021b906102169084610536565b6105b4565b6001600160901b031690506102ce565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316836001600160a01b03161461029b5760405162461bcd60e51b815260040180806020018281038252602281526020018061095e6022913960400191505060405180910390fd5b60408051602081019091526004546001600160e01b031681526102c2906102169084610536565b6001600160901b031690505b92915050565b60005481565b60015481565b6004546001600160e01b031681565b600080600061031d7f00000000000000000000000000000000000000000000000000000000000000006105bb565b600254929550909350915063ffffffff90811682039061025890821610156103765760405162461bcd60e51b81526004018080602001828103825260278152602001806109806027913960400191505060405180910390fd5b60405180602001604052808263ffffffff1660005487038161039457fe5b046001600160e01b039081169091529051600380546001600160e01b031916919092161790556040805160208101909152600154819063ffffffff8416908603816103db57fe5b046001600160e01b039081169091529051600480546001600160e01b03191691909216179055506000929092556001556002805463ffffffff191663ffffffff909216919091179055565b6003546001600160e01b031681565b61025881565b60025463ffffffff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b60025463ffffffff1690565b6000806000610486858561078a565b604080516bffffffffffffffffffffffff19606094851b811660208084019190915293851b81166034830152825160288184030181526048830184528051908501206001600160f81b031960688401529a90941b9093166069840152607d8301989098527efb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5609d808401919091528851808403909101815260bd909201909752805196019590952095945050505050565b61053e610915565b600082158061056457505082516001600160e01b03168281029083828161056157fe5b04145b61059f5760405162461bcd60e51b81526004018080602001828103825260238152602001806109a76023913960400191505060405180910390fd5b60408051602081019091529081529392505050565b5160701c90565b60008060006105c8610868565b9050836001600160a01b0316635909c0d56040518163ffffffff1660e01b815260040160206040518083038186803b15801561060357600080fd5b505afa158015610617573d6000803e3d6000fd5b505050506040513d602081101561062d57600080fd5b505160408051635a3d549360e01b815290519194506001600160a01b03861691635a3d549391600480820192602092909190829003018186803b15801561067357600080fd5b505afa158015610687573d6000803e3d6000fd5b505050506040513d602081101561069d57600080fd5b505160408051630240bc6b60e21b81529051919350600091829182916001600160a01b03891691630902f1ac916004808301926060929190829003018186803b1580156106e957600080fd5b505afa1580156106fd573d6000803e3d6000fd5b505050506040513d606081101561071357600080fd5b5080516020820151604090920151909450909250905063ffffffff808216908516146107805780840363ffffffff811661074d8486610872565b516001600160e01b031602969096019563ffffffff811661076e8585610872565b516001600160e01b0316029590950194505b5050509193909250565b600080826001600160a01b0316846001600160a01b031614156107de5760405162461bcd60e51b815260040180806020018281038252602381526020018061093b6023913960400191505060405180910390fd5b826001600160a01b0316846001600160a01b0316106107fe578284610801565b83835b90925090506001600160a01b038216610861576040805162461bcd60e51b815260206004820152601c60248201527f50616e63616b654c6962726172793a205a45524f5f4144445245535300000000604482015290519081900360640190fd5b9250929050565b63ffffffff421690565b61087a610928565b6000826001600160701b0316116108d2576040805162461bcd60e51b81526020600482015260176024820152764669786564506f696e743a204449565f42595f5a45524f60481b604482015290519081900360640190fd5b6040805160208101909152806001600160701b038416600160701b600160e01b03607087901b168161090057fe5b046001600160e01b0316815250905092915050565b6040518060200160405280600081525090565b6040805160208101909152600081529056fe50616e63616b654c6962726172793a204944454e544943414c5f4144445245535345534578616d706c654f7261636c6553696d706c653a20494e56414c49445f544f4b454e4578616d706c654f7261636c6553696d706c653a20504552494f445f4e4f545f454c41505345444669786564506f696e743a204d554c5449504c49434154494f4e5f4f564552464c4f57a2646970667358221220a36d99564fa58d918e7b55f4c307451b792ff7a8f1b893aeb489d017ebd4774164736f6c6343000706003350616e63616b654c6962726172793a204944454e544943414c5f414444524553534553";

type OracleSimpleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: OracleSimpleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class OracleSimple__factory extends ContractFactory {
  constructor(...args: OracleSimpleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    factory: PromiseOrValue<string>,
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<OracleSimple> {
    return super.deploy(
      factory,
      tokenA,
      tokenB,
      overrides || {}
    ) as Promise<OracleSimple>;
  }
  override getDeployTransaction(
    factory: PromiseOrValue<string>,
    tokenA: PromiseOrValue<string>,
    tokenB: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(factory, tokenA, tokenB, overrides || {});
  }
  override attach(address: string): OracleSimple {
    return super.attach(address) as OracleSimple;
  }
  override connect(signer: Signer): OracleSimple__factory {
    return super.connect(signer) as OracleSimple__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): OracleSimpleInterface {
    return new utils.Interface(_abi) as OracleSimpleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): OracleSimple {
    return new Contract(address, _abi, signerOrProvider) as OracleSimple;
  }
}

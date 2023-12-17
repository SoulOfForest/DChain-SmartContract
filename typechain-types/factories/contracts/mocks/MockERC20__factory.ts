/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  MockERC20,
  MockERC20Interface,
} from "../../../contracts/mocks/MockERC20";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
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
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "_from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
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
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
    ],
    name: "setDecimals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
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
    name: "totalSupply",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405260cc805460ff1916601217905534801561001d57600080fd5b506115b68061002d6000396000f3fe608060405234801561001057600080fd5b50600436106100f65760003560e01c806370a082311161009257806370a08231146101b95780637a1395aa146101e25780637ecebe00146101f557806395d89b41146102085780639dc29fac14610210578063a457c2d714610223578063a9059cbb14610236578063d505accf14610249578063dd62ed3e1461025c57600080fd5b806306fdde03146100fb578063095ea7b3146101195780631624f6c61461013c57806318160ddd1461015157806323b872dd14610163578063313ce567146101765780633644e5151461018b578063395093511461019357806340c10f19146101a6575b600080fd5b61010361026f565b6040516101109190611447565b60405180910390f35b61012c610127366004611377565b610301565b6040519015158152602001610110565b61014f61014a3660046113a0565b610319565b005b6035545b604051908152602001610110565b61012c6101713660046112d3565b610446565b60cc5460405160ff9091168152602001610110565b61015561046a565b61012c6101a1366004611377565b610479565b61014f6101b4366004611377565b61049b565b6101556101c7366004611280565b6001600160a01b031660009081526033602052604090205490565b61014f6101f0366004611411565b6104a9565b610155610203366004611280565b6104bf565b6101036104df565b61014f61021e366004611377565b6104ee565b61012c610231366004611377565b6104f8565b61012c610244366004611377565b610573565b61014f61025736600461130e565b610581565b61015561026a3660046112a1565b6106e5565b60606036805461027e90611515565b80601f01602080910402602001604051908101604052809291908181526020018280546102aa90611515565b80156102f75780601f106102cc576101008083540402835291602001916102f7565b820191906000526020600020905b8154815290600101906020018083116102da57829003601f168201915b5050505050905090565b60003361030f818585610710565b5060019392505050565b600054610100900460ff16158080156103395750600054600160ff909116105b806103535750303b158015610353575060005460ff166001145b6103bb5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff1916600117905580156103de576000805461ff0019166101001790555b6103e7846107d6565b6103f18484610823565b6103fa826104a9565b8015610440576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b600033610454858285610854565b61045f8585856108c8565b506001949350505050565b6000610474610a61565b905090565b60003361030f81858561048c83836106e5565b61049691906114c5565b610710565b6104a58282610adc565b5050565b60cc805460ff191660ff92909216919091179055565b6001600160a01b0381166000908152609960205260408120545b92915050565b60606037805461027e90611515565b6104a58282610b8b565b6000338161050682866106e5565b9050838110156105665760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016103b2565b61045f8286868403610710565b60003361030f8185856108c8565b834211156105d15760405162461bcd60e51b815260206004820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e6500000060448201526064016103b2565b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886106008c610caf565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e001604051602081830303815290604052805190602001209050600061065b82610cd7565b9050600061066b82878787610d25565b9050896001600160a01b0316816001600160a01b0316146106ce5760405162461bcd60e51b815260206004820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e6174757265000060448201526064016103b2565b6106d98a8a8a610710565b50505050505050505050565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b600061071a6104df565b604051631554d11560e21b60208201529091506024016040516020818303038152906040528051906020012081604051602001610757919061142b565b6040516020818303038152906040528051906020012014156107cb57811580159061078a575061078733846106e5565b15155b156107cb5760405162461bcd60e51b8152602060048201526011602482015270105c1c1c9bdd99481554d1150819985a5b607a1b60448201526064016103b2565b610440848484610d4d565b600054610100900460ff166107fd5760405162461bcd60e51b81526004016103b29061147a565b61082081604051806040016040528060018152602001603160f81b815250610e69565b50565b600054610100900460ff1661084a5760405162461bcd60e51b81526004016103b29061147a565b6104a58282610eaa565b600061086084846106e5565b9050600019811461044057818110156108bb5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103b2565b6104408484848403610710565b6001600160a01b03831661092c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103b2565b6001600160a01b03821661098e5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103b2565b6001600160a01b03831660009081526033602052604090205481811015610a065760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103b2565b6001600160a01b03808516600081815260336020526040808220868603905592861680825290839020805486019055915160008051602061156183398151915290610a549086815260200190565b60405180910390a3610440565b60006104747f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f610a9060655490565b6066546040805160208101859052908101839052606081018290524660808201523060a082015260009060c0016040516020818303038152906040528051906020012090509392505050565b6001600160a01b038216610b325760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103b2565b8060356000828254610b4491906114c5565b90915550506001600160a01b038216600081815260336020908152604080832080548601905551848152600080516020611561833981519152910160405180910390a35050565b6001600160a01b038216610beb5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103b2565b6001600160a01b03821660009081526033602052604090205481811015610c5f5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103b2565b6001600160a01b038316600081815260336020908152604080832086860390556035805487900390555185815291929160008051602061156183398151915291015b60405180910390a35b505050565b6001600160a01b03811660009081526099602052604090208054600181018255905b50919050565b60006104d9610ce4610a61565b8360405161190160f01b6020820152602281018390526042810182905260009060620160405160208183030381529060405280519060200120905092915050565b6000806000610d3687878787610ef8565b91509150610d4381610fb2565b5095945050505050565b6001600160a01b038316610daf5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103b2565b6001600160a01b038216610e105760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103b2565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259101610ca1565b600054610100900460ff16610e905760405162461bcd60e51b81526004016103b29061147a565b815160209283012081519190920120606591909155606655565b600054610100900460ff16610ed15760405162461bcd60e51b81526004016103b29061147a565b8151610ee4906036906020850190611133565b508051610caa906037906020840190611133565b6000806fa2a8918ca85bafe22016d0b997e4df60600160ff1b03831115610f255750600090506003610fa9565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa158015610f79573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116610fa257600060019250925050610fa9565b9150600090505b94509492505050565b6000816004811115610fd457634e487b7160e01b600052602160045260246000fd5b1415610fdd5750565b6001816004811115610fff57634e487b7160e01b600052602160045260246000fd5b14156110485760405162461bcd60e51b815260206004820152601860248201527745434453413a20696e76616c6964207369676e617475726560401b60448201526064016103b2565b600281600481111561106a57634e487b7160e01b600052602160045260246000fd5b14156110b85760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016103b2565b60038160048111156110da57634e487b7160e01b600052602160045260246000fd5b14156108205760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016103b2565b82805461113f90611515565b90600052602060002090601f01602090048101928261116157600085556111a7565b82601f1061117a57805160ff19168380011785556111a7565b828001600101855582156111a7579182015b828111156111a757825182559160200191906001019061118c565b506111b39291506111b7565b5090565b5b808211156111b357600081556001016111b8565b80356001600160a01b03811681146111e357600080fd5b919050565b600082601f8301126111f8578081fd5b813567ffffffffffffffff808211156112135761121361154a565b604051601f8301601f19908116603f0116810190828211818310171561123b5761123b61154a565b81604052838152866020858801011115611253578485fd5b8360208701602083013792830160200193909352509392505050565b803560ff811681146111e357600080fd5b600060208284031215611291578081fd5b61129a826111cc565b9392505050565b600080604083850312156112b3578081fd5b6112bc836111cc565b91506112ca602084016111cc565b90509250929050565b6000806000606084860312156112e7578081fd5b6112f0846111cc565b92506112fe602085016111cc565b9150604084013590509250925092565b600080600080600080600060e0888a031215611328578283fd5b611331886111cc565b965061133f602089016111cc565b9550604088013594506060880135935061135b6080890161126f565b925060a0880135915060c0880135905092959891949750929550565b60008060408385031215611389578182fd5b611392836111cc565b946020939093013593505050565b6000806000606084860312156113b4578283fd5b833567ffffffffffffffff808211156113cb578485fd5b6113d7878388016111e8565b945060208601359150808211156113ec578384fd5b506113f9868287016111e8565b9250506114086040850161126f565b90509250925092565b600060208284031215611422578081fd5b61129a8261126f565b6000825161143d8184602087016114e9565b9190910192915050565b60208152600082518060208401526114668160408501602087016114e9565b601f01601f19169190910160400192915050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b600082198211156114e457634e487b7160e01b81526011600452602481fd5b500190565b60005b838110156115045781810151838201526020016114ec565b838111156104405750506000910152565b600181811c9082168061152957607f821691505b60208210811415610cd157634e487b7160e01b600052602260045260246000fd5b634e487b7160e01b600052604160045260246000fdfeddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220e5754e5dc0f0381d469cbbffdb9647c27da09744037a6779e7c316f96e0bc1e464736f6c63430008040033";

type MockERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockERC20__factory extends ContractFactory {
  constructor(...args: MockERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<MockERC20> {
    return super.deploy(overrides || {}) as Promise<MockERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MockERC20 {
    return super.attach(address) as MockERC20;
  }
  override connect(signer: Signer): MockERC20__factory {
    return super.connect(signer) as MockERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockERC20Interface {
    return new utils.Interface(_abi) as MockERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MockERC20 {
    return new Contract(address, _abi, signerOrProvider) as MockERC20;
  }
}

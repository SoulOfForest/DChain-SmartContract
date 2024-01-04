/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  DChainBase,
  DChainBaseInterface,
} from "../../contracts/DChainBase";

const _abi = [
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
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
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
    inputs: [],
    name: "OWNER_ROLE",
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
    inputs: [],
    name: "PAUSER_ROLE",
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
    inputs: [],
    name: "SUB_ADMIN_ROLE",
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
    ],
    name: "__DChainBase_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610b9b806100206000396000f3fe608060405234801561001057600080fd5b50600436106100bf5760003560e01c806362d6306f1161007c57806362d6306f1461017757806391d148541461018a578063a217fddf1461019d578063b6db75a0146101a5578063d547741f146101ad578063e58378bb146101c0578063e63ab1e9146101d557600080fd5b806301ffc9a7146100c4578063022f2354146100ec578063248a9ca3146101215780632f2ff15d1461014457806336568abe146101595780635c975abb1461016c575b600080fd5b6100d76100d236600461097c565b6101ea565b60405190151581526020015b60405180910390f35b6101137fd2e4c2619ea6e0faebc405d89445161c041e30fe03373ea0473da142d57d451481565b6040519081526020016100e3565b61011361012f366004610939565b60009081526065602052604090206001015490565b610157610152366004610951565b610221565b005b610157610167366004610951565b61024b565b60975460ff166100d7565b61015761018536600461091f565b6102ce565b6100d7610198366004610951565b61040c565b610113600081565b6100d7610437565b6101576101bb366004610951565b610456565b610113600080516020610b2683398151915281565b610113600080516020610b4683398151915281565b60006001600160e01b03198216637965db0b60e01b148061021b57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60008281526065602052604090206001015461023c8161047b565b6102468383610485565b505050565b6001600160a01b03811633146102c05760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6102ca828261050b565b5050565b600054610100900460ff166102f55760405162461bcd60e51b81526004016102b790610a46565b6001600160a01b03811661034b5760405162461bcd60e51b815260206004820181905260248201527f4f776e65722063616e6e6f7420626520746865207a65726f206164647265737360448201526064016102b7565b610353610572565b61035b61059b565b6103636105ca565b61037b600080516020610b26833981519152826105f9565b610393600080516020610b46833981519152826105f9565b6103cb7fd2e4c2619ea6e0faebc405d89445161c041e30fe03373ea0473da142d57d4514600080516020610b26833981519152610603565b6103f1600080516020610b46833981519152600080516020610b26833981519152610603565b610409600080516020610b2683398151915280610603565b50565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6000610451600080516020610b268339815191523361040c565b905090565b6000828152606560205260409020600101546104718161047b565b610246838361050b565b610409813361064e565b61048f828261040c565b6102ca5760008281526065602090815260408083206001600160a01b03851684529091529020805460ff191660011790556104c73390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610515828261040c565b156102ca5760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600054610100900460ff166105995760405162461bcd60e51b81526004016102b790610a46565b565b600054610100900460ff166105c25760405162461bcd60e51b81526004016102b790610a46565b6105996106a7565b600054610100900460ff166105f15760405162461bcd60e51b81526004016102b790610a46565b6105996106da565b6102ca8282610485565b600082815260656020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b610658828261040c565b6102ca5761066581610708565b61067083602061071a565b6040516020016106819291906109a4565b60408051601f198184030181529082905262461bcd60e51b82526102b791600401610a13565b600054610100900460ff166106ce5760405162461bcd60e51b81526004016102b790610a46565b6097805460ff19169055565b600054610100900460ff166107015760405162461bcd60e51b81526004016102b790610a46565b600160c955565b606061021b6001600160a01b03831660145b60606000610729836002610aa9565b610734906002610a91565b67ffffffffffffffff81111561075a57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610784576020820181803683370190505b509050600360fc1b816000815181106107ad57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106107ea57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600061080e846002610aa9565b610819906001610a91565b90505b60018111156108ad576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061085b57634e487b7160e01b600052603260045260246000fd5b1a60f81b82828151811061087f57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936108a681610af8565b905061081c565b5083156108fc5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016102b7565b9392505050565b80356001600160a01b038116811461091a57600080fd5b919050565b600060208284031215610930578081fd5b6108fc82610903565b60006020828403121561094a578081fd5b5035919050565b60008060408385031215610963578081fd5b8235915061097360208401610903565b90509250929050565b60006020828403121561098d578081fd5b81356001600160e01b0319811681146108fc578182fd5b76020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8152600083516109d6816017850160208801610ac8565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351610a07816028840160208801610ac8565b01602801949350505050565b6020815260008251806020840152610a32816040850160208701610ac8565b601f01601f19169190910160400192915050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008219821115610aa457610aa4610b0f565b500190565b6000816000190483118215151615610ac357610ac3610b0f565b500290565b60005b83811015610ae3578181015183820152602001610acb565b83811115610af2576000848401525b50505050565b600081610b0757610b07610b0f565b506000190190565b634e487b7160e01b600052601160045260246000fdfeb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862aa2646970667358221220df389711c1d21be663a4ba6926622f39ce95b998c65d5282120dda58c6126f1e64736f6c63430008040033";

type DChainBaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DChainBaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DChainBase__factory extends ContractFactory {
  constructor(...args: DChainBaseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DChainBase> {
    return super.deploy(overrides || {}) as Promise<DChainBase>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DChainBase {
    return super.attach(address) as DChainBase;
  }
  override connect(signer: Signer): DChainBase__factory {
    return super.connect(signer) as DChainBase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DChainBaseInterface {
    return new utils.Interface(_abi) as DChainBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DChainBase {
    return new Contract(address, _abi, signerOrProvider) as DChainBase;
  }
}
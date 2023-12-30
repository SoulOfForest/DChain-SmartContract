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
import type { PromiseOrValue } from "../../common";
import type { DWVault, DWVaultInterface } from "../../contracts/DWVault";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_soldToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "_fundReceiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_totalRaiseAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "offerToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "beneficiary",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "soldTokens",
        type: "uint256",
      },
    ],
    name: "BuyTokenByToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
    name: "admin",
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
    inputs: [
      {
        internalType: "address",
        name: "_offerToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_beneficiary",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "buyTokenWithToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "fundReceiver",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "offeredCurrencies",
    outputs: [
      {
        internalType: "uint256",
        name: "decimals",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "created",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "poolStatus",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_currency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_decimals",
        type: "uint256",
      },
    ],
    name: "setOfferedCurrency",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalRaiseAmount",
        type: "uint256",
      },
    ],
    name: "setTotalRaiseAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "soldToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalRaiseAmount",
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
    name: "totalRaised",
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
    name: "totalSold",
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
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
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
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001171380380620011718339810160408190526200003491620001cf565b6200003f3362000166565b6000805460ff60a01b19169055600180556005546001600160a01b0316620000935760405162461bcd60e51b81526020600482015260026024820152615a4160f01b60448201526064015b60405180910390fd5b6001600160a01b038316620000d05760405162461bcd60e51b81526020600482015260026024820152615a4160f01b60448201526064016200008a565b6001600160a01b0382166200010d5760405162461bcd60e51b81526020600482015260026024820152615a4160f01b60448201526064016200008a565b600580546001600160a01b039586166001600160a01b0319918216179091556002805494861694821694909417909355600480549290941691831691909117909255600691909155600380549091163317905562000229565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6001600160a01b0381168114620001cc57600080fd5b50565b60008060008060808587031215620001e657600080fd5b8451620001f381620001b6565b60208601519094506200020681620001b6565b60408601519093506200021981620001b6565b6060959095015193969295505050565b610f3880620002396000396000f3fe608060405234801561001057600080fd5b50600436106100f65760003560e01c80638da5cb5b116100925780638da5cb5b146101e55780639106d7ba146101f6578063b3679bda1461020d578063c5c4744c14610216578063cc21d0231461021f578063f022869214610232578063f2fde38b1461023f578063f851a44014610252578063fb4aa0a11461026557600080fd5b80633f4ba83a146100fb5780635a3a85cb146101055780635c975abb1461015957806361d027b314610171578063657efde61461019c5780636769d1f9146101af578063715018a6146101c25780638456cb59146101ca5780638c8c2cee146101d2575b600080fd5b610103610278565b005b610137610113366004610bfe565b600a6020526000908152604090208054600182015460029092015490919060ff1683565b6040805193845260208401929092521515908201526060015b60405180910390f35b6101616102c2565b6040519015158152602001610150565b600254610184906001600160a01b031681565b6040516001600160a01b039091168152602001610150565b6101036101aa366004610c20565b6102d2565b600554610184906001600160a01b031681565b610103610320565b610103610354565b6101036101e0366004610c53565b610390565b6000546001600160a01b0316610184565b6101ff60085481565b604051908152602001610150565b6101ff60065481565b6101ff60075481565b61010361022d366004610c6c565b6103bf565b6009546101619060ff1681565b61010361024d366004610bfe565b610666565b600354610184906001600160a01b031681565b600454610184906001600160a01b031681565b6003546001600160a01b031633146102ab5760405162461bcd60e51b81526004016102a290610ca8565b60405180910390fd5b6009805460ff191660011790556102c0610701565b565b600054600160a01b900460ff1690565b6003546001600160a01b031633146102fc5760405162461bcd60e51b81526004016102a290610ca8565b6001600160a01b039092166000908152600a60205260409020600181019190915555565b6000546001600160a01b0316331461034a5760405162461bcd60e51b81526004016102a290610cdf565b6102c06000610799565b6003546001600160a01b0316331461037e5760405162461bcd60e51b81526004016102a290610ca8565b6009805460ff191690556102c06107e9565b6003546001600160a01b031633146103ba5760405162461bcd60e51b81526004016102a290610ca8565b600655565b6103c76102c2565b156103e45760405162461bcd60e51b81526004016102a290610d14565b6002600154036104365760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016102a2565b600260018181556001600160a01b0385166000908152600a60209081526040808320815160608101835281548152948101549285018390529094015460ff16151593830193909352909190036104e35760405162461bcd60e51b815260206004820152602c60248201527f50726573616c65506f6f6c3a3a4f666665722063757272656e6379207261746560448201526b20697320696e76616c69642160a01b60648201526084016102a2565b6104ee338584610849565b6105565760405162461bcd60e51b815260206004820152603360248201527f50726573616c65506f6f6c3a3a416c6c6f77616e636520666f72206f66666572604482015272656420746f6b656e20756e726561636865642160681b60648201526084016102a2565b600061056285846108ca565b9050600654600854826105759190610d54565b11156105dc5760405162461bcd60e51b815260206004820152603060248201527f50726573616c65506f6f6c3a3a507572636861736520616d6f756e742065786360448201526f65656473206d617820616d6f756e742160801b60648201526084016102a2565b6105e6858461093e565b6105f0848261095c565b826007546105fe9190610d54565b60075560085461060f908290610d54565b60085560408051848152602081018390526001600160a01b0380871692908816917f7b8fc66c17530fcf8a2688f45c1cdfc3a9712b81fe8542165c7480b8f0d24407910160405180910390a3505060018055505050565b6000546001600160a01b031633146106905760405162461bcd60e51b81526004016102a290610cdf565b6001600160a01b0381166106f55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102a2565b6106fe81610799565b50565b6107096102c2565b61074c5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016102a2565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6107f16102c2565b1561080e5760405162461bcd60e51b81526004016102a290610d14565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861077c3390565b604051636eb1769f60e11b81526001600160a01b038481166004830152306024830152600091829185169063dd62ed3e90604401602060405180830381865afa15801561089a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108be9190610d67565b90921115949350505050565b6001600160a01b0382166000908152600a602081815260408084208151606081018352815480825260018301549482019490945260029091015460ff161515918101919091529161091b9190610e64565b602082015161092a9085610e70565b6109349190610e8f565b9150505b92915050565b60045461095890839033906001600160a01b031684610973565b5050565b600554610958906001600160a01b03168383610ab1565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17905291516000928392908816916109d79190610eb1565b6000604051808303816000865af19150503d8060008114610a14576040519150601f19603f3d011682016040523d82523d6000602084013e610a19565b606091505b5091509150818015610a43575080511580610a43575080806020019051810190610a439190610ee0565b610aa95760405162461bcd60e51b815260206004820152603160248201527f5472616e7366657248656c7065723a3a7472616e7366657246726f6d3a207472604482015270185b9cd9995c919c9bdb4819985a5b1959607a1b60648201526084016102a2565b505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b1790529151600092839290871691610b0d9190610eb1565b6000604051808303816000865af19150503d8060008114610b4a576040519150601f19603f3d011682016040523d82523d6000602084013e610b4f565b606091505b5091509150818015610b79575080511580610b79575080806020019051810190610b799190610ee0565b610bdb5760405162461bcd60e51b815260206004820152602d60248201527f5472616e7366657248656c7065723a3a736166655472616e736665723a20747260448201526c185b9cd9995c8819985a5b1959609a1b60648201526084016102a2565b5050505050565b80356001600160a01b0381168114610bf957600080fd5b919050565b600060208284031215610c1057600080fd5b610c1982610be2565b9392505050565b600080600060608486031215610c3557600080fd5b610c3e84610be2565b95602085013595506040909401359392505050565b600060208284031215610c6557600080fd5b5035919050565b600080600060608486031215610c8157600080fd5b610c8a84610be2565b9250610c9860208501610be2565b9150604084013590509250925092565b6020808252601d908201527f5065726d697373696f6e3a2055736572206973206e6f742061646d696e000000604082015260600190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b8082018082111561093857610938610d3e565b600060208284031215610d7957600080fd5b5051919050565b600181815b80851115610dbb578160001904821115610da157610da1610d3e565b80851615610dae57918102915b93841c9390800290610d85565b509250929050565b600082610dd257506001610938565b81610ddf57506000610938565b8160018114610df55760028114610dff57610e1b565b6001915050610938565b60ff841115610e1057610e10610d3e565b50506001821b610938565b5060208310610133831016604e8410600b8410161715610e3e575081810a610938565b610e488383610d80565b8060001904821115610e5c57610e5c610d3e565b029392505050565b6000610c198383610dc3565b6000816000190483118215151615610e8a57610e8a610d3e565b500290565b600082610eac57634e487b7160e01b600052601260045260246000fd5b500490565b6000825160005b81811015610ed25760208186018101518583015201610eb8565b506000920191825250919050565b600060208284031215610ef257600080fd5b81518015158114610c1957600080fdfea2646970667358221220ce79470f6cc57bd98fa8a06ef3dc106b612ba20bf97e710cc57cfe9fa592df1864736f6c63430008100033";

type DWVaultConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DWVaultConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DWVault__factory extends ContractFactory {
  constructor(...args: DWVaultConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _soldToken: PromiseOrValue<string>,
    _treasury: PromiseOrValue<string>,
    _fundReceiver: PromiseOrValue<string>,
    _totalRaiseAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DWVault> {
    return super.deploy(
      _soldToken,
      _treasury,
      _fundReceiver,
      _totalRaiseAmount,
      overrides || {}
    ) as Promise<DWVault>;
  }
  override getDeployTransaction(
    _soldToken: PromiseOrValue<string>,
    _treasury: PromiseOrValue<string>,
    _fundReceiver: PromiseOrValue<string>,
    _totalRaiseAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _soldToken,
      _treasury,
      _fundReceiver,
      _totalRaiseAmount,
      overrides || {}
    );
  }
  override attach(address: string): DWVault {
    return super.attach(address) as DWVault;
  }
  override connect(signer: Signer): DWVault__factory {
    return super.connect(signer) as DWVault__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DWVaultInterface {
    return new utils.Interface(_abi) as DWVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DWVault {
    return new Contract(address, _abi, signerOrProvider) as DWVault;
  }
}

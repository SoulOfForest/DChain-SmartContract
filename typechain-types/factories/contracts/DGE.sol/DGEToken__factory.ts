/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DGEToken,
  DGETokenInterface,
} from "../../../contracts/DGE.sol/DGEToken";

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
    name: "MAXIMUM_CAP",
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
    name: "PRECISION",
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
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "buyFee",
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
        name: "",
        type: "address",
      },
    ],
    name: "lpAddresses",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sellFee",
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
    name: "swapRouter",
    outputs: [
      {
        internalType: "contract IPancakeRouter02",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_buyFee",
        type: "uint256",
      },
    ],
    name: "updateBuyFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_includeAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "updatePairAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sellFee",
        type: "uint256",
      },
    ],
    name: "updateSellFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061171f806100206000396000f3fe608060405234801561001057600080fd5b506004361061019a5760003560e01c80634cd88b76116100e45780638f7cbc40116100925780638f7cbc401461035357806395d89b4114610366578063a457c2d71461036e578063a9059cbb14610381578063aaf5eb6814610394578063c31c9c071461039d578063dd62ed3e146103b0578063f2fde38b146103c357600080fd5b80634cd88b76146102c45780635c975abb146102d757806370a08231146102e2578063715018a61461030b57806379cc6790146103135780638456cb59146103265780638da5cb5b1461032e57600080fd5b80632c4c27191161014c5780632c4c271914610246578063313ce5671461025857806339509351146102675780633f4ba83a1461027a57806340c10f191461028257806342966c6814610295578063467abe0a146102a857806347062402146102bb57600080fd5b806306fdde031461019f578063095ea7b3146101bd57806318160ddd146101e05780631d933a4a146101f25780631f4b21d41461020757806323b872dd1461022a5780632b14ca561461023d575b600080fd5b6101a76103d6565b6040516101b49190611238565b60405180910390f35b6101d06101cb3660046112a2565b610468565b60405190151581526020016101b4565b6035545b6040519081526020016101b4565b6102056102003660046112cc565b610482565b005b6101d06102153660046112e5565b60fe6020526000908152604090205460ff1681565b6101d0610238366004611307565b6104f6565b6101e460fb5481565b6101e46a14adf4b7320334b900000081565b604051601281526020016101b4565b6101d06102753660046112a2565b61051a565b61020561053c565b6102056102903660046112a2565b61054e565b6102056102a33660046112cc565b610564565b6102056102b63660046112cc565b610571565b6101e460fc5481565b6102056102d23660046113e6565b6105e1565b60975460ff166101d0565b6101e46102f03660046112e5565b6001600160a01b031660009081526033602052604090205490565b610205610740565b6102056103213660046112a2565b610752565b610205610767565b60c9546001600160a01b03165b6040516001600160a01b0390911681526020016101b4565b61020561036136600461144a565b610777565b6101a7610814565b6101d061037c3660046112a2565b610823565b6101d061038f3660046112a2565b61089e565b6101e461271081565b60fd5461033b906001600160a01b031681565b6101e46103be366004611486565b6108ac565b6102056103d13660046112e5565b6108d7565b6060603680546103e5906114b9565b80601f0160208091040260200160405190810160405280929190818152602001828054610411906114b9565b801561045e5780601f106104335761010080835404028352916020019161045e565b820191906000526020600020905b81548152906001019060200180831161044157829003601f168201915b5050505050905090565b60003361047681858561094d565b60019150505b92915050565b61048a610a71565b6127108111156104f15760405162461bcd60e51b815260206004820152602760248201527f546f6b656e3a2053776170204665652063616e206e6f74206c6172676572207460448201526668616e2033302560c81b60648201526084015b60405180910390fd5b60fb55565b600033610504858285610acb565b61050f858585610b45565b506001949350505050565b60003361047681858561052d83836108ac565b6105379190611509565b61094d565b610544610a71565b61054c610c05565b565b610556610a71565b6105608282610c57565b5050565b61056e3382610d06565b50565b610579610a71565b6127108111156105dc5760405162461bcd60e51b815260206004820152602860248201527f546f6b656e3a2053776170204665652063616e206e6f74206c6172676572207460448201526768616e203130302560c01b60648201526084016104e8565b60fc55565b600054610100900460ff16158080156106015750600054600160ff909116105b8061061b5750303b15801561061b575060005460ff166001145b61067e5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016104e8565b6000805460ff1916600117905580156106a1576000805461ff0019166101001790555b6106ab8383610e28565b6106b3610e59565b6106bb610e80565b6106c3610eaf565b6107d060fc55610bb860fb5560fd80546001600160a01b031916738cfe327cec66d1c090dd72bd0ff11d690c33a2eb179055801561073b576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050565b610748610a71565b61054c6000610ede565b61075d823383610acb565b6105608282610d06565b61076f610a71565b61054c610f30565b61077f610a71565b6001600160a01b0382166107e95760405162461bcd60e51b815260206004820152602b60248201527f546f6b656e3a205061697220616464726573732063616e206e6f74206265207a60448201526a65726f206164647265737360a81b60648201526084016104e8565b6001600160a01b0391909116600090815260fe60205260409020805460ff1916911515919091179055565b6060603780546103e5906114b9565b6000338161083182866108ac565b9050838110156108915760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016104e8565b61050f828686840361094d565b600033610476818585610b45565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b6108df610a71565b6001600160a01b0381166109445760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016104e8565b61056e81610ede565b6001600160a01b0383166109af5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016104e8565b6001600160a01b038216610a105760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016104e8565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b60c9546001600160a01b0316331461054c5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104e8565b6000610ad784846108ac565b90506000198114610b3f5781811015610b325760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016104e8565b610b3f848484840361094d565b50505050565b60fd5460009033906001600160a01b03168103610b7e5761271060fb5484610b6d919061151c565b610b77919061153b565b9150610bda565b806001600160a01b0316856001600160a01b0316148015610bb757506001600160a01b038116600090815260fe602052604090205460ff165b15610bda5761271060fc5484610bcd919061151c565b610bd7919061153b565b91505b610bee8585610be9858761155d565b610f6d565b8115610bfe57610bfe8583610d06565b5050505050565b610c0d611106565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b038216610cad5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016104e8565b8060356000828254610cbf9190611509565b90915550506001600160a01b0382166000818152603360209081526040808320805486019055518481526000805160206116ca833981519152910160405180910390a35050565b6001600160a01b038216610d665760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016104e8565b6001600160a01b03821660009081526033602052604090205481811015610dda5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016104e8565b6001600160a01b03831660008181526033602090815260408083208686039055603580548790039055518581529192916000805160206116ca833981519152910160405180910390a3505050565b600054610100900460ff16610e4f5760405162461bcd60e51b81526004016104e890611570565b610560828261114f565b600054610100900460ff1661054c5760405162461bcd60e51b81526004016104e890611570565b600054610100900460ff16610ea75760405162461bcd60e51b81526004016104e890611570565b61054c61118f565b600054610100900460ff16610ed65760405162461bcd60e51b81526004016104e890611570565b61054c6111bf565b60c980546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610f386111f2565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610c3a3390565b6001600160a01b038316610fd15760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016104e8565b6001600160a01b0382166110335760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016104e8565b6001600160a01b038316600090815260336020526040902054818110156110ab5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016104e8565b6001600160a01b0380851660008181526033602052604080822086860390559286168082529083902080548601905591516000805160206116ca833981519152906110f99086815260200190565b60405180910390a3610b3f565b60975460ff1661054c5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016104e8565b600054610100900460ff166111765760405162461bcd60e51b81526004016104e890611570565b60366111828382611609565b50603761073b8282611609565b600054610100900460ff166111b65760405162461bcd60e51b81526004016104e890611570565b61054c33610ede565b600054610100900460ff166111e65760405162461bcd60e51b81526004016104e890611570565b6097805460ff19169055565b60975460ff161561054c5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016104e8565b600060208083528351808285015260005b8181101561126557858101830151858201604001528201611249565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461129d57600080fd5b919050565b600080604083850312156112b557600080fd5b6112be83611286565b946020939093013593505050565b6000602082840312156112de57600080fd5b5035919050565b6000602082840312156112f757600080fd5b61130082611286565b9392505050565b60008060006060848603121561131c57600080fd5b61132584611286565b925061133360208501611286565b9150604084013590509250925092565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261136a57600080fd5b813567ffffffffffffffff8082111561138557611385611343565b604051601f8301601f19908116603f011681019082821181831017156113ad576113ad611343565b816040528381528660208588010111156113c657600080fd5b836020870160208301376000602085830101528094505050505092915050565b600080604083850312156113f957600080fd5b823567ffffffffffffffff8082111561141157600080fd5b61141d86838701611359565b9350602085013591508082111561143357600080fd5b5061144085828601611359565b9150509250929050565b6000806040838503121561145d57600080fd5b61146683611286565b91506020830135801515811461147b57600080fd5b809150509250929050565b6000806040838503121561149957600080fd5b6114a283611286565b91506114b060208401611286565b90509250929050565b600181811c908216806114cd57607f821691505b6020821081036114ed57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561047c5761047c6114f3565b6000816000190483118215151615611536576115366114f3565b500290565b60008261155857634e487b7160e01b600052601260045260246000fd5b500490565b8181038181111561047c5761047c6114f3565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b601f82111561073b57600081815260208120601f850160051c810160208610156115e25750805b601f850160051c820191505b81811015611601578281556001016115ee565b505050505050565b815167ffffffffffffffff81111561162357611623611343565b6116378161163184546114b9565b846115bb565b602080601f83116001811461166c57600084156116545750858301515b600019600386901b1c1916600185901b178555611601565b600085815260208120601f198616915b8281101561169b5788860151825594840194600190910190840161167c565b50858210156116b95787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa2646970667358221220bb474edeace3d54aa0e8c7feb1dda62981ea27e310185b96dbd11f4bfe69141f64736f6c63430008100033";

type DGETokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DGETokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DGEToken__factory extends ContractFactory {
  constructor(...args: DGETokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DGEToken> {
    return super.deploy(overrides || {}) as Promise<DGEToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DGEToken {
    return super.attach(address) as DGEToken;
  }
  override connect(signer: Signer): DGEToken__factory {
    return super.connect(signer) as DGEToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DGETokenInterface {
    return new utils.Interface(_abi) as DGETokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DGEToken {
    return new Contract(address, _abi, signerOrProvider) as DGEToken;
  }
}

/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  DDXToken,
  DDXTokenInterface,
} from "../../../contracts/DDX.sol/DDXToken";

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
    name: "cap",
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
        name: "",
        type: "address",
      },
    ],
    name: "includeAddress",
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
        internalType: "uint256",
        name: "cap",
        type: "uint256",
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
    name: "swapFee",
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
    name: "updateIncludeAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_swapFee",
        type: "uint256",
      },
    ],
    name: "updateSwapFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061189f806100206000396000f3fe608060405234801561001057600080fd5b50600436106101795760003560e01c806370a08231116100d9578063a457c2d711610087578063a457c2d7146102f9578063a9059cbb1461030c578063aaf5eb681461031f578063b119490e14610328578063bf16f65a1461033b578063dd62ed3e1461034e578063f2fde38b1461036157600080fd5b806370a0823114610266578063715018a61461028f57806379cc6790146102975780638456cb59146102aa5780638da5cb5b146102b257806393995d4b146102cd57806395d89b41146102f157600080fd5b8063395093511161013657806339509351146101fb5780633f4ba83a1461020e5780633fa4368d1461021857806340c10f191461022b57806342966c681461023e57806354cf2aeb146102515780635c975abb1461025b57600080fd5b806306fdde031461017e578063095ea7b31461019c57806318160ddd146101bf57806323b872dd146101d1578063313ce567146101e4578063355274ea146101f3575b600080fd5b610186610374565b6040516101939190611345565b60405180910390f35b6101af6101aa3660046113af565b610406565b6040519015158152602001610193565b6035545b604051908152602001610193565b6101af6101df3660046113d9565b610420565b60405160128152602001610193565b6065546101c3565b6101af6102093660046113af565b6104cc565b6102166104ee565b005b610216610226366004611415565b610500565b6102166102393660046113af565b610599565b61021661024c366004611451565b6105af565b6101c361012e5481565b60ca5460ff166101af565b6101c361027436600461146a565b6001600160a01b031660009081526033602052604090205490565b6102166105bc565b6102166102a53660046113af565b6105ce565b6102166105e3565b60fc546040516001600160a01b039091168152602001610193565b6101af6102db36600461146a565b61012f6020526000908152604090205460ff1681565b6101866105f3565b6101af6103073660046113af565b610602565b6101af61031a3660046113af565b610688565b6101c361271081565b61021661033636600461152f565b61070f565b610216610349366004611451565b6108ef565b6101c361035c36600461159c565b61095f565b61021661036f36600461146a565b61098a565b606060368054610383906115cf565b80601f01602080910402602001604051908101604052809291908181526020018280546103af906115cf565b80156103fc5780601f106103d1576101008083540402835291602001916103fc565b820191906000526020600020905b8154815290600101906020018083116103df57829003601f168201915b5050505050905090565b600033610414818585610a00565b60019150505b92915050565b600061012e5460000361044e5760405162461bcd60e51b815260040161044590611609565b60405180910390fd5b33600090815261012f6020526040902054829060ff1615156001036104965761271061012e548461047f9190611656565b6104899190611675565b6104939084611697565b90505b336104a2868286610b25565b6104b5866104b08487611697565b610b99565b6104c0868684610cb8565b50600195945050505050565b6000336104148185856104df838361095f565b6104e991906116aa565b610a00565b6104f6610e51565b6104fe610eab565b565b610508610e51565b6001600160a01b03821661056d5760405162461bcd60e51b815260206004820152602660248201527f546f6b656e3a20416464726573732063616e206e6f74206265207a65726f206160448201526564647265737360d01b6064820152608401610445565b6001600160a01b0391909116600090815261012f60205260409020805460ff1916911515919091179055565b6105a1610e51565b6105ab8282610efd565b5050565b6105b93382610b99565b50565b6105c4610e51565b6104fe6000610f3c565b6105d9823383610b25565b6105ab8282610b99565b6105eb610e51565b6104fe610f8e565b606060378054610383906115cf565b60003381610610828661095f565b9050838110156106705760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610445565b61067d8286868403610a00565b506001949350505050565b600061012e546000036106ad5760405162461bcd60e51b815260040161044590611609565b33600090815261012f6020526040902054829060ff1615156001036106f55761271061012e54846106de9190611656565b6106e89190611675565b6106f29084611697565b90505b33610704816104b08487611697565b61067d818684610cb8565b600054610100900460ff161580801561072f5750600054600160ff909116105b806107495750303b158015610749575060005460ff166001145b6107ac5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610445565b6000805460ff1916600117905580156107cf576000805461ff0019166101001790555b6107d98484610fcb565b6107e282610ffc565b6107ea61102c565b6107f2611053565b6107fa611082565b6107d061012e5561012f6020527ff2876321ee307d41f6ee35bbf1e6d7039a73cbbb2d89dbc57b6b65250ae365438054600160ff1991821681179092557fe512ff2c4ce0108eca67b12d262f48233eba3f567e2a89606eeadcddc5057dd38054821683179055732d03c57c96ed8111545356c2d4288d1125c6e6d36000527ffa82bd6bf81c20ae4c495b90a9abfa2e0b79e4ff01be442ee51e5eb838bdcfea8054909116909117905580156108e9576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50505050565b6108f7610e51565b61012c8111156109595760405162461bcd60e51b815260206004820152602760248201527f546f6b656e3a2053776170204665652063616e206e6f74206c6172676572207460448201526668616e2033302560c81b6064820152608401610445565b61012e55565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b610992610e51565b6001600160a01b0381166109f75760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610445565b6105b981610f3c565b6001600160a01b038316610a625760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610445565b6001600160a01b038216610ac35760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610445565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b6000610b31848461095f565b905060001981146108e95781811015610b8c5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610445565b6108e98484848403610a00565b6001600160a01b038216610bf95760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610445565b6001600160a01b03821660009081526033602052604090205481811015610c6d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610445565b6001600160a01b038316600081815260336020908152604080832086860390556035805487900390555185815291929160008051602061184a8339815191529101610b18565b505050565b6001600160a01b038316610d1c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610445565b6001600160a01b038216610d7e5760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610445565b6001600160a01b03831660009081526033602052604090205481811015610df65760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610445565b6001600160a01b03808516600081815260336020526040808220868603905592861680825290839020805486019055915160008051602061184a83398151915290610e449086815260200190565b60405180910390a36108e9565b60fc546001600160a01b031633146104fe5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610445565b610eb36110b1565b60ca805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b60655481610f0a60355490565b610f1491906116aa565b1115610f325760405162461bcd60e51b8152600401610445906116bd565b6105ab82826110fa565b60fc80546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610f96611139565b60ca805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610ee03390565b600054610100900460ff16610ff25760405162461bcd60e51b8152600401610445906116f0565b6105ab828261117f565b600054610100900460ff166110235760405162461bcd60e51b8152600401610445906116f0565b6105b9816111bf565b600054610100900460ff166104fe5760405162461bcd60e51b8152600401610445906116f0565b600054610100900460ff1661107a5760405162461bcd60e51b8152600401610445906116f0565b6104fe611233565b600054610100900460ff166110a95760405162461bcd60e51b8152600401610445906116f0565b6104fe611263565b60ca5460ff166104fe5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610445565b6065548161110760355490565b61111191906116aa565b111561112f5760405162461bcd60e51b8152600401610445906116bd565b6105ab8282611296565b60ca5460ff16156104fe5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610445565b600054610100900460ff166111a65760405162461bcd60e51b8152600401610445906116f0565b60366111b28382611789565b506037610cb38282611789565b600054610100900460ff166111e65760405162461bcd60e51b8152600401610445906116f0565b6000811161122e5760405162461bcd60e51b8152602060048201526015602482015274045524332304361707065643a20636170206973203605c1b6044820152606401610445565b606555565b600054610100900460ff1661125a5760405162461bcd60e51b8152600401610445906116f0565b6104fe33610f3c565b600054610100900460ff1661128a5760405162461bcd60e51b8152600401610445906116f0565b60ca805460ff19169055565b6001600160a01b0382166112ec5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610445565b80603560008282546112fe91906116aa565b90915550506001600160a01b03821660008181526033602090815260408083208054860190555184815260008051602061184a833981519152910160405180910390a35050565b600060208083528351808285015260005b8181101561137257858101830151858201604001528201611356565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b03811681146113aa57600080fd5b919050565b600080604083850312156113c257600080fd5b6113cb83611393565b946020939093013593505050565b6000806000606084860312156113ee57600080fd5b6113f784611393565b925061140560208501611393565b9150604084013590509250925092565b6000806040838503121561142857600080fd5b61143183611393565b91506020830135801515811461144657600080fd5b809150509250929050565b60006020828403121561146357600080fd5b5035919050565b60006020828403121561147c57600080fd5b61148582611393565b9392505050565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126114b357600080fd5b813567ffffffffffffffff808211156114ce576114ce61148c565b604051601f8301601f19908116603f011681019082821181831017156114f6576114f661148c565b8160405283815286602085880101111561150f57600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060006060848603121561154457600080fd5b833567ffffffffffffffff8082111561155c57600080fd5b611568878388016114a2565b9450602086013591508082111561157e57600080fd5b5061158b868287016114a2565b925050604084013590509250925092565b600080604083850312156115af57600080fd5b6115b883611393565b91506115c660208401611393565b90509250929050565b600181811c908216806115e357607f821691505b60208210810361160357634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252601f908201527f546f6b656e3a2073776170206665652063616e206e6f74206265207a65726f00604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561167057611670611640565b500290565b60008261169257634e487b7160e01b600052601260045260246000fd5b500490565b8181038181111561041a5761041a611640565b8082018082111561041a5761041a611640565b602080825260199082015278115490cc8c10d85c1c19590e8818d85c08195e18d959591959603a1b604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b601f821115610cb357600081815260208120601f850160051c810160208610156117625750805b601f850160051c820191505b818110156117815782815560010161176e565b505050505050565b815167ffffffffffffffff8111156117a3576117a361148c565b6117b7816117b184546115cf565b8461173b565b602080601f8311600181146117ec57600084156117d45750858301515b600019600386901b1c1916600185901b178555611781565b600085815260208120601f198616915b8281101561181b578886015182559484019460019091019084016117fc565b50858210156118395787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa26469706673582212208e4f12b36f0876c004ad39591e090782c9ad95235a318536f171b82c054453c164736f6c63430008100033";

type DDXTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DDXTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DDXToken__factory extends ContractFactory {
  constructor(...args: DDXTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DDXToken> {
    return super.deploy(overrides || {}) as Promise<DDXToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DDXToken {
    return super.attach(address) as DDXToken;
  }
  override connect(signer: Signer): DDXToken__factory {
    return super.connect(signer) as DDXToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DDXTokenInterface {
    return new utils.Interface(_abi) as DDXTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DDXToken {
    return new Contract(address, _abi, signerOrProvider) as DDXToken;
  }
}
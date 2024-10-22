/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { DGWSwap, DGWSwapInterface } from "../../contracts/DGWSwap";

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
    name: "DWStaking",
    outputs: [
      {
        internalType: "contract IDChainStaking",
        name: "",
        type: "address",
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
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "contract IDChainStaking",
        name: "_dwStaking",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "contract IERC20WithBurn",
        name: "_rewardToken",
        type: "address",
      },
      {
        internalType: "contract IERC20WithBurn",
        name: "_usdt",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [],
    name: "rewardToken",
    outputs: [
      {
        internalType: "contract IERC20WithBurn",
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
        internalType: "contract IDChainStaking",
        name: "_DWStaking",
        type: "address",
      },
    ],
    name: "setDWStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20WithBurn",
        name: "_rewardToken",
        type: "address",
      },
    ],
    name: "setRewardToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20WithBurn",
        name: "_usdt",
        type: "address",
      },
    ],
    name: "setUSDT",
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
  {
    inputs: [
      {
        internalType: "address[2]",
        name: "_path",
        type: "address[2]",
      },
      {
        internalType: "enum DGWSwap.SwapType",
        name: "_type",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "swap",
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
  {
    inputs: [],
    name: "usdt",
    outputs: [
      {
        internalType: "contract IERC20WithBurn",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061199b806100206000396000f3fe608060405234801561001057600080fd5b50600436106101635760003560e01c806362d6306f116100ce578063a217fddf11610087578063a217fddf146102f2578063b6db75a0146102fa578063d547741f14610302578063e58378bb14610315578063e63ab1e91461032a578063f0f442601461033f578063f7c618c11461035257600080fd5b806362d6306f1461028a5780636a736cea1461029d5780638456cb59146102b15780638aee8127146102b95780638dbe2d6c146102cc57806391d14854146102df57600080fd5b80632f48ab7d116101205780632f48ab7d1461021157806336568abe1461023d5780633f4ba83a1461025057806350c1b923146102585780635c975abb1461026b57806361d027b31461027657600080fd5b806301ffc9a714610168578063022f2354146101905780631459457a146101b357806315f40fb1146101c8578063248a9ca3146101db5780632f2ff15d146101fe575b600080fd5b61017b610176366004611668565b610366565b60405190151581526020015b60405180910390f35b6101a560008051602061194683398151915281565b604051908152602001610187565b6101c66101c13660046114eb565b61039d565b005b6101c66101d63660046114cf565b610579565b6101a56101e9366004611621565b60009081526065602052604090206001015490565b6101c661020c366004611639565b6105c0565b6101c554610225906001600160a01b031681565b6040516001600160a01b039091168152602001610187565b6101c661024b366004611639565b6105ea565b6101c6610668565b6101c66102663660046114cf565b61068b565b60975460ff1661017b565b6101c654610225906001600160a01b031681565b6101c66102983660046114cf565b6106d2565b6101c354610225906001600160a01b031681565b6101c66107fb565b6101c66102c73660046114cf565b61081b565b6101c66102da36600461155b565b610862565b61017b6102ed366004611639565b610ba1565b6101a5600081565b61017b610bcc565b6101c6610310366004611639565b610beb565b6101a560008051602061190683398151915281565b6101a560008051602061192683398151915281565b6101c661034d3660046114cf565b610c10565b6101c454610225906001600160a01b031681565b60006001600160e01b03198216637965db0b60e01b148061039757506301ffc9a760e01b6001600160e01b03198316145b92915050565b600054610100900460ff16158080156103bd5750600054600160ff909116105b806103d75750303b1580156103d7575060005460ff166001145b61043f5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610462576000805461ff0019166101001790555b61046b866106d2565b6001600160a01b0383166104915760405162461bcd60e51b815260040161043690611766565b6001600160a01b0384166104b75760405162461bcd60e51b815260040161043690611766565b6001600160a01b0385166104dd5760405162461bcd60e51b815260040161043690611766565b6101c680546001600160a01b038087166001600160a01b0319928316179092556101c480548684169083161790556101c580548584169083161790556101c38054928816929091169190911790558015610571576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b505050505050565b610581610bcc565b61059d5760405162461bcd60e51b8152600401610436906117ff565b6101c380546001600160a01b0319166001600160a01b0392909216919091179055565b6000828152606560205260409020600101546105db81610c57565b6105e58383610c61565b505050565b6001600160a01b038116331461065a5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610436565b6106648282610ce7565b5050565b60008051602061194683398151915261068081610c57565b610688610d4e565b50565b610693610bcc565b6106af5760405162461bcd60e51b8152600401610436906117ff565b6101c580546001600160a01b0319166001600160a01b0392909216919091179055565b600054610100900460ff166106f95760405162461bcd60e51b8152600401610436906117b4565b6001600160a01b03811661074f5760405162461bcd60e51b815260206004820181905260248201527f4f776e65722063616e6e6f7420626520746865207a65726f20616464726573736044820152606401610436565b610757610da0565b61075f610dc9565b610767610df8565b61077f60008051602061190683398151915282610e27565b61079760008051602061192683398151915282610e27565b6107bd600080516020611946833981519152600080516020611906833981519152610e31565b6107e3600080516020611926833981519152600080516020611906833981519152610e31565b61068860008051602061190683398151915280610e31565b60008051602061194683398151915261081381610c57565b610688610e7c565b610823610bcc565b61083f5760405162461bcd60e51b8152600401610436906117ff565b6101c480546001600160a01b0319166001600160a01b0392909216919091179055565b61086a610eb9565b6101c454835160009182916001600160a01b03908116911614156108c8576101c5546001600160a01b031685600160200201516001600160a01b0316146108c35760405162461bcd60e51b815260040161043690611782565b61091c565b6101c55485516001600160a01b0390811691161415610163576101c4546001600160a01b031685600160200201516001600160a01b0316146101635760405162461bcd60e51b815260040161043690611782565b600084600181111561093e57634e487b7160e01b600052602160045260246000fd5b1415610a24576101c45485518493506001600160a01b03908116911614156109f2576101c3546101c4546040516320e485d760e11b81526001600160a01b039182166004820152602481018690529116906341c90bae906044015b602060405180830381600087803b1580156109b357600080fd5b505af11580156109c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109eb9190611690565b9050610b53565b6101c35460405163688cd84560e01b8152600481018590526001600160a01b039091169063688cd84590602401610999565b506101c454845183916001600160a01b0391821691161415610ac6576101c35460405163688cd84560e01b8152600481018590526001600160a01b039091169063688cd84590602401602060405180830381600087803b158015610a8757600080fd5b505af1158015610a9b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610abf9190611690565b9150610b53565b6101c3546101c4546040516320e485d760e11b81526001600160a01b039182166004820152602481018690529116906341c90bae90604401602060405180830381600087803b158015610b1857600080fd5b505af1158015610b2c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b509190611690565b91505b610b7f336101c6546001600160a01b0316848860005b60200201516001600160a01b0316929190610eff565b6101c654610b9a906001600160a01b03163383886001610b69565b5050505050565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6000610be660008051602061190683398151915233610ba1565b905090565b600082815260656020526040902060010154610c0681610c57565b6105e58383610ce7565b610c18610bcc565b610c345760405162461bcd60e51b8152600401610436906117ff565b6101c680546001600160a01b0319166001600160a01b0392909216919091179055565b6106888133610f5f565b610c6b8282610ba1565b6106645760008281526065602090815260408083206001600160a01b03851684529091529020805460ff19166001179055610ca33390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610cf18282610ba1565b156106645760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b610d56610fb8565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054610100900460ff16610dc75760405162461bcd60e51b8152600401610436906117b4565b565b600054610100900460ff16610df05760405162461bcd60e51b8152600401610436906117b4565b610dc7611001565b600054610100900460ff16610e1f5760405162461bcd60e51b8152600401610436906117b4565b610dc7611034565b6106648282610c61565b600082815260656020526040808220600101805490849055905190918391839186917fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff9190a4505050565b610e84610eb9565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610d833390565b60975460ff1615610dc75760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610436565b604080516001600160a01b0385811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052610f59908590611062565b50505050565b610f698282610ba1565b61066457610f7681611134565b610f81836020611146565b604051602001610f929291906116c4565b60408051601f198184030181529082905262461bcd60e51b825261043691600401611733565b60975460ff16610dc75760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610436565b600054610100900460ff166110285760405162461bcd60e51b8152600401610436906117b4565b6097805460ff19169055565b600054610100900460ff1661105b5760405162461bcd60e51b8152600401610436906117b4565b600160c955565b60006110b7826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b031661132f9092919063ffffffff16565b8051909150156105e557808060200190518101906110d59190611601565b6105e55760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610436565b60606103976001600160a01b03831660145b60606000611155836002611862565b61116090600261184a565b67ffffffffffffffff81111561118657634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f1916602001820160405280156111b0576020820181803683370190505b509050600360fc1b816000815181106111d957634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061121657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600061123a846002611862565b61124590600161184a565b90505b60018111156112d9576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061128757634e487b7160e01b600052603260045260246000fd5b1a60f81b8282815181106112ab57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c936112d2816118ad565b9050611248565b5083156113285760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610436565b9392505050565b606061133e8484600085611346565b949350505050565b6060824710156113a75760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610436565b6001600160a01b0385163b6113fe5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610436565b600080866001600160a01b0316858760405161141a91906116a8565b60006040518083038185875af1925050503d8060008114611457576040519150601f19603f3d011682016040523d82523d6000602084013e61145c565b606091505b509150915061146c828286611477565b979650505050505050565b60608315611486575081611328565b8251156114965782518084602001fd5b8160405162461bcd60e51b81526004016104369190611733565b80356114bb816118f0565b919050565b8035600281106114bb57600080fd5b6000602082840312156114e0578081fd5b8135611328816118f0565b600080600080600060a08688031215611502578081fd5b853561150d816118f0565b9450602086013561151d816118f0565b9350604086013561152d816118f0565b9250606086013561153d816118f0565b9150608086013561154d816118f0565b809150509295509295909350565b60008060006080848603121561156f578283fd5b84601f85011261157d578283fd5b6040516040810181811067ffffffffffffffff821117156115a0576115a06118da565b8060405250808560408701888111156115b7578687fd5b865b60028110156115e0576115cb836114b0565b845260209384019392909201916001016115b9565b508396506115ed816114c0565b955050505050606084013590509250925092565b600060208284031215611612578081fd5b81518015158114611328578182fd5b600060208284031215611632578081fd5b5035919050565b6000806040838503121561164b578182fd5b82359150602083013561165d816118f0565b809150509250929050565b600060208284031215611679578081fd5b81356001600160e01b031981168114611328578182fd5b6000602082840312156116a1578081fd5b5051919050565b600082516116ba818460208701611881565b9190910192915050565b76020b1b1b2b9b9a1b7b73a3937b61d1030b1b1b7bab73a1604d1b8152600083516116f6816017850160208801611881565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611727816028840160208801611881565b01602801949350505050565b6020815260008251806020840152611752816040850160208701611881565b601f01601f19169190910160400192915050565b6020808252600290820152615a4160f01b604082015260600190565b602080825260189082015277151bdad95b881bdd5d1c1d5d081b9bdd081b585d18da195960421b604082015260600190565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b6020808252602b908201527f4d75737420686176652061646d696e20726f6c6520746f20706572666f726d2060408201526a3a3434b99030b1ba34b7b760a91b606082015260800190565b6000821982111561185d5761185d6118c4565b500190565b600081600019048311821515161561187c5761187c6118c4565b500290565b60005b8381101561189c578181015183820152602001611884565b83811115610f595750506000910152565b6000816118bc576118bc6118c4565b506000190190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461068857600080fdfeb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862ad2e4c2619ea6e0faebc405d89445161c041e30fe03373ea0473da142d57d4514a26469706673582212203d464a21208776da5a0b5868d296d8b545f9ce0c4e357faefeef3bec1195746864736f6c63430008040033";

type DGWSwapConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DGWSwapConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DGWSwap__factory extends ContractFactory {
  constructor(...args: DGWSwapConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<DGWSwap> {
    return super.deploy(overrides || {}) as Promise<DGWSwap>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): DGWSwap {
    return super.attach(address) as DGWSwap;
  }
  override connect(signer: Signer): DGWSwap__factory {
    return super.connect(signer) as DGWSwap__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DGWSwapInterface {
    return new utils.Interface(_abi) as DGWSwapInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DGWSwap {
    return new Contract(address, _abi, signerOrProvider) as DGWSwap;
  }
}

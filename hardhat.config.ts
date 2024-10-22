import path from 'path';
import { HardhatUserConfig } from 'hardhat/types';

import 'dotenv/config';
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';
import 'hardhat-deploy';
import 'hardhat-log-remover';
import 'hardhat-storage-layout';
import 'hardhat-contract-sizer';
import 'hardhat-watcher';
import 'hardhat-docgen';
import 'hardhat-address-exporter';
import 'hardhat-notifier';

import '@nomiclabs/hardhat-solhint';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-network-helpers';
import '@openzeppelin/hardhat-upgrades';
import '@primitivefi/hardhat-dodoc';

import { removeConsoleLog } from 'hardhat-preprocessor';
import { ethers } from 'ethers';

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as string;
const TREASURY_ADDRESS = process.env.TREASURY_ADDRESS || DEPLOYER_PRIVATE_KEY;
const IDO_ADDRESS = process.env.IDO_ADDRESS
const FARMING_ADDRESS = process.env.FARMING_ADDRESS
const LIQUIDITY_ADDRESS = process.env.LIQUIDITY_ADDRESS
const COMMUNITY_ADDRESS = process.env.COMMUNITY_ADDRESS
const TEAM_ADDRESS = process.env.TEAM_ADDRESS
const MARKETING_ADDRESS = process.env.MARKETING_ADDRESS
const FUND_ADDRESS = process.env.FUND_ADDRESS
const FUND_RECEIVER_IDO = process.env.FUND_RECEIVER;

const OWNER_ADDRESS = process.env.OWNER_ADDRESS || DEPLOYER_PRIVATE_KEY;

const accounts = [DEPLOYER_PRIVATE_KEY as string];
const config = {
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: true
  },
  dodoc: {
    runOnCompile: false,
    outputDir: './doc',
    include: ['contracts/core']
  },
  abiExporter: {
    path: './abi',
    clear: true,
    runOnCompile: true,
  },
  solidity: {
    compilers: [
      {
        version: '0.6.12',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: '0.8.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
      {
        version: '0.4.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },
  notifier: {
    playSuccessSound: true,
    playFailureSound: true,
    notifyOnSuccess: true,
    notifyOnFailure: true,
  },
  etherscan: {
    // apiKey: process.env.ARBITRUM_API_KEY || '',
    apiKey: {
      goerli: process.env.ETHERSCAN_KEY || '',
      mainnet: process.env.ETHERSCAN_KEY || '',
      sepolia: process.env.ETHERSCAN_KEY || '',
      arbitrumGoerli: process.env.ARBITRUM_API_KEY || '',
      arbitrumSepolia: process.env.ARBITRUM_API_KEY || '',
      arbitrum: process.env.ARBITRUM_API_KEY || '',
    } as any,
    customChains: [
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io/",
        },
      },
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io/",
        },
      },
    ]
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    excludeContracts: ['contracts/mocks/'],
    gasPrice: 22,
    showMethodSig: true,
    showTimeSpent: true
  },
  mocha: {
    timeout: 600000,
  },
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ['local'],
    },
    hardhat: {
      chainId: 31337,
      live: false,
      saveDeployments: true,
      tags: ['test', 'local'],
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      // Solidity-coverage overrides gasPrice to 1 which is not compatible with EIP1559
      hardfork: process.env.CODE_COVERAGE ? 'berlin' : 'london',
      forking: {
        enabled: process.env.FORKING === 'true',
        url: `https://arb-mainnet.g.alchemy.com/v2/bLJzrZKYmJuIrfBozFuFXFsuXeWF54UN`,
        blockNumber: 266567262,
      },
      allowUnlimitedContractSize: true,
      accounts: {
        count: 30,
      },
      // blockConfirmations: 0,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 1,
      forking: {
        enabled: process.env.FORKING === 'true',
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
        blockNumber: 11829739,
      },
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 3,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 4,
      live: true,
      saveDeployments: true,
      // tags: ['staging'],
      allowUnlimitedContractSize: true,
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 5,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 11155111,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    modeTestnet: {
      url: "https://sepolia.mode.network",
      chainId: 919,
      accounts,
      gasPrice: 4000000000,
      live: true,
      saveDeployments: true,
      tags: ['staging']
    },
    moonbase: {
      url: 'https://rpc.testnet.moonbeam.network',
      accounts,
      chainId: 1287,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    arbitrum: {
      url: 'https://arbitrum.llamarpc.com',
      accounts,
      chainId: 42161,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    arbitrumSepolia: {
      url: 'https://indulgent-small-putty.arbitrum-sepolia.quiknode.pro/7ab4a87931be553808a04f90a2bcc03c6471ece6/',
      accounts,
      chainId: 421614,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    binance: {
      url: 'https://bsc-dataseed.binance.org/',
      accounts,
      chainId: 56,
      live: true,
      saveDeployments: true,
    },
    binancetest: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      accounts,
      chainId: 97,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    matic: {
      url: 'https://rpc-mainnet.maticvigil.com/',
      accounts,
      chainId: 137,
      live: true,
      saveDeployments: true,
    },
    fantom: {
      url: 'https://rpcapi.fantom.network',
      accounts,
      chainId: 250,
      live: true,
      saveDeployments: true,
    },
    fantomtest: {
      url: 'https://rpc.testnet.fantom.network/',
      accounts,
      chainId: 4002,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    avalanche: {
      url: 'https://ava.spacejelly.network/api/ext/bc/C/rpc',
      accounts,
      chainId: 43114,
      live: true,
      saveDeployments: true,
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      accounts,
      chainId: 43113,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com/',
      accounts,
      chainId: 80001,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    huobi: {
      url: 'https://http-mainnet.hecochain.com',
      accounts,
      chainId: 128,
      live: true,
      saveDeployments: true,
    },
    huobitest: {
      url: 'https://http-testnet.hecochain.com',
      accounts,
      chainId: 256,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    okex: {
      url: 'http://okexchain-rpc1.okex.com:26659',
      accounts,
      chainId: 66,
      live: true,
      saveDeployments: true,
    },
    okextest: {
      url: 'http://okexchaintest-rpc1.okex.com:26659',
      accounts,
      chainId: 65,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    xdai: {
      url: 'https://rpc.xdaichain.com',
      accounts,
      chainId: 100,
      live: true,
      saveDeployments: true,
    },
    tomo: {
      url: 'https://rpc.tomochain.com',
      accounts,
      chainId: 88,
      live: true,
      saveDeployments: true,
    },
    tomotest: {
      url: 'https://rpc.testnet.tomochain.com',
      accounts,
      chainId: 89,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    moonbeam: {
      url: 'https://rpc.api.moonbeam.network',
      accounts,
      chainId: 1284,
      live: true,
      saveDeployments: true,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    treasury: {
      42161: TREASURY_ADDRESS,
      421613: TREASURY_ADDRESS,
      421614: TREASURY_ADDRESS,
      97: TREASURY_ADDRESS
    },
    owner: {
      42161: OWNER_ADDRESS,
      421613: OWNER_ADDRESS,
      421614: OWNER_ADDRESS,
      97: OWNER_ADDRESS
    },
    community: {
      42161: COMMUNITY_ADDRESS,
      421613: COMMUNITY_ADDRESS,
      421614: COMMUNITY_ADDRESS,
      97: COMMUNITY_ADDRESS
    },
    team: {
      42161: TEAM_ADDRESS,
      421613: TEAM_ADDRESS,
      421614: TEAM_ADDRESS,
      97: TEAM_ADDRESS
    },
    marketing: {
      42161: MARKETING_ADDRESS,
      421613: MARKETING_ADDRESS,
      421614: MARKETING_ADDRESS,
      97: MARKETING_ADDRESS
    },
    ido: {
      42161: IDO_ADDRESS,
      421613: IDO_ADDRESS,
      421614: IDO_ADDRESS,
      97: IDO_ADDRESS
    },
    farming: {
      42161: FARMING_ADDRESS,
      421613: FARMING_ADDRESS,
      421614: FARMING_ADDRESS,
      97: FARMING_ADDRESS
    },
    liquidity: {
      42161: LIQUIDITY_ADDRESS,
      421613: LIQUIDITY_ADDRESS,
      421614: LIQUIDITY_ADDRESS,
      97: LIQUIDITY_ADDRESS
    },
    fund: {
      42161: FUND_ADDRESS,
      421613: FUND_ADDRESS,
      421614: FUND_ADDRESS,
      97: FUND_ADDRESS,
    },
    fundReceiver: {
      42161: FUND_RECEIVER_IDO,
      421613: FUND_RECEIVER_IDO,
      421614: FUND_RECEIVER_IDO,
      97: FUND_RECEIVER_IDO,
    }
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (bre) =>
        bre.network.name !== 'hardhat' && bre.network.name !== 'localhost',
    ),
  },
  watcher: {
    compile: {
      tasks: ['compile'],
      files: ['./contracts'],
      verbose: true,
    },
    test: {
      tasks: ['test'],
      files: ['./test/Lender.spec.ts'],
      verbose: true,
    },
  },
  paths: {
    artifacts: 'artifacts',
    cache: 'cache',
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports',
    sources: 'contracts',
    tests: 'test',
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: true,
    runOnCompile: true,
    // strict: true,
  },
  addressExporter: {
    outDir: path.resolve('./addresses'),
    runPrettier: false,
  },
};

export default config;

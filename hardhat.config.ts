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

// {
//   "plugins": ["prettier"],
//     "rules": {
//     "prettier/prettier": "error"
//   }
// }

// import "hardhat-tracer";
import '@nomiclabs/hardhat-solhint';
import '@nomicfoundation/hardhat-chai-matchers';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-network-helpers';
import '@openzeppelin/hardhat-upgrades';
import '@primitivefi/hardhat-dodoc';

import { removeConsoleLog } from 'hardhat-preprocessor';

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY as string;
const PROTOCOL_ADMIN_MULTISIG = process.env.PROTOCOL_ADMIN_ADDRESS || DEPLOYER_PRIVATE_KEY;

const accounts = [DEPLOYER_PRIVATE_KEY as string];

const config: HardhatUserConfig & { sourcify: {} } = {
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
    // apiKey: process.env.ARBITRUM_API_KEY || ''
    apiKey: {
      goerli: process.env.ETHERSCAN_KEY || '',
      mainnet: process.env.ETHERSCAN_KEY || '',
      sepolia: process.env.ETHERSCAN_KEY || '',
      arbitrumGoerli: process.env.ARBITRUM_API_KEY || '',
      arbitrum: process.env.ARBITRUM_API_KEY || '',
    } as any,
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
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_KEY}`,
        blockNumber: 18454285,
      },
      allowUnlimitedContractSize: true,
      accounts: {
        count: 30,
      },
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
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts,
      chainId: 42,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
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
      url: 'https://kovan3.arbitrum.io/rpc',
      accounts,
      chainId: 79377087078960,
      live: true,
      saveDeployments: true,
      tags: ['staging'],
    },
    arbitrumGoerli: {
      url: 'https://arbitrum-goerli.publicnode.com',
      accounts,
      chainId: 421613,
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
    protocolAdmin: {
      421613: PROTOCOL_ADMIN_MULTISIG,
      1: PROTOCOL_ADMIN_MULTISIG
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

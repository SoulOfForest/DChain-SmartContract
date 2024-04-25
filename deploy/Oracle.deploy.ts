import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const deployOracle: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const { address: usdcAddress } = await deploy('OracleSimple', {
        from: deployer,
        args: [
            // '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
            // '0xea8bA7683AD0472FC71A2B8c79dF95a54406f2A4',
            // '0xb8206796F7c9789b56162fdF67f0a954e477Df23',
            '0x02a84c1b3BBD7401a5f7fa98a384EBC70bB5749E',
            '0x5c2262CE201d4134ac3EcE61eC71AF648ec8822D',
            '0xd6825ab263950622Cf497367e32746403c00fc8E'
        ],
        log: true,
        deterministicDeployment: false
    });
};

deployOracle.tags = ['ORACLE'];
deployOracle.skip = () => Promise.resolve(true);

export default deployOracle;

import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDDXToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const { address: usdcAddress } = await deploy('DGEToken', {
        from: deployer,
        args: [
            'DGEToken',
            'DGE',
        ],
        log: true,
        deterministicDeployment: false,
        proxy: {
            proxyContract: 'OpenZeppelinTransparentProxy',
            upgradeIndex: 0,
            methodName: 'initialize',
        },
    });
};

deployDDXToken.tags = ['DDX_TOKEN'];
deployDDXToken.skip = () => Promise.resolve(true);

export default deployDDXToken;

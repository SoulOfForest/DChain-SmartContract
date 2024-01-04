import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';

const deployUSDC: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const { address: usdcAddress } = await deploy('FiatTokenV2', {
        from: deployer,
        args: [
            'USD Coin',
            'USDC',
            'USDC',
            6,
            deployer,
            deployer,
            deployer,
            deployer,
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

deployUSDC.tags = ['USDC'];
// deployUSDC.skip = () => Promise.resolve(true);

export default deployUSDC;

import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';

const deployUSDC: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const { address: usdcAddress } = await deploy('TetherToken', {
        from: deployer,
        args: [
            parseUnits("1000000000000000000000000000", 30),
            'Tether USD',
            'USDT',
            6
        ],
        log: true,
        deterministicDeployment: false,
        // proxy: {
        //   proxyContract: 'OpenZeppelinTransparentProxy',
        //   upgradeIndex: 0,
        //   methodName: 'initialize',
        // },
    });
};

deployUSDC.tags = ['USDT'];
deployUSDC.skip = () => Promise.resolve(true);

export default deployUSDC;

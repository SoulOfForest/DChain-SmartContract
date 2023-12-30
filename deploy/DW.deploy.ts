import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDWToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const { address: usdcAddress } = await deploy('DWToken', {
        from: deployer,
        args: [
            'DWToken',
            'DWT',
            expandTo18Decimals(42000000, 18),
            "0x40119D8CFFFf7B79B3034460786dE09f57786B0A",
            "0xBBd707815a7F7eb6897C7686274AFabd7B579Ff6"
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

deployDWToken.tags = ['DW_TOKEN'];

export default deployDWToken;

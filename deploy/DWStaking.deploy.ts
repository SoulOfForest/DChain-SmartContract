import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDWStaking: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, farming, owner, fund } = await getNamedAccounts();

    const dwTokenAddress = process.env.DW_ADDRESS;
    const ddxTokenAddress = process.env.DDX_ADDRESS;

    const { address: dwStakingAddress } = await deploy('DGWStaking', {
        from: deployer,
        // args: [
        //     owner,
        //     farming,
        //     fund,
        //     dwTokenAddress,
        //     ddxTokenAddress
        // ],
        log: true,
        deterministicDeployment: false,
        // proxy: {
        //     proxyContract: 'OpenZeppelinTransparentProxy',
        //     upgradeIndex: 0,
        //     methodName: 'initialize',
        // },
    });
};

deployDWStaking.tags = ['DW_STAKING'];

export default deployDWStaking;

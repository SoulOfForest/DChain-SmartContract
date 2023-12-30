import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDWStaking: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const dwTokenAddress = (
        await deployments.get('DWToken')
    ).address;

    const { address: dwStakingAddress } = await deploy('DWStaking', {
        from: deployer,
        args: [
            deployer,
            dwTokenAddress,
            dwTokenAddress
        ],
        log: true,
        deterministicDeployment: false,
    });
};

deployDWStaking.tags = ['DW_STAKING'];
deployDWStaking.dependencies = ['DW_TOKEN'];

export default deployDWStaking;

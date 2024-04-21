import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDDXStaking: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, farming, owner } = await getNamedAccounts();

    const ddxTokenAddress = process.env.DDX_ADDRESS;

    const dwStakingAddress = (
        await deployments.get('DGWStaking_Proxy')
    ).address;

    const { address: ddxStakingAddress } = await deploy('DGEStaking', {
        from: deployer,
        args: [
            owner,
            ethers.constants.AddressZero,
            farming,
            ddxTokenAddress,
            dwStakingAddress
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

deployDDXStaking.tags = ['DDX_STAKING'];
deployDDXStaking.dependencies = ['DW_STAKING'];

export default deployDDXStaking;

import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDDXStaking: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, treasury, owner } = await getNamedAccounts();

    const ddxTokenAddress = (
        await deployments.get('DDXToken_Proxy')
    ).address;


    const { address: dwStakingAddress } = await deploy('DDXStaking', {
        from: deployer,
        args: [
            owner,
            ethers.constants.AddressZero,
            treasury,
            ddxTokenAddress
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
deployDDXStaking.dependencies = ['DDX_TOKEN'];

export default deployDDXStaking;

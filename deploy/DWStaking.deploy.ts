import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDWStaking: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, treasury, owner } = await getNamedAccounts();

    const dwTokenAddress = (
        await deployments.get('DWToken_Proxy')
    ).address;

    const ddxTokenAddress = (
        await deployments.get('DDXToken_Proxy')
    ).address;


    const { address: dwStakingAddress } = await deploy('DWStaking', {
        from: deployer,
        args: [
            owner,
            treasury,
            dwTokenAddress,
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

deployDWStaking.tags = ['DW_STAKING'];
deployDWStaking.dependencies = ['DW_TOKEN', 'DDX_TOKEN'];

export default deployDWStaking;

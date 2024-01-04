import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const MONTH_IN_SECONDS = 30 * 24 * 60 * 60;
const ddxStartVestingTime = Math.floor(new Date().getTime() / 1000) + 12 * MONTH_IN_SECONDS; // 1 year after start selling IDO

const deployDDXVault: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, treasury, owner } = await getNamedAccounts();

    const ddxTokenAddress = (
        await deployments.get('DDXToken_Proxy')
    ).address;

    const dwStakingAddress = (
        await deployments.get('DWStaking_Proxy')
    ).address;

    const ddxStakingAddress = (
        await deployments.get('DDXStaking_Proxy')
    ).address;

    const { address: dwVaultAddress } = await deploy('DDXVault', {
        from: deployer,
        args: [
            owner,
            ddxTokenAddress,
            treasury,
            dwStakingAddress,
            ddxStakingAddress,
            ddxStartVestingTime
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

deployDDXVault.tags = ['DDX_VAULT'];
deployDDXVault.dependencies = ['DDX_TOKEN', 'DW_STAKING', 'DDX_STAKING'];

export default deployDDXVault;

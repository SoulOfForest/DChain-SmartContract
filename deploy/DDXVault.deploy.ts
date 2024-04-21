import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const MONTH_IN_SECONDS = 30 * 24 * 60 * 60;
const ddxStartVestingTime = Math.floor(new Date().getTime() / 1000) + 18 * MONTH_IN_SECONDS; // 1 year after start selling IDO

const deployDDXVault: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, farming, owner } = await getNamedAccounts();

    const ddxTokenAddress = process.env.DDX_ADDRESS;;

    const dwStakingAddress = (
        await deployments.get('DGWStaking_Proxy')
    ).address;

    const ddxStakingAddress = (
        await deployments.get('DGEStaking_Proxy')
    ).address;

    const { address: dwVaultAddress } = await deploy('DGEVault', {
        from: deployer,
        args: [
            owner,
            ddxTokenAddress,
            farming,
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
deployDDXVault.dependencies = ['DW_STAKING', 'DDX_STAKING'];

export default deployDDXVault;

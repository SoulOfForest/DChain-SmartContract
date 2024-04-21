import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const MONTH_IN_SECONDS = 30 * 24 * 60 * 60;

const totalRaiseAmount = expandTo18Decimals(1000000); // 1 millions
const tgePercentage = 1000; // 10%
const lockBeforeVesting = 6 * MONTH_IN_SECONDS; // 6 months

const openTime = 1711443600;
const sellDuration = 5 * 24 * 60 * 60;

const deployDWVault: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, ido, owner, fundReceiver } = await getNamedAccounts();

    const dwStakingAddress = (
        await deployments.get('DGWStaking_Proxy')
    ).address;

    const dwTokenAddress = process.env.DW_ADDRESS;

    const { address: dwVaultAddress } = await deploy('DGWVault', {
        from: deployer,
        // args: [
        //     owner,
        //     dwTokenAddress,
        //     ido, // wallet for transferring IDO tokens
        //     fundReceiver, // wallet for receiving raising funds
        //     dwStakingAddress,
        //     tgePercentage,
        //     totalRaiseAmount, // raise total 20 millions
        //     lockBeforeVesting,
        //     openTime,
        //     sellDuration
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

deployDWVault.tags = ['DW_VAULT'];
deployDWVault.dependencies = ['DW_STAKING'];

export default deployDWVault;

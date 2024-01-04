import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const MONTH_IN_SECONDS = 30 * 24 * 60 * 60;

const totalRaiseAmount = expandTo18Decimals(20000000); // 20 millions
const tgePercentage = 2000; // 20%
const lockBeforeVesting = 9 * MONTH_IN_SECONDS; // 9 months

const openTime = Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60; // open in next 7 days
const ddxStartVestingTime = Math.floor(new Date().getTime() / 1000) + 12 * MONTH_IN_SECONDS; // 1 year after start selling IDO
const sellDuration = MONTH_IN_SECONDS;

const deployDWVault: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, treasury, owner } = await getNamedAccounts();

    const dwStakingAddress = (
        await deployments.get('DWStaking_Proxy')
    ).address;

    const dwTokenAddress = (
        await deployments.get('DWToken_Proxy')
    ).address;


    const { address: dwVaultAddress } = await deploy('DWVault', {
        from: deployer,
        args: [
            owner,
            dwTokenAddress,
            treasury,
            owner,
            dwStakingAddress,
            tgePercentage, // 20%
            totalRaiseAmount, // raise total 20 millions
            lockBeforeVesting,
            openTime,
            sellDuration
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

deployDWVault.tags = ['DW_VAULT'];
deployDWVault.dependencies = ['DW_STAKING', 'DW_TOKEN'];

export default deployDWVault;

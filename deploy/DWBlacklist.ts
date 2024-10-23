import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDWBlacklist: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, fund, community, team, marketing, ido, farming, liquidity } = await getNamedAccounts();

    const { address: dgwBlacklist } = await deploy('DGWBlacklist', {
        from: deployer,
        args: [
            // "0x0728bebA33844A83675E402639CfdDDB099E6FC5",
            // "0xAAF2B53BFAAA3039080747C149f707ab5a68222d"
        ],
        log: true,
        deterministicDeployment: false,
        // proxy: {
        //     proxyContract: 'OpenZeppelinTransparentProxy',
        //     upgradeIndex: 0,
        //     methodName: 'initialize',
        // },
    });
};

deployDWBlacklist.tags = ['DW_BLACKLIST'];

export default deployDWBlacklist;

import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDGWSwap: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, owner, farming } = await getNamedAccounts();

    const dwTokenAddress = process.env.DW_ADDRESS;

    const { address: usdcAddress } = await deploy('DGWSwap', {
        from: deployer,
        args: [
            // owner,
            // "0xa41bCaC3a3B8674c9Bbc02Df9Cd8B871d9905aFB",
            // farming,
            // dwTokenAddress,
            // "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
        ],
        log: true,
        deterministicDeployment: false,
        // proxy: {
        //     proxyContract: 'OpenZeppelinTransparentProxy',
        //     upgradeIndex: 0,
        //     methodName: 'initialize'
        // },
    });
};

deployDGWSwap.tags = ['DGW_SWAP'];
// deployDGWPayment.skip = () => Promise.resolve(true);

export default deployDGWSwap;

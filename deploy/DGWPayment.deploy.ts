import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDGWPayment: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, owner } = await getNamedAccounts();

    const dwTokenAddress = process.env.DW_ADDRESS;

    const { address: usdcAddress } = await deploy('DGWPayment', {
        from: deployer,
        args: [
            // owner,
            // dwTokenAddress
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

deployDGWPayment.tags = ['DGW_PAYMENT'];
// deployDGWPayment.skip = () => Promise.resolve(true);

export default deployDGWPayment;

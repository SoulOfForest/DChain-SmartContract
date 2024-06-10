import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDGWSwap: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, owner, farming } = await getNamedAccounts();

    const dwTokenAddress = process.env.DW_ADDRESS;

    const { address: usdcAddress } = await deploy('MockDGWSwap', {
        from: deployer,
        args: [
            // owner,
            // "0xa41bCaC3a3B8674c9Bbc02Df9Cd8B871d9905aFB",
            // dwTokenAddress,
            // "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"
            // "0xd6F8595B0a1808dA9b529Da525F1101716618D1A",
            // "0xd817dc637D7c7885c890827572467DEcf124bCec",
            // "0x5d20cb3A06266eed62e518eBD58aC74b0b0f2d29",
            // "0xea8bA7683AD0472FC71A2B8c79dF95a54406f2A4",
            // "0xF197c18A9A6320F9A1cAdbC02B2a33Dd6F02dfD0"
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

deployDGWSwap.tags = ['MOCK_DGW_SWAP'];
// deployDGWPayment.skip = () => Promise.resolve(true);

export default deployDGWSwap;

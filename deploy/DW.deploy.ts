import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { expandTo18Decimals } from '../utils/bignumber';

const deployDWToken: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;
    const { deployer, fund, community, team, marketing, ido, farming, liquidity } = await getNamedAccounts();

    const { address: dgwTokenAddress } = await deploy('DGWToken', {
        from: deployer,
        args: [
            'DGWToken',
            'DGW',
            "0x8cb0300Af2A801DC9992225D45399ac56888cBcd", // UNCX
            ido,
            farming,
            liquidity,
            marketing,
            community
        ],
        log: true,
        deterministicDeployment: false
    });
};

deployDWToken.tags = ['DW_TOKEN'];
deployDWToken.skip = () => Promise.resolve(true);

export default deployDWToken;

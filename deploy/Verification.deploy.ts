import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import {
    verifyEtherscanContractByName,
    verifyEtherscanProxyContract,
} from '../helpers/etherscan-verification';
import { setDRE } from '../helpers/misc-utils';

const contractVerification: DeployFunction = async (
    hre: HardhatRuntimeEnvironment,
) => {
    const { deployments, ethers, getNamedAccounts } = hre;
    const { deployer, protocolAdmin } = await getNamedAccounts();

    setDRE(hre);

    const usdcAddress = process.env.USDC_ADDRESS || '';

    const DEFAULT_PROXY_ADMIN = (await deployments.get('DefaultProxyAdmin')).address;

    const DW_TOKEN_PROXY = (await deployments.get('DWToken_Proxy')).address;
    const DW_TOKEN_IMPLEMENTATION = (await deployments.get('DWToken_Implementation'))
        .address;

    const DW_STAKING = (await deployments.get('DWStaking'))
        .address;

    await verifyEtherscanContractByName('DWStaking', 'contracts/DWStaking.sol:DWStaking');

    const DWStaking = await ethers.getContractFactory('DWStaking');
    const dwStaking = DWStaking.attach(DW_STAKING);

    await dwStaking.setOfferedCurrency(usdcAddress, 1, 0);
    await dwStaking.setOfferedCurrency(DW_TOKEN_PROXY, "20000000000000", 0);

    await verifyEtherscanContractByName('DWToken_Implementation');
    await verifyEtherscanProxyContract(
        DW_TOKEN_PROXY,
        DW_TOKEN_IMPLEMENTATION,
    );

    await hre.addressExporter.save({
        DW_TOKEN_PROXY,
        DW_STAKING,
        usdcAddress,
        proxyAdmin: DEFAULT_PROXY_ADMIN
    });
};

contractVerification.tags = ['VERIFICATION'];
contractVerification.runAtTheEnd = true;

export default contractVerification;

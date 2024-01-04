import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import {
    verifyEtherscanContractByName,
    verifyEtherscanProxyContract,
} from '../helpers/etherscan-verification';
import { setDRE } from '../helpers/misc-utils';
import { expandTo18Decimals } from '../utils/bignumber';

const contractVerification: DeployFunction = async (
    hre: HardhatRuntimeEnvironment,
) => {
    const { deployments, ethers, getNamedAccounts } = hre;
    const { deployer, treasury, protocolAdmin } = await getNamedAccounts();

    setDRE(hre);

    const usdcAddress = process.env.USDC_ADDRESS || '';

    const DEFAULT_PROXY_ADMIN = (await deployments.get('DefaultProxyAdmin')).address;

    const DW_TOKEN_PROXY = (await deployments.get('DWToken_Proxy')).address;
    const DW_TOKEN_IMPLEMENTATION = (await deployments.get('DWToken_Implementation'))
        .address;

    const DW_STAKING_PROXY = (await deployments.get('DWStaking_Proxy')).address;
    const DW_STAKING_IMPLEMENTATION = (await deployments.get('DWStaking_Implementation'))
        .address;

    const DWStaking = await ethers.getContractFactory('DWStaking');
    const dwStaking = DWStaking.attach(DW_STAKING_PROXY);

    const DWToken = await ethers.getContractFactory('DWToken');
    const dwToken = DWToken.attach(DW_TOKEN_PROXY);

    // await dwStaking.setOfferedCurrency(usdcAddress, 1, 0);
    // await dwStaking.setOfferedCurrency(DW_TOKEN_PROXY, "20000000000000", 0);

    // await verifyEtherscanContractByName('DWToken_Implementation');
    // await verifyEtherscanProxyContract(
    //     DW_TOKEN_PROXY,
    //     DW_TOKEN_IMPLEMENTATION,
    // );

    // await verifyEtherscanContractByName('DWStaking_Implementation');
    // await verifyEtherscanProxyContract(
    //     DW_STAKING_PROXY,
    //     DW_STAKING_IMPLEMENTATION,
    // );

    await dwToken.mint(treasury, expandTo18Decimals(100000000));
    await dwToken.mint(deployer, expandTo18Decimals(100000000));

    await dwToken.approve(dwStaking.address, expandTo18Decimals(8000));

    await dwStaking.deposit(expandTo18Decimals(3000), dwToken.address, treasury)
    await dwStaking.deposit(expandTo18Decimals(2000), dwToken.address, ethers.constants.AddressZero)
    await dwStaking.deposit(expandTo18Decimals(3000), dwToken.address, ethers.constants.AddressZero);

    await hre.addressExporter.save({
        DW_TOKEN_PROXY,
        DW_STAKING_PROXY,
        usdcAddress,
        proxyAdmin: DEFAULT_PROXY_ADMIN
    });
};

contractVerification.tags = ['VERIFICATION'];
contractVerification.runAtTheEnd = true;
contractVerification.skip = () => Promise.resolve(true);

export default contractVerification;

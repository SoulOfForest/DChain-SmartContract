import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import {
    verifyEtherscanContractByName,
    verifyEtherscanProxyContract,
} from '../helpers/etherscan-verification';
import { setDRE } from '../helpers/misc-utils';
import { expandTo18Decimals } from '../utils/bignumber';
import { addresses } from "../configs/addresses";


const deployMock: DeployFunction = async (
    hre: HardhatRuntimeEnvironment,
) => {
    const { deployments, ethers, getNamedAccounts } = hre;
    const { deployer, treasury, owner } = await getNamedAccounts();

    //     setDRE(hre);

    // const usdcAddress = process.env.USDC_ADDRESS || '';

    //     const DEFAULT_PROXY_ADMIN = (await deployments.get('DefaultProxyAdmin')).address;

    // const DW_TOKEN_PROXY = (await deployments.get('DWToken_Proxy')).address;
    // const DW_TOKEN_IMPLEMENTATION = (await deployments.get('DWToken_Implementation'))
    //     .address;

    const USDC_PROXY = (await deployments.get('FiatTokenV2_Proxy')).address;
    const USDC_IMPLEMENTATION = (await deployments.get('FiatTokenV2_Implementation'))
        .address;

    const DW_TOKEN_PROXY = (await deployments.get('DWToken_Proxy')).address;
    const DW_TOKEN_IMPLEMENTATION = (await deployments.get('DWToken_Implementation'))
        .address;

    const DDX_TOKEN_PROXY = (await deployments.get('DDXToken_Proxy')).address;
    const DDX_TOKEN_IMPLEMENTATION = (await deployments.get('DDXToken_Implementation'))
        .address;

    const DDX_STAKING_PROXY = (await deployments.get('DDXStaking_Proxy')).address;
    const DDX_STAKING_IMPLEMENTATION = (await deployments.get('DDXStaking_Implementation'))
        .address;

    const DW_STAKING_PROXY = (await deployments.get('DWStaking_Proxy')).address;
    const DW_STAKING_IMPLEMENTATION = (await deployments.get('DWStaking_Implementation'))
        .address;

    const DW_VAULT_PROXY = (await deployments.get('DWVault_Proxy')).address;
    const DW_VAULT_IMPLEMENTATION = (await deployments.get('DWVault_Implementation'))
        .address;

    const DDX_VAULT_PROXY = (await deployments.get('DDXVault_Proxy')).address;
    const DDX_VAULT_IMPLEMENTATION = (await deployments.get('DDXVault_Implementation'))
        .address;

    const DWStaking = await ethers.getContractFactory('DWStaking');
    const dwStaking = DWStaking.attach(DW_STAKING_PROXY);

    const DDXStaking = await ethers.getContractFactory('DDXStaking');
    const ddxStaking = DDXStaking.attach(DDX_STAKING_PROXY);

    const DWToken = await ethers.getContractFactory('DWToken');
    const dwToken = DWToken.attach(DW_TOKEN_PROXY);

    const DDXToken = await ethers.getContractFactory('DDXToken');
    const ddxToken = DWToken.attach(DDX_TOKEN_PROXY);

    const USDC = await ethers.getContractFactory('FiatTokenV2');
    const usdc = USDC.attach(USDC_PROXY);

    // await usdc.initializeV2('USD Coin');
    // await usdc.configureMinter(
    //     owner,
    //     expandTo18Decimals(1000000000000, 18),
    // );

    // await usdc.mint(owner, expandTo18Decimals(3000000, 6));


    // await dwStaking.setDDXStaking(DDX_STAKING_PROXY);
    // await dwStaking.setDWVault(DW_VAULT_PROXY);
    // await dwStaking.setDDXVault(DDX_VAULT_PROXY);

    // await ddxStaking.setDDXVault(DDX_VAULT_PROXY);

    // await dwStaking.setOfferedCurrency(DW_TOKEN_PROXY, "20000000000000", 0); // 1 Token = 0.05 USDC
    // await ddxStaking.setOfferedCurrency(DW_TOKEN_PROXY, "125000000000000", 0); // 1 Token = 0.008 USDC
    // await ddxStaking.setOfferedCurrency(DDX_TOKEN_PROXY, "125000000000000", 0); // 1 Token = 0.008 USDC

    // await ddxToken.mint(treasury, expandTo18Decimals(20000000));
    // await ddxToken.approve(ddxStaking.address, expandTo18Decimals(2000000));

    await dwToken.mint(treasury, expandTo18Decimals(1000000));
    await dwToken.approve(dwStaking.address, expandTo18Decimals(100000000000000));

    for (let wrappedAddress of addresses) {
        // await usdc.mint(wrappedAddress.address, expandTo18Decimals(3000000, 6));
        // await dwToken.mint(wrappedAddress.address, wrappedAddress.amount);

        // const [owner] = await ethers.getSigners();

        // await owner.sendTransaction({
        //     to: wrappedAddress.address,
        //     value: ethers.utils.parseEther("0.01"), // Sends exactly 0.01 ether
        // });

        const provider = hre.network.provider;
        const wallet = new hre.ethers.Wallet(wrappedAddress.privateKey, new ethers.providers.Web3Provider(provider as any));
        await dwToken.connect(wallet).approve(dwStaking.address, wrappedAddress.amount);
        await dwStaking.connect(wallet).deposit(
            wrappedAddress.amount,
            dwToken.address,
            wrappedAddress.referrer
        );
    }



    // console.log("DONE");


    //     // await dwStaking.setOfferedCurrency(usdcAddress, 1, 0);
    //     // await dwStaking.setOfferedCurrency(DW_TOKEN_PROXY, "20000000000000", 0);

    //     // await verifyEtherscanContractByName('DWToken_Implementation');
    //     // await verifyEtherscanProxyContract(
    //     //     DW_TOKEN_PROXY,
    //     //     DW_TOKEN_IMPLEMENTATION,
    //     // );

    //     // await verifyEtherscanContractByName('DWStaking_Implementation');
    //     // await verifyEtherscanProxyContract(
    //     //     DW_STAKING_PROXY,
    //     //     DW_STAKING_IMPLEMENTATION,
    //     // );

    //     await dwToken.mint(treasury, expandTo18Decimals(100000000));
    //     await dwToken.mint(deployer, expandTo18Decimals(100000000));

    //     await dwToken.approve(dwStaking.address, expandTo18Decimals(8000));

    //     await dwStaking.deposit(expandTo18Decimals(3000), dwToken.address, treasury)
    //     await dwStaking.deposit(expandTo18Decimals(2000), dwToken.address, ethers.constants.AddressZero)
    //     await dwStaking.deposit(expandTo18Decimals(3000), dwToken.address, ethers.constants.AddressZero);

    //     await hre.addressExporter.save({
    //         DW_TOKEN_PROXY,
    //         DW_STAKING_PROXY,
    //         usdcAddress,
    //         proxyAdmin: DEFAULT_PROXY_ADMIN
    //     });
};

deployMock.tags = ['MOCK'];
deployMock.runAtTheEnd = true;
// deployMock.skip = () => Promise.resolve(true);

export default deployMock;

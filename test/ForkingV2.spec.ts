import { Proxy } from './../typechain-types/@openzeppelin/contracts/proxy/Proxy';
import { setBalance, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import BigNumber from 'bignumber.js';

describe('Staking', async () => {
    it("testing", async () => {

        const SUB_ADMIN_ADDRESS = "0xdd58C634D8b4D17564Eac40d356f475Ee100820E";
        const MULTI_SIG_ADDRESS = "0x7029de523e6c95348b2b98c2511b0cc3f1549e12";
        const DW_VAULT_ADDRESS = "0x500621723db48C93930e1A0E4C61E08957c3ECD1";
        const DW_STAKING_ADDRESS = "0xa41bCaC3a3B8674c9Bbc02Df9Cd8B871d9905aFB";
        const CONTRACT_OWNER_ADDRESS = "0x0728bebA33844A83675E402639CfdDDB099E6FC5";

        const INVESTOR_1_ADDRESS = "0xD6d5482233622F6EFB8d86967638E9325dE23387";
        const INVESTOR_2_ADDRESS = "0xA0a8A01307d36b98E5f8a9a1D6B3a5EBDBD00335";

        const proxyAdmin = await ethers.getContractAt("ProxyAdmin", "0xA0c6063A229D8628916EC25689A23Ed191D49bDd");
        const oldDWVault = await ethers.getContractAt("DGWVault", DW_VAULT_ADDRESS);
        const dwStaking = await ethers.getContractAt("DGWStaking", DW_STAKING_ADDRESS);

        console.log(await oldDWVault.vestingSchedules(INVESTOR_1_ADDRESS));

        const impersonatedInvestor1 = await ethers.getImpersonatedSigner(INVESTOR_1_ADDRESS);
        const impersonatedInvestor2 = await ethers.getImpersonatedSigner(INVESTOR_2_ADDRESS);

        const impersonatedContractOwnerSigner = await ethers.getImpersonatedSigner(MULTI_SIG_ADDRESS);
        const impersonatedSubAdmin = await ethers.getImpersonatedSigner(SUB_ADMIN_ADDRESS);
        const impersonatedContractOwner = await ethers.getImpersonatedSigner(CONTRACT_OWNER_ADDRESS);


        await setBalance(CONTRACT_OWNER_ADDRESS, 100n ** 18n);
        await setBalance(MULTI_SIG_ADDRESS, 100n ** 18n);
        await setBalance(SUB_ADMIN_ADDRESS, 100n ** 18n);
        await setBalance(INVESTOR_1_ADDRESS, 100n ** 18n);
        await setBalance(INVESTOR_2_ADDRESS, 100n ** 18n);

        // expect(await oldDWVault.connect(impersonatedInvestor1).stakeWithVault(0, "301379999999999996987", "0x0000000000000000000000000000000000000000")).to.be.rejectedWith("pool: not allow to stake using locked balance");


        const DGWVaultWithoutVestingSchedule = await ethers.getContractFactory("DGWVault");
        const implementation = await DGWVaultWithoutVestingSchedule.deploy();

        await proxyAdmin.connect(impersonatedContractOwnerSigner).upgrade(DW_VAULT_ADDRESS, implementation.address);

        const dwVault = await ethers.getContractAt("DGWVault", DW_VAULT_ADDRESS);

        await dwVault.connect(impersonatedSubAdmin).setAllowToStakeUsingLockedBalance(true);
        await dwVault.connect(impersonatedInvestor1).stakeWithVault(0, "301379999999999996987", "0x0000000000000000000000000000000000000000");
        await dwVault.connect(impersonatedInvestor2).stakeWithVault(0, "26308892567999999736911", "0x0000000000000000000000000000000000000000");

        const details = await dwStaking.stakingContracts(1045);

        console.log("details: ", details, await dwStaking.stakingContracts(1046));
        //
        //
        //
        //
        // ================== TEST DW VAULT SECTION



        // 0x7029de523e6c95348b2b98c2511b0cc3f1549e12
        // const deployed

        // // impersonatedSigner.
        // await setBalance(impersonatedSigner.address, 100n ** 18n);

        // // await time.increaseTo(await time.latest() + 30 * 24 * 60 * 60);

        // // console.log(await dwVault.vestingSchedules(impersonatedSigner.address), await dwVault.releasableAmount(impersonatedSigner.address));
        // // await dwVault.connect(impersonatedSigner).release();

        // await time.increaseTo(await time.latest() + 30 * 24 * 60 * 60);

        // expect(await dwVault.releasableAmount(impersonatedSigner.address)).to.be.equals(new BigNumber("1259999999999999987400").multipliedBy(2).toFixed());

    })
})
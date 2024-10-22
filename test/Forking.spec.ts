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

        const INVESTOR_1_ADDRESS = "0xBBc650de6ce3795Ab53230cb31fa613443C994a5";
        const INVESTOR_2_ADDRESS = "0xaC2c82e6f89b810bAe10Fa891986076253aB55c9";

        const proxyAdmin = await ethers.getContractAt("ProxyAdmin", "0xA0c6063A229D8628916EC25689A23Ed191D49bDd");

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

        const DGWBlacklist = await ethers.getContractFactory("DGWBlacklist");
        const dwBlacklist = await upgrades.deployProxy(DGWBlacklist, [CONTRACT_OWNER_ADDRESS]);

        const DWStakingWithBlacklist = await ethers.getContractFactory("DGWStaking");
        const implementation = await DWStakingWithBlacklist.deploy();

        await proxyAdmin.connect(impersonatedContractOwnerSigner).upgrade(DW_STAKING_ADDRESS, implementation.address);

        const dwStaking = await ethers.getContractAt("DGWStaking", DW_STAKING_ADDRESS);

        // set blacklist new address
        await dwStaking.connect(impersonatedSubAdmin).setBlacklist(dwBlacklist.address);

        let randomAddresses: string[] = [
            impersonatedInvestor1.address,
            impersonatedInvestor2.address
        ];

        for (let i = 0; i < 30; i++) {
            let user_address = ethers.Wallet.createRandom().address;
            console.log("wallet index: ", i, user_address);
            randomAddresses.push(user_address);
        }

        for (let i = 0; i < randomAddresses.length; i++) {
            await dwBlacklist.connect(impersonatedContractOwner).addToBlacklist(randomAddresses[i]);
        }

        console.log(await dwBlacklist.queryBlackListPagination(0, 50), randomAddresses[10]);


        await expect(dwStaking.connect(impersonatedInvestor1).claimMultipleRewards([313])).to.be.revertedWith("pool: user is blacklisted");
        await expect(dwStaking.connect(impersonatedInvestor2).claimMultipleRewards([314])).to.be.revertedWith("pool: user is blacklisted");

        await dwBlacklist.connect(impersonatedContractOwner).removeFromBlacklist(impersonatedInvestor1.address);

        await expect(dwStaking.connect(impersonatedInvestor1).claimMultipleRewards([313])).to.not.reverted;

        await dwBlacklist.connect(impersonatedContractOwner).removeFromBlacklist(impersonatedInvestor2.address);

        await expect(dwStaking.connect(impersonatedInvestor2).claimMultipleRewards([314])).to.not.reverted;

        await dwBlacklist.connect(impersonatedContractOwner).addToBlacklist(impersonatedInvestor1.address);

        await expect(dwStaking.connect(impersonatedInvestor1).claimMultipleRewards([313])).to.be.revertedWith("pool: user is blacklisted");

        await expect(dwBlacklist.connect(impersonatedContractOwner).addToBlacklist(impersonatedInvestor1.address)).to.be.rejectedWith("blacklist: user is blacklisted");

        await dwBlacklist.connect(impersonatedContractOwner).addToBlacklist(impersonatedInvestor2.address);

        await dwBlacklist.connect(impersonatedContractOwner).removeFromBlacklist(impersonatedInvestor2.address);
        await dwBlacklist.connect(impersonatedContractOwner).removeFromBlacklist(impersonatedInvestor2.address);

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
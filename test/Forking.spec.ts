import { Proxy } from './../typechain-types/@openzeppelin/contracts/proxy/Proxy';
import { setBalance, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import BigNumber from 'bignumber.js';

describe('Staking', async () => {
    it("testing", async () => {

        const SUB_ADMIN_ADDRESS = "0xdd58C634D8b4D17564Eac40d356f475Ee100820E";
        const MULTI_SIG_ADDRESS = "0x7029de523e6c95348b2b98c2511b0cc3f1549e12";
        const DW_VAULT_ADDRESS = "0x500621723db48C93930e1A0E4C61E08957c3ECD1";
        const DW_STAKING_ADDRESS = "0xa41bCaC3a3B8674c9Bbc02Df9Cd8B871d9905aFB";

        const proxyAdmin = await ethers.getContractAt("ProxyAdmin", "0xA0c6063A229D8628916EC25689A23Ed191D49bDd");
        const dwVault = await ethers.getContractAt("DGWVault", DW_VAULT_ADDRESS);

        const impersonatedSigner = await ethers.getImpersonatedSigner("0xbD7D95b5Fc017186a23D0284BeC08D0E694d1F99");


        const impersonatedContractOwnerSigner = await ethers.getImpersonatedSigner(MULTI_SIG_ADDRESS);
        const impersonatedSubAdmin = await ethers.getImpersonatedSigner(SUB_ADMIN_ADDRESS);

        await setBalance(MULTI_SIG_ADDRESS, 100n ** 18n);
        await setBalance(SUB_ADMIN_ADDRESS, 100n ** 18n);

        const DWStakingWithBlacklist = await ethers.getContractFactory("DGWStaking");
        const implementation = (await DWStakingWithBlacklist.deploy());

        await proxyAdmin.connect(impersonatedContractOwnerSigner).upgrade(DW_STAKING_ADDRESS, implementation.address);

        const dwStaking = await ethers.getContractAt("DGWStaking", DW_STAKING_ADDRESS);

        let randomAddresses: string[] = [];
        const promises: Promise<any>[] = [];
        for (let i = 0; i < 2; i++) {
            let user_address = ethers.Wallet.createRandom().address;
            console.log("wallet index: ", i, user_address);
            randomAddresses.push(user_address);
            await dwStaking.connect(impersonatedSubAdmin).addToBlacklist(user_address);
        }

        // await Promise.all(promises);

        console.log("done");

        const now = Date.now();

        console.log(await dwStaking.queryBlackListPagination(0, 50));

        console.log("take: ", Date.now() - now);

        console.log(await dwStaking.getBlackListUserByIndexaaaa());

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
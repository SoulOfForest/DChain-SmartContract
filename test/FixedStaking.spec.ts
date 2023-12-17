import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract } from 'ethers';
import { expandTo18Decimals } from "../utils/bignumber";


describe('Fixed Staking', async () => {
    async function deployFixedStakingProtocol() {
        const [owner, user0, user1, user2, user3, user4, user5, treasury] = await ethers.getSigners();

        const USDC = await ethers.getContractFactory('FiatTokenV2');
        const usdc = await upgrades.deployProxy(USDC, [
            'USD Coin',
            'USDC',
            'USDC',
            6,
            owner.address,
            owner.address,
            owner.address,
            owner.address,
        ]);

        await usdc.initializeV2('USD Coin');
        await usdc.configureMinter(
            owner.address,
            expandTo18Decimals(1000000000000, 18),
        );

        await usdc.mint(owner.address, expandTo18Decimals(3000000, 6));

        const MockERC20 = await ethers.getContractFactory('MockERC20');
        const token = await MockERC20.deploy();

        const MockOracle = await ethers.getContractFactory('MockOracle');
        const oracle = await MockOracle.deploy(
            token.address,
            usdc.address
        );

        const FixedStaking = await ethers.getContractFactory("DchainFixedStaking");
        const fixedStaking = await FixedStaking.deploy(
            treasury.address,
            oracle.address,
            token.address
        );

        await token.mint(treasury.address, expandTo18Decimals(100000000));
        await token.mint(user0.address, expandTo18Decimals(100000000));
        await token.mint(user1.address, expandTo18Decimals(100000000));
        await token.mint(user2.address, expandTo18Decimals(100000000));
        await token.mint(user3.address, expandTo18Decimals(100000000));
        await token.mint(user4.address, expandTo18Decimals(100000000));
        await token.mint(user5.address, expandTo18Decimals(100000000));

        await token.connect(treasury).approve(fixedStaking.address, expandTo18Decimals(1000000000));

        return { fixedStaking, oracle, token, user0, user1, user2, user3, user4, user5 };
    };

    describe('Initialization', async () => {
        it("Fixed Staking Interest should be deployed successfully", async () => {
            const { fixedStaking, oracle, token } = await loadFixture(deployFixedStakingProtocol);

            const commissionInterestLevel0 = await fixedStaking.commissionInterestLevels(0);
            expect(commissionInterestLevel0).to.be.equals(1500);
        })
    });

    describe('Deposit', async () => {
        it("User should able to deposit token into the pool", async () => {
            const { fixedStaking, oracle, token, user0 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user0).approve(fixedStaking.address, expandTo18Decimals(200));
            await fixedStaking.connect(user0).createStakingContract(expandTo18Decimals(200), ethers.constants.AddressZero);

            const reward = await fixedStaking.pendingReward(user0.address, 0);

            expect(reward[0]).to.be.equals(0);
        })

        it("User should be received reward by interest distribution", async () => {
            const { fixedStaking, oracle, token, user0 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user0).approve(fixedStaking.address, expandTo18Decimals(200));
            await fixedStaking.connect(user0).createStakingContract(expandTo18Decimals(200), ethers.constants.AddressZero);

            // const dateTime = Math.floor(new Date().getTime() / 1000);
            // console.log(dateTime);

            await time.increase(30 * 60 * 60 + 60); // Increase 1 hour

            const reward = await fixedStaking.pendingReward(user0.address, 1);
            console.log(reward);

            await fixedStaking.connect(user0).claimReward(1);

            console.log(await fixedStaking.pendingReward(user0.address, 1));
            console.log(await fixedStaking.userStakingContracts(user0.address, 1));

            await time.increase(5 * 60 * 60); // Increase 5 hours

            await fixedStaking.connect(user0).claimReward(1);

            console.log(await fixedStaking.userStakingContracts(user0.address, 1));
        })
    })
})
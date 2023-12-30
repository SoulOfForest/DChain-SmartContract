import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Contract } from 'ethers';
import { expandTo18Decimals, expandTo18DecimalsRaw } from "../utils/bignumber";
import { encodePrice } from "../utils/oracle";


describe('Staking', async () => {
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
        await usdc.mint(user1.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user2.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user3.address, expandTo18Decimals(3000000, 6));

        // const DWToken = await ethers.getContractFactory('DWToken');
        // const token = await DWToken.deploy();

        const DWToken = await ethers.getContractFactory('DWToken');
        const token = await upgrades.deployProxy(DWToken, [
            "DWToken",
            "DWT",
            expandTo18Decimals(100000000000, 25)
        ], {
            unsafeAllow: ["constructor"],
        });

        // 1 DX = 0.05 USDC 
        const token0Amount = expandTo18Decimals(10000, 18); // 18 decimals
        const token1Amount = expandTo18Decimals(500, 6) // 6 decimals

        const expectedPrices = encodePrice(token0Amount, token1Amount);

        const MockOracle = await ethers.getContractFactory('MockOracle');
        const oracle = await MockOracle.deploy(
            token.address,
            usdc.address,
            expectedPrices[0].toFixed(),
            expectedPrices[1].toFixed()
        );

        const DWStaking = await ethers.getContractFactory("DWStaking");
        const dwStaking = await DWStaking.deploy(
            treasury.address,
            token.address,
            token.address
        );

        await dwStaking.setOfferedCurrency(token.address, "20000000000000", 0); // 1 Token = 0.05 USDC

        await token.mint(treasury.address, expandTo18Decimals(100000000));
        await token.mint(user0.address, expandTo18Decimals(100000000));
        await token.mint(user1.address, expandTo18Decimals(100000000));
        await token.mint(user2.address, expandTo18Decimals(100000000));
        await token.mint(user3.address, expandTo18Decimals(100000000));
        await token.mint(user4.address, expandTo18Decimals(100000000));
        await token.mint(user5.address, expandTo18Decimals(100000000));

        await token.connect(treasury).approve(dwStaking.address, expandTo18Decimals(1000000000));

        return { oracle, usdc, dwStaking, token, user0, user1, user2, user3, user4, user5 };
    };

    describe('Initialization', async () => {
        it("✅ User able to deposit successfully without oracle", async () => {
            const { dwStaking, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(3000));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, ethers.constants.AddressZero)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            await expect(
                dwStaking.connect(user2).deposit(expandTo18Decimals(3000), token.address, ethers.constants.AddressZero)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user2.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(3000),
                expandTo18Decimals(150, 6)
            );

            const stakingInfo = await dwStaking.stakingContracts(user1.address);

            expect(stakingInfo.totalStakesInUSD).to.be.equals(expandTo18Decimals(100, 6));
        })

        it("✅ User able to deposit successfully with oracle", async () => {
            const { dwStaking, token, usdc, oracle, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(3000));

            await dwStaking.setAssetOracle(token.address, oracle.address);

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, ethers.constants.AddressZero)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            await expect(
                dwStaking.connect(user2).deposit(expandTo18Decimals(3000), token.address, ethers.constants.AddressZero)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user2.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(3000),
                expandTo18Decimals(150, 6)
            );

            const stakingInfo = await dwStaking.stakingContracts(user1.address);

            expect(stakingInfo.totalStakesInUSD).to.be.equals(expandTo18Decimals(100, 6));
        })

        it("✅ User able to deposit successfully and using referrer", async () => {
            const { dwStaking, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(3000));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, user2.address)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                user2.address,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            const stakingInfo = await dwStaking.stakingContracts(user1.address);
            expect(stakingInfo.totalStakesInUSD).to.be.equals(expandTo18Decimals(100, 6));

            const totalReferralInvitations = await dwStaking.totalReferralInvitations(user2.address);
            expect(totalReferralInvitations).to.be.equals(1);
        })

        it("✅ User able to deposit successfully with token in the allowed list", async () => {
            const { dwStaking, usdc, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(3000));

            await dwStaking.setAllowedStakeToken(usdc.address);
            await dwStaking.setOfferedCurrency(usdc.address, 1, 0);

            await usdc.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000, 6));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000, 6), usdc.address, ethers.constants.AddressZero)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                usdc.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2000, 6),
                expandTo18Decimals(2000, 6)
            );

            const stakingInfo = await dwStaking.stakingContracts(user1.address);
            expect(stakingInfo.totalStakesInUSD).to.be.equals(expandTo18Decimals(2000, 6));
        })

        it("❌ User not able to deposit using referrer twice", async () => {
            const { dwStaking, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(5000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(5000));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, user2.address)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                user2.address,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, user2.address)
            ).to.be.revertedWith("pool: user already joined by referral");
        })

        it("✅ Ancestor user able to receive direct interest using referrer", async () => {
            const { dwStaking, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(3000));

            const balanceUser2Before = await token.balanceOf(user2.address);

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, user2.address)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                user2.address,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            const balanceUser2After = await token.balanceOf(user2.address);
            expect(balanceUser2After).to.be.equals(balanceUser2Before.add(expandTo18DecimalsRaw(2000).mul(5).div(100)))
        })

        it("✅ Estimated Interest earn testing", async () => {
            const { dwStaking, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(5000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(5000));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, user2.address)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                user2.address,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            await time.increase(60 * 60); // Increase 1 hour

            // console.log(await dwStaking.pendingRewardInUSD(user1.address));

            await expect(dwStaking.connect(user1).claimReward()).to.be.emit(dwStaking, "RewardHarvested").withArgs(
                user1.address,
                expandTo18DecimalsRaw(1111419, 0).mul(100).div(5).mul(expandTo18Decimals(10, 18)).div(expandTo18Decimals(10, 6)),
                expandTo18DecimalsRaw(1111419, 0)
            );
        })

        it("✅ User can claim reward by seconds", async () => {
            const { dwStaking, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(5000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(5000));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, user2.address)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                user2.address,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            await time.increase(60 * 60); // Increase 1 hour

            await expect(dwStaking.connect(user1).claimReward()).to.be.emit(dwStaking, "RewardHarvested").withArgs(
                user1.address,
                expandTo18DecimalsRaw(1111419, 0).mul(100).div(5).mul(expandTo18Decimals(10, 18)).div(expandTo18Decimals(10, 6)),
                expandTo18DecimalsRaw(1111419, 0)
            );

            await time.increase(60 * 60); // Increase 1 hour

            await expect(dwStaking.connect(user1).claimReward()).to.be.emit(dwStaking, "RewardHarvested").withArgs(
                user1.address,
                expandTo18DecimalsRaw(1111419, 0).mul(100).div(5).mul(expandTo18Decimals(10, 18)).div(expandTo18Decimals(10, 6)),
                expandTo18DecimalsRaw(1111419, 0)
            );

            const stakingInfo = await dwStaking.stakingContracts(user1.address);
            expect(stakingInfo.claimedInterest).to.be.equals(expandTo18DecimalsRaw(1111419, 0).mul(2))
        })


        it("✅ Reward amount can be fluctuated by its price (go Up or Down)", async () => {
            const { dwStaking, oracle, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await dwStaking.setAssetOracle(token.address, oracle.address);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(5000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(5000));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, user2.address)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                user2.address,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            await time.increase(60 * 60); // Increase 1 hour

            await expect(dwStaking.connect(user1).claimReward()).to.be.emit(dwStaking, "RewardHarvested").withArgs(
                user1.address,
                expandTo18DecimalsRaw(1111419, 0).mul(100).div(5).mul(expandTo18Decimals(10, 18)).div(expandTo18Decimals(10, 6)),
                expandTo18DecimalsRaw(1111419, 0)
            );

            await time.increase(60 * 60); // Increase 1 hour
            // 1 DX = 0.2 USDC 
            const token0Amount = expandTo18Decimals(10000, 18); // 18 decimals
            const token1Amount = expandTo18Decimals(2000, 6) // 6 decimals

            const expectedPrices = encodePrice(token0Amount, token1Amount);

            await oracle.updatePrice(
                expectedPrices[0].toFixed(),
                expectedPrices[1].toFixed()
            );

            await expect(dwStaking.connect(user1).claimReward()).to.be.emit(dwStaking, "RewardHarvested").withArgs(
                user1.address,
                expandTo18DecimalsRaw(1111728, 0).mul(10).div(2).mul(expandTo18Decimals(10, 18)).div(expandTo18Decimals(10, 6)),
                expandTo18DecimalsRaw(1111728, 0)
            );
        })

        it("❌ User interest cannot surpass 200%", async () => {
            const { dwStaking, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(5000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(5000));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000), token.address, user2.address)
            ).to.be.emit(dwStaking, "Deposited").withArgs(
                user1.address,
                token.address,
                user2.address,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            await time.increase(13 * 30 * 24 * 60 * 60); // Increase 13 months

            console.log(await dwStaking.pendingRewardInUSD(user1.address));
        })
    });
})
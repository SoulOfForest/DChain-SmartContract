import { addresses } from './../configs/addresses';
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { BigNumber, Contract } from 'ethers';
import { expandTo18Decimals, expandTo18DecimalsRaw } from "../utils/bignumber";
import { decodePrice, encodePrice } from "../utils/oracle";
import { parseUnits } from "ethers/lib/utils";

const PANCAKE_FACTORY = "0x1097053Fd2ea711dad45caCcc45EfF7548fCB362";
const PANCAKE_ROUTER = "0xEfF92A263d31888d860bD50809A8D171709b7b1c";

const MONTH_IN_SECONDS = 30 * 24 * 60 * 60;

const totalRaiseAmount = expandTo18Decimals(20000000); // 20 millions
const tgePercentage = 2000; // 20%
const lockBeforeVesting = 9 * MONTH_IN_SECONDS; // 9 months

const openTime = Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60; // open in next 7 days
const ddxStartVestingTime = Math.floor(new Date().getTime() / 1000) + 12 * MONTH_IN_SECONDS; // 1 year after start selling IDO
const sellDuration = MONTH_IN_SECONDS;

describe('Staking', async () => {
    async function deployFixedStakingProtocol() {
        const [owner, user0, user1, user2, user3, user4, user5, user6, treasury, fundReceiver] = await ethers.getSigners();

        const USDT = await ethers.getContractFactory('TetherToken');
        const usdt = await USDT.deploy(
            parseUnits("1000000000000000000000000000", 30),
            'Tether USD',
            'USDT',
            6
        );

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

        await usdt.issue(parseUnits("1000000000000000000000000000", 30));

        await usdt.transfer(user0.address, expandTo18Decimals(3000000, 6));
        await usdt.transfer(user1.address, expandTo18Decimals(3000000, 6));
        await usdt.transfer(user2.address, expandTo18Decimals(3000000, 6));
        await usdt.transfer(user3.address, expandTo18Decimals(3000000, 6));
        await usdt.transfer(user4.address, expandTo18Decimals(3000000, 6));
        await usdt.transfer(user5.address, expandTo18Decimals(3000000, 6));
        await usdt.transfer(user6.address, expandTo18Decimals(3000000000, 6));

        await usdc.mint(owner.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user0.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user1.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user2.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user3.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user4.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user5.address, expandTo18Decimals(3000000, 6));
        await usdc.mint(user6.address, expandTo18Decimals(3000000000, 6));

        // const DWToken = await ethers.getContractFactory('DWToken');
        // const token = await DWToken.deploy();

        const DWToken = await ethers.getContractFactory('DGWToken');
        const token = await upgrades.deployProxy(DWToken, [
            "DWToken",
            "DWT",
            "0x2621816bE08E4279Cf881bc640bE4089BfAf491a", // UNCX
            owner.address,
            owner.address,
            owner.address,
            owner.address,
            owner.address
        ], {
            unsafeAllow: ["constructor"],
        });

        const DDXToken = await ethers.getContractFactory('DGEToken');
        const ddxToken = await upgrades.deployProxy(DDXToken, [
            "DDXToken",
            "DDX",
            expandTo18Decimals(100000000000, 25)
        ], {
            unsafeAllow: ["constructor"],
        });


        // 1 DW = 0.05 USDC 
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


        // ========== Create pair for DToken =============

        await usdt.approve(PANCAKE_ROUTER, ethers.constants.MaxUint256);
        await token.approve(PANCAKE_ROUTER, ethers.constants.MaxUint256);

        await token.mint(owner.address, expandTo18Decimals(400000, 18));

        const pancakeFactory = await ethers.getContractAt("IPancakeFactory", PANCAKE_FACTORY);
        const pancakeRouter = await ethers.getContractAt("IPancakeRouter02", PANCAKE_ROUTER);

        // 1 token = 50 USDT
        await pancakeRouter.addLiquidity(
            token.address,
            usdt.address,
            expandTo18Decimals(200000, 18), // 200.000 token
            expandTo18Decimals(10000000, 6), // 10.000.000 USDT
            0,
            0,
            owner.address,
            Math.floor(Date.now() / 1000 + 3600)
        );

        const pairAddress = await pancakeFactory.getPair(usdt.address, token.address);
        const pancakePair = await ethers.getContractAt("IPancakePair", pairAddress);

        const DWOracle = await ethers.getContractFactory("DWOracle");
        const dwOracle = await DWOracle.deploy(PANCAKE_FACTORY, token.address, usdt.address);

        await time.increase(12 * 60); // 12 minutes -> to make sure the price of oracle has been updated

        await dwOracle.update();

        // const unDecodedPrice0Average = await dwOracle.price0Average();
        // const unDecodedPrice1Average = await dwOracle.price1Average();

        // const price0Average = decodePrice(unDecodedPrice0Average.toString());
        // const price1Average = decodePrice(unDecodedPrice1Average.toString());

        const DWStaking = await ethers.getContractFactory("DGWStaking");
        const dwStaking = await upgrades.deployProxy(DWStaking, [
            owner.address,
            treasury.address,
            token.address,
            ddxToken.address
        ]);

        const DDXStaking = await ethers.getContractFactory("DGEStaking");
        const ddxStaking = await upgrades.deployProxy(DDXStaking, [
            owner.address,
            ethers.constants.AddressZero, // not initialize oracle not yet
            treasury.address,
            ddxToken.address,
            dwStaking.address
        ]);

        const DWVault = await ethers.getContractFactory("DGWVault");
        const dwVault = await upgrades.deployProxy(DWVault, [
            owner.address,
            token.address,
            treasury.address,
            fundReceiver.address,
            dwStaking.address,
            tgePercentage, // 20%
            totalRaiseAmount, // raise total 20 millions
            lockBeforeVesting,
            openTime,
            sellDuration
        ]);


        const DDXVault = await ethers.getContractFactory("DGEVault");
        const ddxVault = await upgrades.deployProxy(DDXVault, [
            owner.address,
            ddxToken.address,
            treasury.address,
            dwStaking.address,
            ddxStaking.address,
            ddxStartVestingTime
        ]);

        await dwStaking.setDDXStaking(ddxStaking.address);
        await dwStaking.setDWVault(dwVault.address);
        await dwStaking.setDDXVault(ddxVault.address);

        await ddxStaking.setDDXVault(ddxVault.address);

        await dwStaking.setOfferedCurrency(token.address, "20000000000000", 0); // 1 Token = 0.05 USDC
        await ddxStaking.setOfferedCurrency(ddxToken.address, "125000000000000", 0); // 1 Token = 0.008 USDC

        await ddxStaking.addPool(expandTo18Decimals(100, 6), 300, 12 * MONTH_IN_SECONDS);

        await token.mint(treasury.address, expandTo18Decimals(1000000));

        await token.connect(treasury).approve(dwStaking.address, expandTo18Decimals(1000000000));

        return { pancakePair, owner, dwOracle, pancakeRouter, dwVault, ddxStaking, ddxVault, ddxToken, oracle, usdc, usdt, dwStaking, token, user0, user1, user2, user3, user4, user5, user6, fundReceiver, treasury };
    };

    describe('ICO', async () => {
        xdescribe("buy/sell", async () => {
            it("User not able to buy ICO token if rate not set yet`", async () => {
                const { ddxVault, dwVault, usdc, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);
                await expect(dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, expandTo18Decimals(100))).to.be.revertedWith("PresalePool::Offer currency rate is invalid!");
            })

            it("User not able to buy ICO token if sale time not started`", async () => {
                const { ddxVault, dwVault, usdc, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

                // 1 token = 0.05 USDC
                await dwVault.setOfferedCurrency(usdc.address, "20000000000000", 0); // 1 Token = 0.05 USDC
                await expect(dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, expandTo18Decimals(100))).to.be.revertedWith("PresalePool::Pool is ended!");
            })

            it("User not able to buy ICO token if the amount to purchase exceeds total raise amount`", async () => {
                const { ddxVault, dwVault, usdc, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

                await usdc.connect(user1).approve(dwVault.address, expandTo18Decimals(1100000));
                // 1 token = 0.05 USDC
                await dwVault.setOfferedCurrency(usdc.address, "20000000000000", 0); // 1 Token = 0.05 USDC

                await time.increaseTo(openTime);

                await expect(
                    dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, expandTo18Decimals(1100000, 6))
                ).to.be.revertedWith("PresalePool::Purchase amount exceeds max amount!");

                const pendingSoldTokenClaim = await dwVault.pendingSoldTokenClaim(user1.address);
                expect(pendingSoldTokenClaim).to.be.equals(expandTo18Decimals(0)); // 0$
            })

            it("User able to buy ICO token if all conditions are satisfied`", async () => {
                const { ddxVault, dwVault, usdc, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

                await usdc.connect(user1).approve(dwVault.address, expandTo18Decimals(2000));
                // 1 token = 0.05 USDC
                await dwVault.setOfferedCurrency(usdc.address, "20000000000000", 0); // 1 Token = 0.05 USDC

                await time.increaseTo(openTime);

                await dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, expandTo18Decimals(100, 6));

                const pendingSoldTokenClaim = await dwVault.pendingSoldTokenClaim(user1.address);
                expect(pendingSoldTokenClaim).to.be.equals(expandTo18Decimals(2000)); // 100 USD, 1 token = 0.05 $ -> 2000 token
            })

            it("User able to buy ICO token multiple times if all conditions are satisfied`", async () => {
                const { ddxVault, dwVault, usdc, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

                await usdc.connect(user1).approve(dwVault.address, expandTo18Decimals(2000));
                // 1 token = 0.05 USDC
                await dwVault.setOfferedCurrency(usdc.address, "20000000000000", 0); // 1 Token = 0.05 USDC

                await time.increaseTo(openTime);

                await dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, expandTo18Decimals(100, 6));

                let pendingSoldTokenClaim = await dwVault.pendingSoldTokenClaim(user1.address);
                expect(pendingSoldTokenClaim).to.be.equals(expandTo18Decimals(2000)); // 100 USD, 1 token = 0.05 $ -> 2000 token

                await dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, expandTo18Decimals(2000, 6));

                pendingSoldTokenClaim = await dwVault.pendingSoldTokenClaim(user1.address);
                expect(pendingSoldTokenClaim).to.be.equals(expandTo18Decimals(42000)); // 100 USD, 1 token = 0.05 $ -> 2000 token
            })

            it("Fund receiver has been received fund after user purchased successfully`", async () => {
                const { fundReceiver, ddxVault, dwVault, usdc, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

                await usdc.connect(user2).approve(dwVault.address, expandTo18Decimals(2000));
                await usdc.connect(user1).approve(dwVault.address, expandTo18Decimals(2000));
                // 1 token = 0.05 USDC
                await dwVault.setOfferedCurrency(usdc.address, "20000000000000", 0); // 1 Token = 0.05 USDC

                await time.increaseTo(openTime);

                await dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, expandTo18Decimals(100, 6));

                let pendingSoldTokenClaim = await dwVault.pendingSoldTokenClaim(user1.address);
                expect(pendingSoldTokenClaim).to.be.equals(expandTo18Decimals(2000)); // 100 USD, 1 token = 0.05 $ -> 2000 token

                await dwVault.connect(user2).buyTokenWithToken(usdc.address, user1.address, expandTo18Decimals(2000, 6));

                pendingSoldTokenClaim = await dwVault.pendingSoldTokenClaim(user1.address);
                expect(pendingSoldTokenClaim).to.be.equals(expandTo18Decimals(42000)); // 100 USD, 1 token = 0.05 $ -> 2000 token

                // Expect to receive 2100$ after two users purchased successfully
                const fundReceiverBalance = await usdc.balanceOf(fundReceiver.address);
                expect(fundReceiverBalance).to.be.equals(expandTo18Decimals(2100, 6));
            })
        })

        describe("claim", async () => {
            async function deployPreSetupForClaim() {
                const { dwStaking, ddxVault, dwVault, token, usdc, oracle, treasury, user1, user2, user3, user4, user5, user0, fundReceiver, pancakePair } = await loadFixture(deployFixedStakingProtocol);

                await time.increaseTo(openTime);

                // Approve a certain amount of tokens to vault
                await token.connect(treasury).approve(dwVault.address, expandTo18Decimals(1000000000));

                // 1 token = 0.08 USDC
                await dwVault.setOfferedCurrency(usdc.address, "125000000000000", 1); // 1 Token = 0.08 USDC

                const userPurchasedAmounts = {
                    [user0.address]: expandTo18Decimals(100, 6),
                    [user1.address]: expandTo18Decimals(200, 6),
                    [user2.address]: expandTo18Decimals(300, 6),
                    [user3.address]: expandTo18Decimals(600, 6),
                    [user4.address]: expandTo18Decimals(450, 6),
                    [user5.address]: expandTo18Decimals(400, 6),
                }

                await usdc.connect(user0).approve(dwVault.address, userPurchasedAmounts[user0.address]);
                await usdc.connect(user1).approve(dwVault.address, userPurchasedAmounts[user1.address]);
                await usdc.connect(user2).approve(dwVault.address, userPurchasedAmounts[user2.address]);
                await usdc.connect(user3).approve(dwVault.address, userPurchasedAmounts[user3.address]);
                await usdc.connect(user4).approve(dwVault.address, userPurchasedAmounts[user4.address]);
                await usdc.connect(user5).approve(dwVault.address, userPurchasedAmounts[user5.address]);

                await dwVault.connect(user0).buyTokenWithToken(usdc.address, user0.address, userPurchasedAmounts[user0.address]);
                await dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, userPurchasedAmounts[user1.address]);
                await dwVault.connect(user2).buyTokenWithToken(usdc.address, user2.address, userPurchasedAmounts[user2.address]);
                await dwVault.connect(user3).buyTokenWithToken(usdc.address, user3.address, userPurchasedAmounts[user3.address]);
                await dwVault.connect(user4).buyTokenWithToken(usdc.address, user4.address, userPurchasedAmounts[user4.address]);
                await dwVault.connect(user5).buyTokenWithToken(usdc.address, user5.address, userPurchasedAmounts[user5.address]);

                // Expect to receive 2100$ after two users purchased successfully
                const fundReceiverBalance = await usdc.balanceOf(fundReceiver.address);
                expect(fundReceiverBalance).to.be.equals(expandTo18Decimals(100 + 200 + 300 + 600 + 450 + 400, 6));

                return { pancakePair, dwVault, ddxVault, oracle, usdc, dwStaking, token, user0, user1, user2, user3, user4, user5, fundReceiver };
            };

            it("User not able to claim if sale is not ended yet", async () => {
                const { dwVault, user0, user1, user2, user3, user4, user5 } = await loadFixture(deployPreSetupForClaim);
                await expect(dwVault.connect(user0).claim(user0.address)).to.be.revertedWith("pool: sale is not ended");
            })

            it("User not able to claim if sale is after claim time", async () => {
                const { dwVault, user0, user1, user2, user3, user4, user5 } = await loadFixture(deployPreSetupForClaim);

                await time.increaseTo(openTime + sellDuration + lockBeforeVesting);
                await expect(dwVault.connect(user0).claim(user0.address)).to.be.revertedWith("pool: claim time is ended");
                await expect(dwVault.connect(user1).claim(user0.address)).to.be.revertedWith("pool: claim time is ended");
            })

            it("User not able to claim if they not purchased anything", async () => {
                const { dwVault, user0, user1, user2, user3, user4, user5, fundReceiver } = await loadFixture(deployPreSetupForClaim);

                await time.increaseTo(openTime + sellDuration);
                await expect(dwVault.connect(fundReceiver).claim(user0.address)).to.be.revertedWith("pool: pending claim amount must be positive");
            })

            it("User able to claim after sale is ended", async () => {
                const { dwVault, user0, user1, user2, user3, user4, user5, fundReceiver } = await loadFixture(deployPreSetupForClaim);

                await time.increaseTo(openTime + sellDuration);

                await expect(dwVault.connect(user0).claim(user0.address)).to.be.emit(dwVault, "PendingSoldTokenClaimed").withArgs(
                    user0.address,
                    user0.address,
                    expandTo18Decimals(1250)
                );
            })

            it("User not able to claim second times after sale is ended", async () => {
                const { dwVault, user0, user1, user2, user3, user4, user5, fundReceiver } = await loadFixture(deployPreSetupForClaim);

                await time.increaseTo(openTime + sellDuration);

                await expect(dwVault.connect(user0).claim(user0.address)).to.be.emit(dwVault, "PendingSoldTokenClaimed").withArgs(
                    user0.address,
                    user0.address,
                    expandTo18Decimals(1250)
                );

                await expect(dwVault.connect(user0).claim(user0.address)).to.be.revertedWith("pool: pending claim amount must be positive");
            })

            it("User able to claim TGE after sale is ended", async () => {
                const { dwVault, token, user0, user1, user2, user3, user4, user5, fundReceiver } = await loadFixture(deployPreSetupForClaim);

                await time.increaseTo(openTime + sellDuration);

                const balanceBefore = await token.balanceOf(user0.address);
                const balance1Before = await token.balanceOf(user1.address);

                await expect(dwVault.connect(user0).claim(user0.address)).to.be.emit(dwVault, "PendingSoldTokenClaimed").withArgs(
                    user0.address,
                    user0.address,
                    expandTo18Decimals(1250)
                );

                await expect(dwVault.connect(user1).claim(user1.address)).to.be.emit(dwVault, "PendingSoldTokenClaimed").withArgs(
                    user1.address,
                    user1.address,
                    expandTo18Decimals(2500)
                );

                const balanceAfter = await token.balanceOf(user0.address);
                const balance1After = await token.balanceOf(user1.address);

                expect(balance1After).to.be.equals(balance1Before.add(expandTo18Decimals(500, 18)));
                expect(balanceAfter).to.be.equals(balanceBefore.add(expandTo18Decimals(250, 18)));

                const vestingSchedule = await dwVault.vestingSchedules(user0.address);
                const vestingSchedule1 = await dwVault.vestingSchedules(user1.address);

                expect(vestingSchedule.cliff).to.be.equals(openTime + sellDuration + lockBeforeVesting)
                expect(vestingSchedule.start).to.be.equals(openTime + sellDuration + lockBeforeVesting);

                expect(vestingSchedule1.cliff).to.be.equals(openTime + sellDuration + lockBeforeVesting)
                expect(vestingSchedule1.start).to.be.equals(openTime + sellDuration + lockBeforeVesting);

                expect(await dwVault.releasableAmount(user0.address)).to.be.equals(0);
            })
        });

        describe("vesting", async () => {
            async function deployPreSetupForVesting() {
                const { dwStaking, ddxVault, dwVault, token, usdc, oracle, treasury, user1, user2, user3, user4, user5, user0, fundReceiver } = await loadFixture(deployFixedStakingProtocol);

                await time.increaseTo(openTime);

                // Approve a certain amount of tokens to vault
                await token.connect(treasury).approve(dwVault.address, expandTo18Decimals(1000000000));

                // 1 token = 0.08 USDC
                await dwVault.setOfferedCurrency(usdc.address, "125000000000000", 1); // 1 Token = 0.08 USDC

                const userPurchasedAmounts = {
                    [user0.address]: expandTo18Decimals(100, 6),
                    [user1.address]: expandTo18Decimals(200, 6),
                    [user2.address]: expandTo18Decimals(300, 6),
                    [user3.address]: expandTo18Decimals(600, 6),
                    [user4.address]: expandTo18Decimals(450, 6),
                    [user5.address]: expandTo18Decimals(400, 6),
                }

                await usdc.connect(user0).approve(dwVault.address, userPurchasedAmounts[user0.address]);
                await usdc.connect(user1).approve(dwVault.address, userPurchasedAmounts[user1.address]);
                await usdc.connect(user2).approve(dwVault.address, userPurchasedAmounts[user2.address]);
                await usdc.connect(user3).approve(dwVault.address, userPurchasedAmounts[user3.address]);
                await usdc.connect(user4).approve(dwVault.address, userPurchasedAmounts[user4.address]);
                await usdc.connect(user5).approve(dwVault.address, userPurchasedAmounts[user5.address]);

                await dwVault.connect(user0).buyTokenWithToken(usdc.address, user0.address, userPurchasedAmounts[user0.address]);
                await dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, userPurchasedAmounts[user1.address]);
                await dwVault.connect(user2).buyTokenWithToken(usdc.address, user2.address, userPurchasedAmounts[user2.address]);
                await dwVault.connect(user3).buyTokenWithToken(usdc.address, user3.address, userPurchasedAmounts[user3.address]);
                await dwVault.connect(user4).buyTokenWithToken(usdc.address, user4.address, userPurchasedAmounts[user4.address]);
                await dwVault.connect(user5).buyTokenWithToken(usdc.address, user5.address, userPurchasedAmounts[user5.address]);

                // Expect to receive 2100$ after two users purchased successfully
                const fundReceiverBalance = await usdc.balanceOf(fundReceiver.address);
                expect(fundReceiverBalance).to.be.equals(expandTo18Decimals(100 + 200 + 300 + 600 + 450 + 400, 6));

                await time.increaseTo(openTime + sellDuration);

                await dwVault.connect(user0).claim(user0.address);
                await dwVault.connect(user1).claim(user1.address);
                await dwVault.connect(user2).claim(user2.address);
                await dwVault.connect(user3).claim(user3.address);
                await dwVault.connect(user4).claim(user4.address);
                await dwVault.connect(user5).claim(user5.address);

                return { dwVault, ddxVault, oracle, usdc, dwStaking, token, user0, user1, user2, user3, user4, user5, fundReceiver };
            };

            it.only("User not able to claim if stills in cliff time", async () => {
                const { dwVault, token, user0, user1, user2, user3, user4, user5 } = await loadFixture(deployPreSetupForVesting);
                console.log(await time.latest(), await dwVault.vestingSchedules(user1.address));
                expect(await dwVault.releasableAmount(user1.address)).to.be.equals(0);

                await time.increaseTo(openTime + sellDuration + 2 * MONTH_IN_SECONDS);
                expect(await dwVault.releasableAmount(user1.address)).to.be.equals(0);
            })

            it("User able to claim after cliff time", async () => {
                const { dwVault, token, user0, user1, user2, user3, user4, user5 } = await loadFixture(deployPreSetupForVesting);
                await time.increaseTo(openTime + sellDuration + lockBeforeVesting + MONTH_IN_SECONDS);

                // It should be 100 because TGE already has been paid
                expect(await dwVault.releasableAmount(user1.address)).to.be.equals(expandTo18Decimals(200));

                const balanceBefore = await token.balanceOf(user1.address);

                await expect(dwVault.connect(user1).release()).to.be.emit(dwVault, "TokenReleased").withArgs(
                    user1.address,
                    expandTo18Decimals(200)
                );

                const balanceAfter = await token.balanceOf(user1.address);
                expect(balanceAfter).to.be.equals(balanceBefore.add(expandTo18Decimals(200)))

                await time.increaseTo(openTime + sellDuration + lockBeforeVesting + 2 * MONTH_IN_SECONDS);

                await expect(dwVault.connect(user1).release()).to.be.emit(dwVault, "TokenReleased").withArgs(
                    user1.address,
                    expandTo18Decimals(200)
                );
            })
        });
    });

    describe('Staking', async () => {
        async function deployPreSetupForStaking() {
            const { pancakePair, dwOracle, pancakeRouter, dwStaking, ddxStaking, ddxVault, dwVault, ddxToken, token, usdc, usdt, oracle, treasury, user1, user2, user3, user4, user5, user0, user6, fundReceiver, owner } = await loadFixture(deployFixedStakingProtocol);

            await time.increaseTo(openTime);

            // Approve a certain amount of tokens to vault
            await token.connect(treasury).approve(dwVault.address, expandTo18Decimals(1000000000));

            // 1 token = 0.08 USDC
            await dwVault.setOfferedCurrency(usdc.address, "125000000000000", 1); // 1 Token = 0.08 USDC

            const userPurchasedAmounts = {
                [user0.address]: expandTo18Decimals(100, 6),
                [user1.address]: expandTo18Decimals(200, 6),
                [user2.address]: expandTo18Decimals(300, 6),
                [user3.address]: expandTo18Decimals(600, 6),
                [user4.address]: expandTo18Decimals(450, 6),
                [user5.address]: expandTo18Decimals(400, 6),
                [user6.address]: expandTo18Decimals(8000, 6),
            }

            await usdc.connect(user0).approve(dwVault.address, userPurchasedAmounts[user0.address]);
            await usdc.connect(user1).approve(dwVault.address, userPurchasedAmounts[user1.address]);
            await usdc.connect(user2).approve(dwVault.address, userPurchasedAmounts[user2.address]);
            await usdc.connect(user3).approve(dwVault.address, userPurchasedAmounts[user3.address]);
            await usdc.connect(user4).approve(dwVault.address, userPurchasedAmounts[user4.address]);
            await usdc.connect(user5).approve(dwVault.address, userPurchasedAmounts[user5.address]);
            await usdc.connect(user6).approve(dwVault.address, userPurchasedAmounts[user6.address]);

            await dwVault.connect(user0).buyTokenWithToken(usdc.address, user0.address, userPurchasedAmounts[user0.address]);
            await dwVault.connect(user1).buyTokenWithToken(usdc.address, user1.address, userPurchasedAmounts[user1.address]);
            await dwVault.connect(user2).buyTokenWithToken(usdc.address, user2.address, userPurchasedAmounts[user2.address]);
            await dwVault.connect(user3).buyTokenWithToken(usdc.address, user3.address, userPurchasedAmounts[user3.address]);
            await dwVault.connect(user4).buyTokenWithToken(usdc.address, user4.address, userPurchasedAmounts[user4.address]);
            await dwVault.connect(user5).buyTokenWithToken(usdc.address, user5.address, userPurchasedAmounts[user5.address]);
            await dwVault.connect(user6).buyTokenWithToken(usdc.address, user6.address, userPurchasedAmounts[user6.address]);

            // Expect to receive 2100$ after two users purchased successfully
            const fundReceiverBalance = await usdc.balanceOf(fundReceiver.address);
            expect(fundReceiverBalance).to.be.equals(expandTo18Decimals(100 + 200 + 300 + 600 + 450 + 400 + 8000, 6));

            await time.increaseTo(openTime + sellDuration);

            await dwVault.connect(user0).claim(user0.address); // 1
            await dwVault.connect(user1).claim(user1.address); // 2
            await dwVault.connect(user2).claim(user2.address); // 3
            await dwVault.connect(user3).claim(user3.address); // 4
            await dwVault.connect(user4).claim(user4.address); // 5
            await dwVault.connect(user5).claim(user5.address); // 6
            await dwVault.connect(user6).claim(user6.address); // 7

            // await time.increaseTo(openTime + sellDuration + lockBeforeVesting + MONTH_IN_SECONDS);


            // await expect(dwVault.connect(user1).release()).to.be.emit(dwVault, "TokenReleased").withArgs(
            //     user1.address,
            //     expandTo18Decimals(100)
            // );

            // await expect(dwVault.connect(user2).release()).to.be.emit(dwVault, "TokenReleased").withArgs(
            //     user2.address,
            //     expandTo18Decimals(150)
            // );

            // await expect(dwVault.connect(user3).release()).to.be.emit(dwVault, "TokenReleased").withArgs(
            //     user3.address,
            //     expandTo18Decimals(300)
            // );

            return { owner, pancakePair, dwOracle, pancakeRouter, ddxToken, dwVault, ddxVault, ddxStaking, oracle, usdc, usdt, dwStaking, token, user0, user1, user2, user3, user4, user5, user6, fundReceiver };
        };

        it("✅ User able to deposit successfully using pending vesting token", async () => {
            const { dwStaking, token, user1, user2, user3, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user1).approve(dwVault.address, expandTo18Decimals(100000000));
            await token.connect(user2).approve(dwVault.address, expandTo18Decimals(100000000));

            await expect(dwVault.connect(user1).stakeWithVault(
                0,
                expandTo18Decimals(2000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user1.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6),
                anyValue
            );

            const stakingContract = await dwStaking.stakingContracts(0);

            expect(stakingContract.totalExpectedInterest).to.be.equals(expandTo18Decimals(200, 6));
            expect(stakingContract.totalStakesInUSD).to.be.equals(expandTo18Decimals(100, 6));

            // User 2 choose stake with 2500 tokens
            await expect(dwVault.connect(user2).stakeWithVault(
                0,
                expandTo18Decimals(2500),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                1,
                user2.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2500),
                expandTo18Decimals(125, 6),
                anyValue
            );

            const stakingContractOfUser2 = await dwStaking.stakingContracts(1);

            expect(stakingContractOfUser2.totalStakesInUSD).to.be.equals(expandTo18Decimals(125, 6));
            expect(stakingContractOfUser2.totalExpectedInterest).to.be.equals(expandTo18Decimals(250, 6));
        })

        it("✅ User will receive DDX as extra reward when deposit successfully", async () => {
            const { ddxToken, ddxVault, dwStaking, token, user1, user2, user3, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user1).approve(dwVault.address, expandTo18Decimals(100000000));
            await token.connect(user2).approve(dwVault.address, expandTo18Decimals(100000000));

            await expect(dwVault.connect(user1).stakeWithVault(
                0,
                expandTo18Decimals(2000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user1.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6),
                anyValue
            );

            // User 2 choose stake with 2500 tokens
            await expect(dwVault.connect(user2).stakeWithVault(
                0,
                expandTo18Decimals(2500),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                1,
                user2.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2500),
                expandTo18Decimals(125, 6),
                anyValue
            );

            const user2DDXVestingSchedule = await ddxVault.getVestingScheduleByAddressAndIndex(user2.address, 0);
            expect(user2DDXVestingSchedule.amountTotal).to.be.equals(expandTo18Decimals(15625, 18));
            expect(user2DDXVestingSchedule.start).to.be.equals(ddxStartVestingTime);
        })

        it("✅ User will receive DDX as compounded extra reward when deposit successfully", async () => {
            const { ddxVault, dwStaking, token, user1, user2, user3, user6, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user6).approve(dwVault.address, expandTo18Decimals(100000000));

            await expect(dwVault.connect(user6).stakeWithVault(
                expandTo18Decimals(1000),
                expandTo18Decimals(2000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user6.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(3000),
                expandTo18Decimals(150, 6)
            );

            await expect(dwVault.connect(user6).stakeWithVault(
                expandTo18Decimals(0),
                expandTo18Decimals(4000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                1,
                user6.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(4000),
                expandTo18Decimals(200, 6)
            );

            const user6DDXVestingSchedule = await ddxVault.getVestingScheduleByAddressAndIndex(user6.address, 0);
            expect(user6DDXVestingSchedule.amountTotal).to.be.equals(expandTo18Decimals(43750, 18));
            expect(user6DDXVestingSchedule.start).to.be.equals(ddxStartVestingTime);
        })

        it("✅ User vesting details needs to be updated correspondingly after staking", async () => {
            const { dwStaking, token, user1, user2, user3, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user1).approve(dwVault.address, expandTo18Decimals(100000000));
            await token.connect(user2).approve(dwVault.address, expandTo18Decimals(100000000));

            await expect(dwVault.connect(user1).stakeWithVault(
                0,
                expandTo18Decimals(2000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user1.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            );

            const stakingContract = await dwStaking.stakingContracts(0);

            expect(stakingContract.totalExpectedInterest).to.be.equals(expandTo18Decimals(200, 6));
            expect(stakingContract.totalStakesInUSD).to.be.equals(expandTo18Decimals(100, 6));

            // User 2 choose stake with 2500 tokens
            await expect(dwVault.connect(user2).stakeWithVault(
                0,
                expandTo18Decimals(2500),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                1,
                user2.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2500),
                expandTo18Decimals(125, 6)
            );

            const stakingContractOfUser2 = await dwStaking.stakingContracts(1);

            expect(stakingContractOfUser2.totalStakesInUSD).to.be.equals(expandTo18Decimals(125, 6));
            expect(stakingContractOfUser2.totalExpectedInterest).to.be.equals(expandTo18Decimals(250, 6));

            const user1VestingDetails = await dwVault.vestingSchedules(user1.address);
            expect(user1VestingDetails.amountTotal).to.be.equals(0);

            const user2VestingDetails = await dwVault.vestingSchedules(user2.address);
            expect(user2VestingDetails.amountTotal).to.be.equals(expandTo18Decimals(500));
        })

        it("✅ User able to deposit successfully using pending vesting token and normal token", async () => {
            const { dwStaking, token, user1, user2, user3, user6, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user6).approve(dwVault.address, expandTo18Decimals(100000000));

            await expect(dwVault.connect(user6).stakeWithVault(
                expandTo18Decimals(1000),
                expandTo18Decimals(2000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user6.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(3000),
                expandTo18Decimals(150, 6)
            ).to.be.emit(token, "Transfer").withArgs(
                dwStaking.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(1000)
            );

            const stakingContract = await dwStaking.stakingContracts(0);

            expect(stakingContract.totalExpectedInterest).to.be.equals(expandTo18Decimals(300, 6));
            expect(stakingContract.totalStakesInUSD).to.be.equals(expandTo18Decimals(150, 6));
        })

        it("✅ User not able to deposit if the amount not surpass 100$", async () => {
            const { dwStaking, token, user1, user2, user3, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user1).approve(dwVault.address, expandTo18Decimals(100000000));
            await token.connect(user2).approve(dwVault.address, expandTo18Decimals(100000000));

            await expect(dwVault.connect(user1).stakeWithVault(
                0,
                expandTo18Decimals(1000),
                ethers.constants.AddressZero
            )).to.be.revertedWith("pool: minimum staking amount not reached");

            // User 2 choose stake with 2500 tokens
            await expect(dwVault.connect(user2).stakeWithVault(
                0,
                expandTo18Decimals(1800),
                ethers.constants.AddressZero
            )).to.be.rejectedWith("pool: minimum staking amount not reached");
        })

        it("✅ User not able to deposit using vesting amount after vesting time started", async () => {
            const { dwStaking, token, user1, user2, user3, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user1).approve(dwVault.address, expandTo18Decimals(100000000));
            await token.connect(user2).approve(dwVault.address, expandTo18Decimals(100000000));

            await time.increaseTo(openTime + sellDuration + lockBeforeVesting);

            await expect(dwVault.connect(user1).stakeWithVault(
                0,
                expandTo18Decimals(1000),
                ethers.constants.AddressZero
            )).to.be.revertedWith("pool: not allow to stake after vesting start");

            // User 2 choose stake with 2500 tokens
            await expect(dwVault.connect(user2).stakeWithVault(
                0,
                expandTo18Decimals(1800),
                ethers.constants.AddressZero
            )).to.be.rejectedWith("pool: not allow to stake after vesting start");
        })

        it("✅ User able to deposit and earn interest with 200%", async () => {
            const { dwStaking, token, user1, user2, user3, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user1).approve(dwVault.address, expandTo18Decimals(100000000)); // 8
            await token.connect(user2).approve(dwVault.address, expandTo18Decimals(100000000)); // 9

            await expect(dwVault.connect(user1).stakeWithVault(
                0,
                expandTo18Decimals(2000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user1.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2000),
                expandTo18Decimals(100, 6)
            ); // 10

            // User 2 choose stake with 2500 tokens
            await expect(dwVault.connect(user2).stakeWithVault(
                0,
                expandTo18Decimals(2500),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                1,
                user2.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2500),
                expandTo18Decimals(125, 6)
            ); // 11

            const stakingContract = await dwStaking.stakingContracts(0);

            expect(stakingContract.totalExpectedInterest).to.be.equals(expandTo18Decimals(200, 6));
            expect(stakingContract.totalStakesInUSD).to.be.equals(expandTo18Decimals(100, 6));

            // Increase to 2 months after
            await time.increaseTo(openTime + sellDuration + 2 * MONTH_IN_SECONDS);

            let pendingRewardInUSD = await dwStaking.pendingRewardInUSD(0);
            expect(pendingRewardInUSD).to.be.equals(19999961);

            // Increase to 20 months after
            await time.increaseTo(openTime + sellDuration + 10 + 20 * MONTH_IN_SECONDS);

            pendingRewardInUSD = await dwStaking.pendingRewardInUSD(0);
            expect(pendingRewardInUSD).to.be.equals(expandTo18Decimals(200, 6));

            await time.increaseTo(openTime + sellDuration + 11 + 20 * MONTH_IN_SECONDS);

            pendingRewardInUSD = await dwStaking.pendingRewardInUSD(1);
        })

        it("✅ User able to claim interest", async () => {
            const { dwStaking, token, user1, user2, user3, user6, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user6).approve(dwVault.address, expandTo18Decimals(100000000)); // 8

            await expect(dwVault.connect(user6).stakeWithVault(
                expandTo18Decimals(1000),
                expandTo18Decimals(2000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user6.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(3000),
                expandTo18Decimals(150, 6)
            ); // 9

            await expect(dwVault.connect(user6).stakeWithVault(
                0,
                expandTo18Decimals(2500),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                1,
                user6.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2500),
                expandTo18Decimals(125, 6)
            ); // 10

            // Increase to 2 months after
            await time.increaseTo(openTime + sellDuration + 2 * MONTH_IN_SECONDS);

            const balanceBefore = await token.balanceOf(user6.address);

            await expect(dwStaking.connect(user6).claimMultipleRewards([
                0, 1
            ])).to.be.emit(dwStaking, "RewardHarvested").withArgs(
                0,
                user6.address,
                "599999060000000000000",
                "29999953"
            ).to.be.emit(dwStaking, "RewardHarvested").withArgs(
                1,
                user6.address,
                "499999120000000000000",
                "24999956"
            );

            const balanceAfter = await token.balanceOf(user6.address);
            expect(balanceAfter).to.be.equals(balanceBefore.add(expandTo18Decimals("499999120000000000000", 0)).add("599999060000000000000", 0))

            const stakingContract = await dwStaking.stakingContracts(0);
            const stakingContract1 = await dwStaking.stakingContracts(1);

            expect(stakingContract.lastClaimedTime).to.be.equals(openTime + sellDuration + 2 * MONTH_IN_SECONDS + 1)
            expect(stakingContract1.lastClaimedTime).to.be.equals(openTime + sellDuration + 2 * MONTH_IN_SECONDS + 1)
        })

        it("✅ User not to claim interest from other contracts", async () => {
            const { dwStaking, token, user1, user2, user3, user6, dwVault } = await loadFixture(deployPreSetupForStaking);

            await token.connect(user6).approve(dwVault.address, expandTo18Decimals(100000000)); // 8

            await expect(dwVault.connect(user6).stakeWithVault(
                expandTo18Decimals(1000),
                expandTo18Decimals(2000),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user6.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(3000),
                expandTo18Decimals(150, 6)
            ); // 9

            await expect(dwVault.connect(user6).stakeWithVault(
                0,
                expandTo18Decimals(2500),
                ethers.constants.AddressZero
            )).to.be.emit(dwStaking, "ContractCreated").withArgs(
                1,
                user6.address,
                token.address,
                ethers.constants.AddressZero,
                expandTo18Decimals(2500),
                expandTo18Decimals(125, 6)
            ); // 10

            // Increase to 2 months after
            await time.increaseTo(openTime + sellDuration + 2 * MONTH_IN_SECONDS);

            await expect(dwStaking.connect(user1).claimMultipleRewards([
                0
            ])).to.be.revertedWith("pool: contract id not belongs to this owner");
        })

        xit("✅ User able to deposit successfully with oracle", async () => {
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

        xit("✅ User able to deposit successfully and using referrer", async () => {
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
            const { dwStaking, ddxToken, ddxVault, usdc, usdt, token, user1, user2 } = await loadFixture(deployFixedStakingProtocol);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(3000));
            await ddxToken.connect(user1).approve(ddxVault.address, expandTo18Decimals(3000));

            await dwStaking.setAllowedStakeToken(usdt.address);
            await dwStaking.setAllowedStakeToken(usdc.address);
            await dwStaking.setOfferedCurrency(usdc.address, 1, 0);
            await dwStaking.setOfferedCurrency(usdt.address, 1, 0);

            await usdc.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000, 6));
            await usdt.connect(user1).approve(dwStaking.address, expandTo18Decimals(2000, 6));

            await expect(
                dwStaking.connect(user1).deposit(expandTo18Decimals(2000, 6), usdt.address, user2.address)
            ).to.be.emit(dwStaking, "ContractCreated").withArgs(
                0,
                user1.address,
                usdt.address,
                user2.address,
                expandTo18Decimals(2000, 6),
                expandTo18Decimals(2000, 6),
                expandTo18Decimals(2000, 6),
                anyValue
            );

            const stakingInfo = await dwStaking.stakingContracts(0);
            expect(stakingInfo.totalStakesInUSD).to.be.equals(expandTo18Decimals(2000, 6));

            await ddxVault.connect(user1).stakeWithVault(0, 0, expandTo18Decimals(12500, 18));
        })

        xit("❌ User not able to deposit using referrer twice", async () => {
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

        xit("✅ Ancestor user able to receive direct interest using referrer", async () => {
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

        xit("✅ Estimated Interest earn testing", async () => {
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

        xit("✅ User can claim reward by seconds", async () => {
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
            const { pancakePair, dwOracle, usdt, pancakeRouter, dwStaking, oracle, token, user1, user2, owner } = await loadFixture(deployPreSetupForStaking);

            await dwStaking.setAssetOracle(token.address, dwOracle.address);

            await token.connect(user1).approve(dwStaking.address, expandTo18Decimals(5000));
            await token.connect(user2).approve(dwStaking.address, expandTo18Decimals(5000));

            // console.log("balance: ", await token.balanceOf(user1.address));

            await dwStaking.connect(user1).deposit(expandTo18Decimals(500), token.address, user2.address)

            await time.increase(60 * 60); // Increase 1 hour

            // Manual conversion rate: 1 Token = 0.05 USDC, but inside oracle is 1 token = 50 USDC
            // => so oracle will take the priority
            const stakingInfo = await dwStaking.stakingContracts(0);

            let dwPrice = await dwOracle.price0Average();

            expect(stakingInfo.totalStakesInUSD).to.be.equals(expandTo18Decimals(24999999999, 0)); // 25000 USD
            expect(stakingInfo.totalExpectedInterest).to.be.equals(expandTo18Decimals(49999999998, 0)); // 50000 USD

            await expect(dwStaking.connect(user1).claimReward(0)).to.be.emit(dwStaking, "RewardHarvested").withArgs(
                0,
                user1.address,
                expandTo18DecimalsRaw(3473186, 0).mul(dwPrice.toString()).div(BigNumber.from(2).pow(112)).toString(),
                expandTo18DecimalsRaw(3473186, 0)
            );

            await time.increase(60 * 60); // Increase 1 hour

            await expect(
                pancakeRouter.swapExactTokensForTokens(
                    expandTo18Decimals(10000, 18),
                    0,
                    [token.address, usdt.address],
                    owner.address,
                    (await time.latest() + 3600)
                )
            ).to.be.emit(pancakePair, "Swap").withArgs(
                pancakeRouter.address,
                0,
                expandTo18Decimals(10000, 18),
                475056554351,
                0,
                owner.address
            )

            await time.increase(10 * 60); // Increase 10 minutes 
            await dwOracle.update();

            // console.log("price: ", await dwOracle.price0Average(), await dwOracle.price1Average());

            // await expect(dwStaking.connect(user1).claimReward(0)).to.be.emit(dwStaking, "RewardHarvested").withArgs(
            //     0,
            //     user1.address,
            //     expandTo18DecimalsRaw(3473186, 0).mul(dwPrice.toString()).div(BigNumber.from(2).pow(112)).toString(),
            //     expandTo18DecimalsRaw(3473186, 0)
            // );

            // await expect(dwStaking.connect(user1).claimReward()).to.be.emit(dwStaking, "RewardHarvested").withArgs(
            //     user1.address,
            //     expandTo18DecimalsRaw(1111728, 0).mul(10).div(2).mul(expandTo18Decimals(10, 18)).div(expandTo18Decimals(10, 6)),
            //     expandTo18DecimalsRaw(1111728, 0)
            // );
        })

        xit("❌ User interest cannot surpass 200%", async () => {
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
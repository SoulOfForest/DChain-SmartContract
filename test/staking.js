const { time, constants, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const { contractSizer } = require("../hardhat.config");

function expandTo18Decimals(n) {
    return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

function getInvestInterest(n) {
    
    if (n >= 100 && n < 16100) {
        return 0.06;
    } else if (n < 60100) {
        return 0.07;
    } else if (n < 160000) {
        return 0.08;
    } else if (n < 310000) {
        return 0.1;
    }
    return 0.12;
}

function getInviteInterest(numberOfF1, level) {
    if (numberOfF1 >= 1 && level == 1) {
        return 0.05;
    } else if (numberOfF1 >= 2 && level == 2) {
        return 0.03;
    } else if (numberOfF1 >= 2 && level == 3) {
        return 0.01;
    } else if (numberOfF1 >= 3 && level == 4) {
        return 0.005;
    } else if (numberOfF1 >= 3 && level == 5) {
        return 0.005;
    } else if (numberOfF1 >= 4 && level == 6) {
        return 0.01;
    } else if (numberOfF1 >= 4 && level == 7) {
        return 0.01;
    } else if (numberOfF1 >= 6 && level == 8) {
        return 0.03;
    }

    return 0.05;
}

function getCommissionInterest(amountInvest, numberOfF1, level) {
    if (numberOfF1 >= 1 && level == 1 && amountInvest >= 1000) {
        return 0.1;
    } else if (numberOfF1 >= 2 && level == 2 && amountInvest >= 16100) {
        return 0.05;
    } else if (numberOfF1 >= 2 && level == 3 && amountInvest >= 16100) {
        return 0.03;
    } else if (numberOfF1 >= 3 && level == 4 && amountInvest >= 60100) {
        return 0.01;
    } else if (numberOfF1 >= 3 && level == 5 && amountInvest >= 60100) {
        return 0.01;
    } else if (numberOfF1 >= 4 && level == 6 && amountInvest >= 160000) {
        return 0.02;
    } else if (numberOfF1 >= 4 && level == 7 && amountInvest >= 160000) {
        return 0.03;
    } else if (numberOfF1 >= 6 && level == 8 && amountInvest >= 310000) {
        return 0.04;
    }

    return 0.05;
}

const ONE_DAY_IN_SECS = 24 * 60 * 60;

const DECIMAL = 10 ** 18;
const ZERO_AMOUNT = expandTo18Decimals(0);
const ONE_MILLION = expandTo18Decimals(1000000);
const ZERO_ADDRESS = ethers.constants.AddressZero;

const uset1_stake = 400000;

const uset2_stake = 10000; // 500
const uset3_stake = 20000; // 600
const uset4_stake = 30000; // 300
const uset5_stake = 40000; // 200
const uset6_stake = 50000; // 250
const uset7_stake = 80000; // 800
const uset8_stake = 100000; // 1000
const uset9_stake = 200000; // 6000
const uset10_stake = 300000; // 15000

// 500 + 600 + 300 + 200 + 250 + 800 + 1000 + 6000 + 15000 ----- F1 referral interest

const USER1_STAKE = expandTo18Decimals(uset1_stake); // f0
const USER2_STAKE = expandTo18Decimals(uset2_stake); // f1-f0 ---- type 1

const USER3_STAKE = expandTo18Decimals(uset3_stake); // f2-f1-f0 ---- type 2
const USER4_STAKE = expandTo18Decimals(uset4_stake); // f3-f2-f1-f0 ---- type 2
const USER5_STAKE = expandTo18Decimals(uset5_stake); // f4-f3-f2-f1-f0 ---- type 2
const USER6_STAKE = expandTo18Decimals(uset6_stake); // f5-f4-f3-f2-f1-f0 ---- type 2
const USER7_STAKE = expandTo18Decimals(uset7_stake); // f6-f5-f4-f3-f2-f1-f0 ---- type 3
const USER8_STAKE = expandTo18Decimals(uset8_stake); // f7-f6-f5-f4-f3-f2-f1-f0 ---- type 3
const USER9_STAKE = expandTo18Decimals(uset9_stake); // f8-f7-f6-f5-f4-f3-f2-f1-f0 ---- type 5
const USER10_STAKE = expandTo18Decimals(uset10_stake); // f9-f8-f7-f6-f5-f4-f3-f2-f1-f0 ---- type 5

const eightF1SameStake = 10000;
const eightF1Claimed = eightF1SameStake * 0.05 * 8;
const USER11_STAKE = expandTo18Decimals(eightF1SameStake);
const USER12_STAKE = expandTo18Decimals(eightF1SameStake);
const USER13_STAKE = expandTo18Decimals(eightF1SameStake);
const USER14_STAKE = expandTo18Decimals(eightF1SameStake);
const USER15_STAKE = expandTo18Decimals(eightF1SameStake);
const USER16_STAKE = expandTo18Decimals(eightF1SameStake);
const USER17_STAKE = expandTo18Decimals(eightF1SameStake);
const USER18_STAKE = expandTo18Decimals(eightF1SameStake);

describe("Staking", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.

    async function deployContract() {
        // const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

        // Contracts are deployed using the first signer/account by default
        const [
            owner,
            account1,
            account2,
            account3,
            account4,
            account5,
            account6,
            account7,
            account8,
            account9,
            account10,
            account11,
            account12,
            account13,
            account14,
            account15,
            account16,
            account17,
            account18,
        ] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token");
        const token = await Token.deploy("TokenABC", "ABC");

        const Staking = await ethers.getContractFactory("NikaStaking");
        const staking = await Staking.deploy(owner.address, token.address);

        await token.connect(owner).approve(staking.address, expandTo18Decimals(10000000000000));

        await token.connect(owner).transfer(account1.address, ONE_MILLION);
        await token.connect(owner).transfer(account2.address, ONE_MILLION);
        await token.connect(owner).transfer(account3.address, ONE_MILLION);
        await token.connect(owner).transfer(account4.address, ONE_MILLION);
        await token.connect(owner).transfer(account5.address, ONE_MILLION);
        await token.connect(owner).transfer(account6.address, ONE_MILLION);
        await token.connect(owner).transfer(account7.address, ONE_MILLION);
        await token.connect(owner).transfer(account8.address, ONE_MILLION);
        await token.connect(owner).transfer(account9.address, ONE_MILLION);
        await token.connect(owner).transfer(account10.address, ONE_MILLION);
        await token.connect(owner).transfer(account11.address, ONE_MILLION);
        await token.connect(owner).transfer(account12.address, ONE_MILLION);
        await token.connect(owner).transfer(account13.address, ONE_MILLION);
        await token.connect(owner).transfer(account14.address, ONE_MILLION);
        await token.connect(owner).transfer(account15.address, ONE_MILLION);
        await token.connect(owner).transfer(account16.address, ONE_MILLION);
        await token.connect(owner).transfer(account17.address, ONE_MILLION);
        await token.connect(owner).transfer(account18.address, ONE_MILLION);

        await token.connect(account1).approve(staking.address, USER1_STAKE);
        await token.connect(account2).approve(staking.address, USER2_STAKE);
        await token.connect(account3).approve(staking.address, USER3_STAKE);
        await token.connect(account4).approve(staking.address, USER4_STAKE);
        await token.connect(account5).approve(staking.address, USER5_STAKE);
        await token.connect(account6).approve(staking.address, USER6_STAKE);
        await token.connect(account7).approve(staking.address, USER7_STAKE);
        await token.connect(account8).approve(staking.address, USER8_STAKE);
        await token.connect(account9).approve(staking.address, USER9_STAKE);
        await token.connect(account10).approve(staking.address, USER10_STAKE);

        await token.connect(account11).approve(staking.address, USER11_STAKE);
        await token.connect(account12).approve(staking.address, USER12_STAKE);
        await token.connect(account13).approve(staking.address, USER13_STAKE);
        await token.connect(account14).approve(staking.address, USER14_STAKE);
        await token.connect(account15).approve(staking.address, USER15_STAKE);
        await token.connect(account16).approve(staking.address, USER16_STAKE);
        await token.connect(account17).approve(staking.address, USER17_STAKE);
        await token.connect(account18).approve(staking.address, USER18_STAKE);

        await staking.connect(account1).deposit(USER1_STAKE, ZERO_ADDRESS);
        await staking.connect(account11).deposit(USER11_STAKE, account1.address);
        await staking.connect(account12).deposit(USER12_STAKE, account1.address);
        await staking.connect(account13).deposit(USER13_STAKE, account1.address);
        await staking.connect(account14).deposit(USER14_STAKE, account1.address);
        await staking.connect(account15).deposit(USER15_STAKE, account1.address);
        await staking.connect(account16).deposit(USER16_STAKE, account1.address);
        await staking.connect(account17).deposit(USER17_STAKE, account1.address);
        await staking.connect(account18).deposit(USER18_STAKE, account1.address);

        return {
            token,
            staking,
            owner,
            account1,
            account2,
            account3,
            account4,
            account5,
            account6,
            account7,
            account8,
            account9,
            account10,
        };
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const { token, staking, owner } = await loadFixture(deployContract);

            expect(await staking.owner()).to.equal(owner.address);
            expect(await token.owner()).to.equal(owner.address);
        });
    });

    describe("Deposit", function () {
        describe("Normal Deposit", function () {
            //   it("Should deposits", async function () {
            //     const { token, staking, owner, account1 } = await loadFixture(
            //       deployContract
            //     );

            //     await token.connect(account1).approve(staking.address, USER1_STAKE);
            //     await staking
            //       .connect(account1)
            //       .deposit(USER1_STAKE, account1.address, ZERO_ADDRESS);

            //     let user_1 = await staking.getUserInformation(account1.address);

            //     expect(await user_1.totalStakes).to.be.equal(USER1_STAKE);
            //   });

            it("Should not deposits if amount is zero", async function () {
                const { token, staking, owner, account1 } = await loadFixture(deployContract);

                await token.connect(account1).approve(staking.address, USER1_STAKE);
                await expect(staking.connect(account1).deposit(ZERO_AMOUNT, ZERO_ADDRESS)).to.be.revertedWith("pool: amount cannot be zero");
            });

            // it("Should not deposits if address is zero", async function () {
            //     const { token, staking, owner, account1 } = await loadFixture(deployContract);

            //     await token.connect(account1).approve(staking.address, USER1_STAKE);
            //     await expect(staking.connect(account1).deposit(USER1_STAKE, ZERO_ADDRESS)).to.be.revertedWith("pool: stake address cant not be zero address");
            // });
        });

        describe("Deposits and Claims with referrals", function () {
            it("Should deposits and claims with referrals", async function () {
                const { token, staking, owner, account1, account2, account3, account4, account5, account6, account7, account8, account9, account10 } = await loadFixture(deployContract);

                /// -----------------------------------
                /// -------- account 2 Deposit --------
                /// -----------------------------------

                //await staking.connect(account2).deposit(USER2_STAKE, account1.address);
                await expect(staking.connect(account2).deposit(USER2_STAKE, account1.address))
                    .to.emit(staking, "ReferralLevelAdded")
                    .withArgs(account2.address, account1.address, 1);

                let totalF1OfUser1 = await staking.totalReferralInvitations(account1.address);
                let user1_info = await staking.getUserInformation(account1.address);
                let interest_user1 = getInviteInterest(totalF1OfUser1, 1);
                let user1_claimed_cumulative = uset2_stake * interest_user1 + eightF1Claimed;
                let user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                // console.log(user1_info)

                
                expect(await staking.referralLevels(account2.address)).to.be.equal(account1.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);
                expect(totalF1OfUser1).to.be.equal(9);

                /// -----------------------------------
                /// -------- account 3 Deposit --------
                /// -----------------------------------

                await staking.connect(account3).deposit(USER3_STAKE, account2.address);

                // await expect(staking.connect(account3).deposit(USER3_STAKE, account2.address))
                //     .to.emit(staking, "ReferralLevelAdded")
                //     .withArgs(account3.address, account2.address, 2);

                user1_info = await staking.getUserInformation(account1.address);
                interest_user1 = getInviteInterest(totalF1OfUser1, 2);
                user1_claimed_cumulative = uset3_stake * interest_user1 + user1_claimed_cumulative;
                user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                let totalF1OfUser2 = await staking.totalReferralInvitations(account2.address);
                let user2_info = await staking.getUserInformation(account2.address);
                let interest_user2 = getInviteInterest(totalF1OfUser2, 1);
                let user2_claimed_cumulative = uset3_stake * interest_user2;
                let user2_claimed_BN = expandTo18Decimals(user2_claimed_cumulative);

                expect(await staking.referralLevels(account3.address)).to.be.equal(account2.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);
                expect(user2_info.totalClaimed).to.be.equal(user2_claimed_BN);

                /// -----------------------------------
                /// -------- account 4 Deposit --------
                /// -----------------------------------

                await staking.connect(account4).deposit(USER4_STAKE, account3.address);

                user1_info = await staking.getUserInformation(account1.address);

                interest_user1 = getInviteInterest(totalF1OfUser1, 3);
                user1_claimed_cumulative = uset4_stake * interest_user1 + user1_claimed_cumulative;
                user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                let totalF1OfUser3 = await staking.totalReferralInvitations(account3.address);
                let user3_info = await staking.getUserInformation(account3.address);
                let interest_user3 = getInviteInterest(totalF1OfUser3, 1);
                let user3_claimed_cumulative = uset4_stake * interest_user3;
                let user3_claimed_BN = expandTo18Decimals(user3_claimed_cumulative);

                expect(await staking.referralLevels(account4.address)).to.be.equal(account3.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);
                expect(user2_info.totalClaimed).to.be.equal(user2_claimed_BN);
                expect(user3_info.totalClaimed).to.be.equal(user3_claimed_BN);

                /// -----------------------------------
                /// -------- account 5 Deposit --------
                /// -----------------------------------

                await staking.connect(account5).deposit(USER5_STAKE, account4.address);

                user1_info = await staking.getUserInformation(account1.address);
                interest_user1 = getInviteInterest(totalF1OfUser1, 4);
                user1_claimed_cumulative = uset5_stake * interest_user1 + user1_claimed_cumulative;
                user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                expect(await staking.referralLevels(account5.address)).to.be.equal(account4.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);

                /// -----------------------------------
                /// -------- account 6 Deposit --------
                /// -----------------------------------

                await staking.connect(account6).deposit(USER6_STAKE, account5.address);

                user1_info = await staking.getUserInformation(account1.address);
                interest_user1 = getInviteInterest(totalF1OfUser1, 5);
                user1_claimed_cumulative = uset6_stake * interest_user1 + user1_claimed_cumulative;
                user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                expect(await staking.referralLevels(account6.address)).to.be.equal(account5.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);

                /// -----------------------------------
                /// -------- account 7 Deposit --------
                /// -----------------------------------

                await staking.connect(account7).deposit(USER7_STAKE, account6.address);

                user1_info = await staking.getUserInformation(account1.address);
                interest_user1 = getInviteInterest(totalF1OfUser1, 6);
                user1_claimed_cumulative = uset7_stake * interest_user1 + user1_claimed_cumulative;
                user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                expect(await staking.referralLevels(account7.address)).to.be.equal(account6.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);

                /// -----------------------------------
                /// -------- account 8 Deposit --------
                /// -----------------------------------

                await staking.connect(account8).deposit(USER8_STAKE, account7.address);

                user1_info = await staking.getUserInformation(account1.address);
                interest_user1 = getInviteInterest(totalF1OfUser1, 7);
                user1_claimed_cumulative = uset8_stake * interest_user1 + user1_claimed_cumulative;
                user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                expect(await staking.referralLevels(account8.address)).to.be.equal(account7.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);

                /// -----------------------------------
                /// -------- account 9 Deposit --------
                /// -----------------------------------

                await staking.connect(account9).deposit(USER9_STAKE, account8.address);

                user1_info = await staking.getUserInformation(account1.address);
                interest_user1 = getInviteInterest(totalF1OfUser1, 8);
                user1_claimed_cumulative = uset9_stake * interest_user1 + user1_claimed_cumulative;
                user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                expect(await staking.referralLevels(account9.address)).to.be.equal(account8.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);

                /// -----------------------------------
                /// ------- account 10 Deposit --------
                /// -----------------------------------

                await staking.connect(account10).deposit(USER10_STAKE, account9.address);

                user1_info = await staking.getUserInformation(account1.address);
                interest_user1 = getInviteInterest(totalF1OfUser1, 9);
                user1_claimed_cumulative = uset10_stake * interest_user1 + user1_claimed_cumulative;
                user1_claimed_BN = expandTo18Decimals(user1_claimed_cumulative);

                expect(await staking.referralLevels(account10.address)).to.be.equal(account9.address);
                expect(user1_info.totalClaimed).to.be.equal(user1_claimed_BN);

                /// -----------------------------------
                /// --------- Claim Interest ----------
                /// -----------------------------------

                
                /// -----------------------------------
                /// --------- User10 Interest ---------
                /// -----------------------------------

                let user10_info = await staking.getUserInformation(account10.address);
                let user10LastTimeDeposited = parseInt(user10_info.lastTimeDeposited.toString()) + ONE_DAY_IN_SECS + 3600;
            
                let commissionInterest_user1 = getCommissionInterest(uset1_stake, totalF1OfUser1, 9);
                let interest_user10 = getInvestInterest(uset10_stake);
                let user10_totalClaimed = (uset10_stake * interest_user10 * 2) / 30;

                user1_claimed_cumulative += commissionInterest_user1 * user10_totalClaimed;

                time.increaseTo(user10LastTimeDeposited);
                await staking.connect(account10).claimReward();

                user10_info = await staking.getUserInformation(account10.address);
                user1_info = await staking.getUserInformation(account1.address);

                expect(user10_info.totalClaimed).to.be.equal(expandTo18Decimals(user10_totalClaimed));
                expect(user1_info.totalClaimed).to.be.equal(expandTo18Decimals(user1_claimed_cumulative));


                /// -----------------------------------
                /// ---------- User9 Interest ---------
                /// -----------------------------------
                
                let user9_info = await staking.getUserInformation(account9.address);
            
                commissionInterest_user1 = getCommissionInterest(uset1_stake, totalF1OfUser1, 8);
                let totalF1OfUser9 = await staking.totalReferralInvitations(account9.address);
                let interest_user9 = getInvestInterest(uset9_stake);
                let invite_interest_user9 = getInviteInterest(totalF1OfUser9, 1);
                let commissionInterest_user9 = getCommissionInterest(uset1_stake, totalF1OfUser9, 1);
                let user9_totalClaimed = ((uset9_stake * interest_user9 * 2) / 30) + (uset10_stake * invite_interest_user9) + (commissionInterest_user9 * user10_totalClaimed);

                // console.log("comm user1-user9: ", commissionInterest_user1);
                // console.log("interest user9: ", interest_user9);
                // console.log("total claim: ", user9_totalClaimed);

                // console.log("total cum before: ", user1_claimed_cumulative);

                // user1_claimed_cumulative += user9_totalClaimed;

                // console.log("total cum after: ", user1_claimed_cumulative);

                await staking.connect(account9).claimReward();

                user9_info = await staking.getUserInformation(account9.address);
                user1_info = await staking.getUserInformation(account1.address);

                // expect(user9_info.totalClaimed).to.be.equal(expandTo18Decimals(user9_totalClaimed));
                // expect(user1_info.totalClaimed).to.be.equal(expandTo18Decimals(user1_claimed_cumulative));

            });
        });
    });

    describe("Withdraws", function () {
        it("Should withdraw success", async function () {
            const { token, staking, owner, account1, account2, account3, account4, account5, account6, account7, account8, account9, account10 } = await loadFixture(deployContract);

            const EIGHTEEN_MONTHS = ONE_DAY_IN_SECS * 547;

            let user1_info = await staking.getUserInformation(account1.address);
            let user1_withdraw_timestamp = parseInt(user1_info.lastTimeDeposited.toString()) + parseInt(user1_info.interestDuration.toString()) + (ONE_DAY_IN_SECS * 98);

            console.log(user1_info)

            time.increaseTo(user1_withdraw_timestamp);
            
            await staking.connect(account1).withdraw();
            user1_info = await staking.getUserInformation(account1.address);

            console.log(user1_info)
            
            // // check so tien sau khi claim 2 lan
            // // expect();

            // user1_withdraw_timestamp = user1_withdraw_timestamp + (ONE_DAY_IN_SECS * 98);
            // time.increaseTo(user1_withdraw_timestamp);
            // await staking.connect(account1).withdraw();
            // user1_info = await staking.getUserInformation(account1.address);
            
            // console.log(user1_info)

            // // check so tien sau khi claim het
            // // expect();

            // user1_withdraw_timestamp = user1_withdraw_timestamp + (ONE_DAY_IN_SECS * 100);
            // time.increaseTo(user1_withdraw_timestamp);
            // await staking.connect(account1).withdraw();

        });
    });
});

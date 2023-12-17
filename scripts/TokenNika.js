// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { BigNumber } = require("ethers");

function expandTo18Decimals(n) {
    return BigNumber.from(n).mul(BigNumber.from(10).pow(18));
}

async function main() {

    // const Greeter = await hre.ethers.getContractFactory("Token");
    // const greeter = await Greeter.deploy(TokenName, Symbol);

    // await greeter.deployed();

    // console.log("Token deployed at: ", greeter.address);

    const name = "NikaSwap"
    const symbol = "NKS"
    const maxCap = expandTo18Decimals(1 * (10**9))

    // // ================ Deploy Proxy ==========================
    // const TOKEN = await hre.ethers.getContractFactory("NikaUpgrade");
    // const token = await upgrades.deployProxy(TOKEN, [name, symbol, maxCap], { initializer: 'initialize' });
    // await token.deployed();
    
    // console.log("token PROXY deployed at: ", token.address);
    // // ================ Deploy Proxy ==========================


    /// ================ UPGRADE ==========================
    const ProxyAddress = "0x3B91962E96938Db6b64D0eA9D9b8BE30BaBc95e4"
    const Vesting = await ethers.getContractFactory("NikaUpgrade");
    const vesting = await upgrades.upgradeProxy(ProxyAddress, Vesting);
    console.log("Token upgraded: ", vesting.address);
    /// ================ UPGRADE ==========================


    // await hre.run("verify:verify", {
    //     address: greeter.address,
    //     constructorArguments: [TokenName, Symbol],
    // });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });



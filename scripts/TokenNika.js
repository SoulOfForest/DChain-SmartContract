const { ethers } = require("hardhat");

async function main() {
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    const contract = await HelloWorld.deploy();
    await contract.deployed();
    console.log('NFT Contract Deployed at ' + contract.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const TREASURY_ADDRESS = '0xD53697ca55D59F3Dbf4f7001B085693F94b70B99';
  const REWARD_TOKEN_ADDRESS = '0x324F5AB2974FdF9dce9c722eB3A579Daf33d95b4';
  

  const Greeter = await hre.ethers.getContractFactory("NikaStaking");
  const greeter = await Greeter.deploy(TREASURY_ADDRESS, REWARD_TOKEN_ADDRESS);

  await greeter.deployed();

  console.log("Nika Staking deployed at: ", greeter.address);

  await hre.run("verify:verify", {
    address: greeter.address,
    constructorArguments: [TREASURY_ADDRESS, REWARD_TOKEN_ADDRESS],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


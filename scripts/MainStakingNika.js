const hre = require("hardhat");

async function main() {

  // const TREASURY_ADDRESS = '0x8CeF92872931c4C0c2A7303248b5Ea57196D9e14';
  // const REWARD_TOKEN_ADDRESS = '0x1549C1A238B4b7aa396B5D8c315df53ceC1FEa51';

  ///// Mainnet
  const TREASURY_ADDRESS = '0x28BD874fa65fb73a60C11ece74FbE44dd2BDB3b4';
  const REWARD_TOKEN_ADDRESS = '0x3b91962e96938db6b64d0ea9d9b8be30babc95e4';

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


  
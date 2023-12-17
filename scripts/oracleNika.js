const hre = require("hardhat");

async function main() {

  // Mainnet
  const factory = "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73";
  const tokenA = "0x55d398326f99059ff775485246999027b3197955";
  const tokenB = "0x3b91962e96938db6b64d0ea9d9b8be30babc95e4";

  // // Testnet
  // const factory = "0x6725F303b657a9451d8BA641348b6761A6CC7a17";
  // const tokenA = "0x1549C1A238B4b7aa396B5D8c315df53ceC1FEa51";
  // const tokenB = "0xe1283f92e5513fbe125185221cdc8e3d3dda422d";

  const Greeter = await hre.ethers.getContractFactory("OracleSimple");
  const greeter = await Greeter.deploy(factory, tokenA, tokenB);

  await greeter.deployed();

  console.log("Oracle deployed at: ", greeter.address);

  await hre.run("verify:verify", {
    address: greeter.address,
    constructorArguments: [factory, tokenA, tokenB],
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


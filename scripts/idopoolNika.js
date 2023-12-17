const hre = require("hardhat");

async function main() {

  // Mainnet
  const token = "0x3b91962e96938db6b64d0ea9d9b8be30babc95e4";           // NIKA TOKEN
  const usdc = "0x55d398326f99059ff775485246999027b3197955";            // USDT 
  const nikastaking = "0x85a33726E27bBd6b4560620B12Ce109B7909eA41";     // NIKA STAKING ADDRESS
  const fundingWallet = "0xD53697ca55D59F3Dbf4f7001B085693F94b70B99";   // Owner address
  const oracle = "0x8F25234b1d802851E3f7712b143eC62aE222Cbf7";          
  
  // // Testnet
  // const token = "0x1549C1A238B4b7aa396B5D8c315df53ceC1FEa51";           // NIKA TOKEN
  // const usdc = "0xe1283F92e5513fbE125185221cDc8e3D3Dda422D";            // USDT 
  // const nikastaking = "0x2D77fD87db8315E1569ad52c8d12B02489E9A053";     // NIKA STAKING ADDRESS
  // const fundingWallet = "0x8CeF92872931c4C0c2A7303248b5Ea57196D9e14";   // Owner address
  // const oracle = "0xd48e0D354C95403AC37c8C8C0C5dB4656e5ACa40";          // oracle will fix later when add lp to pancake, for now using owner address
  
  
  const Greeter = await hre.ethers.getContractFactory("IDOPool");
  const greeter = await Greeter.deploy(token, usdc, nikastaking, oracle, fundingWallet);

  await greeter.deployed();

  console.log("IDO pool deployed at: ", greeter.address);

  await hre.run("verify:verify", {
    address: greeter.address,
    constructorArguments: [token, usdc, nikastaking, oracle, fundingWallet],
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


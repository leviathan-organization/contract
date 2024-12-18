const hre = require("hardhat");
const {network} = require("hardhat");
const utils = require("../../common/utils");

async function main() {
  const networkName = await network.name;
  console.log("Network name=", networkName);
  
  let contractAddresses = utils.getContractAddresses(networkName,"");

  await hre.run("verify:verify", {
    address: contractAddresses.LeviathanPoolDeployer,
    contract: "contracts/LeviathanPoolDeployer.sol:LeviathanPoolDeployer",
    constructorArguments: [],
  });

  await hre.run("verify:verify", {
    address: contractAddresses.LeviathanFactory,
    contract: "contracts/LeviathanFactory.sol:LeviathanFactory",
    constructorArguments: [contractAddresses.LeviathanPoolDeployer],
  });

   await hre.run("verify:verify", {
     address: contractAddresses.InitCodeHashAddress,
     contract: "contracts/test/OutputCodeHash.sol:OutputCodeHash",
     constructorArguments: [],
   });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

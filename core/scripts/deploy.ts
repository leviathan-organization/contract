import { ethers,network } from "hardhat";
const utils = require("../../common/utils");

let GAS_CONFIG = {
};

async function main() {
  const networkName = await network.name;
  console.log("Network name=", networkName);

  const LeviathanPoolDeployer = await ethers.getContractFactory(
    "LeviathanPoolDeployer"
  );
  const leviathanPoolDeployer = await LeviathanPoolDeployer.deploy(GAS_CONFIG);
  await leviathanPoolDeployer.waitForDeployment();
  console.log("LeviathanPoolDeployer", leviathanPoolDeployer.target);
  
  const LeviathanFactory = await ethers.getContractFactory("LeviathanFactory");
  const leviathanFactory = await LeviathanFactory.deploy(leviathanPoolDeployer.target,GAS_CONFIG);
  await leviathanFactory.waitForDeployment();
  console.log("LeviathanFactory", leviathanFactory.target);
 
  let setFactoryAddressTx = await leviathanPoolDeployer.setFactoryAddress(leviathanFactory.target,GAS_CONFIG);
  await setFactoryAddressTx.wait();
  console.log(
    "leviathanPoolDeployer setFactoryAddress tx:",
    setFactoryAddressTx.hash
  );

  const OutputCodeHash = await ethers.getContractFactory("OutputCodeHash");
  const outputCodeHash = await OutputCodeHash.deploy(GAS_CONFIG);
  await outputCodeHash.waitForDeployment();
  console.log("OutputCodeHash", outputCodeHash.target);

  const hash = await outputCodeHash.getInitCodeHash();
  console.log("hash: ", hash);

  let contractAddresses = {
    LeviathanPoolDeployer: leviathanPoolDeployer.target,
    LeviathanFactory: leviathanFactory.target,
    InitCodeHashAddress: outputCodeHash.target,
    InitCodeHash: hash,
  };
  await utils.writeContractAddresses(networkName,contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

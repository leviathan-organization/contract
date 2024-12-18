import { ethers,network } from "hardhat";
const utils = require("../../common/utils");

async function main() {
  const networkName = await network.name;
  console.log("Network name=", networkName);

  const LeviathanPoolDeployer = await ethers.getContractFactory(
    "LeviathanPoolDeployer"
  );
  const leviathanPoolDeployer = await LeviathanPoolDeployer.deploy();
  console.log("LeviathanPoolDeployer", leviathanPoolDeployer.address);
  
  const LeviathanFactory = await ethers.getContractFactory("LeviathanFactory");
  const leviathanFactory = await LeviathanFactory.deploy(leviathanPoolDeployer.address);
  console.log("LeviathanFactory", leviathanFactory.address);
 
  let setFactoryAddressTx = await leviathanPoolDeployer.setFactoryAddress(leviathanFactory.address);
  console.log(
    "leviathanPoolDeployer setFactoryAddress tx:",
    setFactoryAddressTx.hash
  );

  const OutputCodeHash = await ethers.getContractFactory("OutputCodeHash");
  const outputCodeHash = await OutputCodeHash.deploy();
  console.log("OutputCodeHash", outputCodeHash.address);

  const hash = await outputCodeHash.getInitCodeHash();
  console.log("hash: ", hash);

  let contractAddresses = {
    LeviathanPoolDeployer: leviathanPoolDeployer.address,
    LeviathanFactory: leviathanFactory.address,
    InitCodeHashAddress: outputCodeHash.address,
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

import { ethers, network } from "hardhat";
const utils = require("../../common/utils");
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const networkName = await network.name;
  console.log("Network name=", networkName);

  const Multicall3 = await ethers.getContractFactory("Multicall3");
  const multicall3 = await Multicall3.deploy();
  await multicall3.waitForDeployment();
  console.log("multicall3", multicall3.target);


  const GasMulticallV2 = await ethers.getContractFactory("GasMulticallV2");
  const gasMulticall = await GasMulticallV2.deploy();
  await gasMulticall.waitForDeployment();
  console.log("gasMulticall", gasMulticall.target);

  let contractAddresses = {
    Multicall3: multicall3.target,
    GasMulticall: gasMulticall.target,
  };
  await utils.writeContractAddresses(networkName, contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

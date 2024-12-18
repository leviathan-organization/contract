import { ethers } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";

async function main() {
  const [owner] = await ethers.getSigners();

  const SelfSufficientERC20 = await ethers.getContractFactory(
    "SelfSufficientERC20"
  );
  // const USDC = await SelfSufficientERC20.deploy();
  // await USDC.initlialize("MockUSDC", "USDC", 6);
  // console.log("USDC", USDC.address);
  // await USDC.mint(owner.address, BigNumber.from("10000000000000000000000000"));
  // await USDC.mint(
  //   "0xf172E28863C417AA71ac691A8bc02CdFc856daFA",
  //   BigNumber.from("10000000000000000000000000")
  // );

  // const LEVIATHAN = await SelfSufficientERC20.deploy();
  // await LEVIATHAN.initlialize("MockLEVIATHAN", "LEVIATHAN", 18);
  // console.log("LEVIATHAN", LEVIATHAN.address);
  // await LEVIATHAN.mint(owner.address, BigNumber.from("10000000000000000000000000"));


  const rLEVIATHAN = await SelfSufficientERC20.deploy();
  await rLEVIATHAN.initlialize("MockrLEVIATHAN", "rLEVIATHAN", 18);
  console.log("rLEVIATHAN", rLEVIATHAN.address);
  await rLEVIATHAN.mint(
    owner.address,
    BigNumber.from("10000000000000000000000000")
  );

  // const TickMath = await ethers.getContractFactory("ExternalTickMath");
  // const tickMath = await TickMath.deploy();
  // console.log("TickMath", tickMath.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

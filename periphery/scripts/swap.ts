import { ethers,network } from "hardhat";
import { BigNumber } from "@ethersproject/bignumber";
const utils = require("../common/utils");

const leviathanAddress = "0x74a0E7118480bdfF5f812c7a879a41db09ac2c39";
let wethAddress = "";

async function main() {
   const networkName = await network.name;
   console.log("Network name=", networkName);

  const [owner] = await ethers.getSigners();
  let contractAddresses = utils.getContractAddresses(networkName,"");
  wethAddress = contractAddresses.WETH;

  const swapRouter = await ethers.getContractAt(
    "SwapRouter",
    contractAddresses.SwapRouter
  );

  const ETH = await ethers.getContractAt("WETH", wethAddress);
  let mammApproveTx = await ETH.approve(
    contractAddresses.SwapRouter,
      "10000000000000000000000000000"
  );
  console.log("ETH approve tx:", mammApproveTx.hash);

  const LEVIATHAN = await ethers.getContractAt("SelfSufficientERC20", leviathanAddress);
  await LEVIATHAN.approve(
    contractAddresses.SwapRouter,
      "10000000000000000000000000000"
  );
  console.log("approve success");

  await swapRouter.exactInputSingle({
    tokenIn: wethAddress,
    tokenOut: leviathanAddress,
    fee: 100,
    recipient: owner.address,
    deadline: 999999999,
    amountIn: "11000000000000000000",
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  });
  console.log("swap success");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

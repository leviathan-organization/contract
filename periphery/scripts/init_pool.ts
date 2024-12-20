import { ethers,network } from "hardhat";
const utils = require("../../common/utils");
const {encodePriceSqrt} = require("../test/shared/encodePriceSqrt");
const {formatSqrtRatioX96 } = require("../test/shared/formatSqrtRatioX96");

let wethAddress = "";
let leviathanAddress = "";

async function main() {
  const networkName = await network.name;
  console.log("Network name=", networkName);

  let coreContractAddresses = utils.getContractAddresses(
    networkName,
    `../core/deployments/${networkName}.json`
  );
  console.log("core contract addresses:", coreContractAddresses);

  let contractAddresses = utils.getContractAddresses(networkName, "");
  console.log("contractAddresses:", contractAddresses);
  wethAddress = contractAddresses.WETH;
  leviathanAddress = contractAddresses.LVTH
  // Leviathan/WETH = 2
  let price = encodePriceSqrt(2, 1); 
  console.log("sqrtPrice:", price,price.toString());

  let priceStr = formatSqrtRatioX96(price);
  console.log("priceStr:", priceStr);

  const positionManager = await ethers.getContractAt(
    "NonfungiblePositionManager",
    contractAddresses.NonfungiblePositionManager
  );

  let token0 = wethAddress < leviathanAddress ? wethAddress : leviathanAddress;
  let token1 = leviathanAddress > wethAddress ? leviathanAddress : wethAddress;
  console.log("token0:", token0);
  console.log("token1:", token1);

  let initPoolTx = await positionManager.createAndInitializePoolIfNecessary(
    wethAddress < leviathanAddress ? wethAddress : leviathanAddress,
    leviathanAddress > wethAddress ? leviathanAddress : wethAddress,
    "500",
    price.toString()
  );
  console.log("initPoolTx pool success:", initPoolTx.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

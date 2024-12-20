import { ethers,upgrades,network } from "hardhat";
const utils = require("../../common/utils");
import dotenv from "dotenv";
dotenv.config();

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


async function main() {
  const networkName = await network.name;
  console.log("Network name=", networkName);

  let localContractAddresses = utils.getContractAddresses(networkName, "");
  let coreContractAddresses = utils.getContractAddresses(
    networkName,
    `../core/deployments/${networkName}.json`
  );
  console.log("core contract addresses:", coreContractAddresses);

  let WETH= localContractAddresses.WETH
  console.log("WETH addresses:", WETH);


  const NonfungibleTokenPositionDescriptor = await ethers.getContractFactory(
      "NonfungibleTokenPositionDescriptorOffChain"
  );
  const nonfungibleTokenPositionDescriptor = await upgrades.deployProxy(
      NonfungibleTokenPositionDescriptor,
      ["https://nft.leviathan.finance/v3"]
  );
  await nonfungibleTokenPositionDescriptor.waitForDeployment();
  console.log(
      "NonfungibleTokenPositionDescriptor deployed at",
      nonfungibleTokenPositionDescriptor.target
  );
  await sleep(3000);

  const Quoter = await ethers.getContractFactory("Quoter");
  const quoter = await Quoter.deploy(
    coreContractAddresses.LeviathanPoolDeployer,
    coreContractAddresses.LeviathanFactory,
    WETH
  );
  await quoter.waitForDeployment();
  console.log("Quoter", quoter.target);
  await sleep(3000);
  const Multicall = await ethers.getContractFactory("LeviathanInterfaceMulticall");
  const multicall = await Multicall.deploy();
  await multicall.waitForDeployment();
  console.log("Multicall", multicall.target);

  await sleep(3000);

  const SwapRouter = await ethers.getContractFactory("SwapRouter");
  const swapRouter = await SwapRouter.deploy(
    coreContractAddresses.LeviathanPoolDeployer,
    coreContractAddresses.LeviathanFactory,
    WETH
  );
  await swapRouter.waitForDeployment();
  console.log("SwapRouter", swapRouter.target);

  await sleep(3000);

  const QuoterV2 = await ethers.getContractFactory("QuoterV2");
  const quoterV2 = await QuoterV2.deploy(coreContractAddresses.LeviathanPoolDeployer, coreContractAddresses.LeviathanFactory, WETH);
  await quoterV2.waitForDeployment();
  console.log("QuoterV2", quoterV2.target);

  await sleep(3000);

  const TickLens = await ethers.getContractFactory("TickLens");
  const tickLens = await TickLens.deploy();
  await tickLens.waitForDeployment();
  console.log("TickLens", tickLens.target);

  await sleep(3000);

  const NFTDescriptor = await ethers.getContractFactory("NFTDescriptor");
  const nftDescriptor = await NFTDescriptor.deploy();
  await nftDescriptor.waitForDeployment();
  console.log("NFTDescriptor", nftDescriptor.target);


  await sleep(3000);

  const NonfungiblePositionManager = await ethers.getContractFactory(
    "NonfungiblePositionManager"
  );
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    coreContractAddresses.LeviathanPoolDeployer,
    coreContractAddresses.LeviathanFactory,
    WETH,
    nonfungibleTokenPositionDescriptor.target
  );
  await nonfungiblePositionManager.waitForDeployment();
  console.log("NonfungiblePositionManager", nonfungiblePositionManager.target);

  let contractAddresses = {
    WETH: WETH,
    SwapRouter: swapRouter.target,
    Quoter: quoter.target,
    QuoterV2: quoterV2.target,
    TickLens: tickLens.target,
    NFTDescriptor: nftDescriptor.target,
    NonfungibleTokenPositionDescriptor:
      nonfungibleTokenPositionDescriptor.target,
    NonfungiblePositionManager: nonfungiblePositionManager.target,
    LeviathanInterfaceMulticall: multicall.target,
  };
  await utils.writeContractAddresses(networkName, contractAddresses);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import {network} from "hardhat";

const c = require("../test/shared/computePoolAddress");
const utils = require("../../common/utils");

async function main() {
    const networkName = await network.name;
    let contractAddresses = await utils.getContractAddresses(networkName, '');
    let coreContractAddresses = utils.getContractAddresses(
        networkName,
        `../core/deployments/${networkName}.json`
    );
    const token0 = contractAddresses.LVTH;
    const token1 = contractAddresses.WETH;
    const deployer = coreContractAddresses.LeviathanPoolDeployer
    const fee = 500;

    let result = await c.computePoolAddress(deployer, [token0, token1], fee);
    console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

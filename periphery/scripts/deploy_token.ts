import hre, {ethers, network} from "hardhat";

const utils = require("../../common/utils");

async function main() {

    const [owner] = await ethers.getSigners();

    const SelfSufficientERC20 = await ethers.getContractFactory(
        "SelfSufficientERC20"
    );
    const WETH = await ethers.getContractFactory(
        "WETH"
    );
    const networkName = await network.name;


    //  "USDT","USDC","DOGE","BTC",
    const tokens = [
        {
            name: "USDT",
            decimals: 6
        },

        {
            name: "USDC",
            decimals: 6
        },
        {
            name: "WBTC",
            decimals: 8
        },
        {
            name: "DOGE",
            decimals: 8
        },
        {
            name: "LVTH",
            decimals: 18
        }
    ]

    // let verifyFun = []
    // let saveTokens: Record<string, string> = {}
    // {
    //
    //     for (let t of tokens) {
    //         const token = await SelfSufficientERC20.deploy();
    //         await token.waitForDeployment()
    //         await token.initlialize(t.name, t.name, t.decimals);
    //         console.log(t.name, token.target);
    //
    //         let tx = await token.mint(
    //             owner.address,
    //             "10000000000000000000000000"
    //         );
    //         await tx.wait()
    //         saveTokens[t.name] = token.target as string
    //
    //         verifyFun.push(()=>{
    //             return  hre.run("verify:verify", {
    //                 address:token.target,
    //                 contract: "contracts/test/SelfSufficientERC20.sol:SelfSufficientERC20",
    //                 constructorArguments: [],
    //             });
    //         })
    //
    //     }
    // }

    // {
    //     const token = await WETH.deploy();
    //     await token.waitForDeployment()
    //     saveTokens['WETH'] = token.target as string
    //
    //     verifyFun.push(()=>{
    //         return  hre.run("verify:verify", {
    //             address:token.target,
    //             contract: "contracts/test/WETH.sol:WETH",
    //             constructorArguments: [],
    //         });
    //     })
    //
    // }
    // utils.writeContractAddresses(networkName, saveTokens)

    {
        let contractAddresses = utils.getContractAddresses(networkName,'')
        console.log(contractAddresses)
        for (const token of tokens) {

            try {
                await hre.run("verify:verify", {
                    address: contractAddresses[token.name],
                    contract: "contracts/test/SelfSufficientERC20.sol:SelfSufficientERC20",
                    constructorArguments: [],
                });
            }catch (e) {

            }
        }
        await hre.run("verify:verify", {
            address: contractAddresses['WETH'],
            contract: "contracts/test/WETH.sol:WETH",
            constructorArguments: [],
        });
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

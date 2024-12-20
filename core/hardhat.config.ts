import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    'seplia-ink': {
      gas: 10000000,
      gasPrice: 200000000,
      url: process.env.SEPOLIA_INK_RPC || "",
      accounts:
        process.env.SEPOLIA_INK_PRIVATE_KEY !== undefined ? [process.env.SEPOLIA_INK_PRIVATE_KEY] : [],
    },
    'ink': {
      url: process.env.INK_RPC || "",
      accounts:
          process.env.INK_PRIVATE_KEY !== undefined ? [process.env.INK_PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey:  {
      "seplia-ink":   process.env.SEPOLIA_INK_API_KEY,
      "ink":   process.env.INK_API_KEY,
    },
    customChains: [
      {
        network: "seplia-ink",
        chainId: 763373,
        urls: {
          apiURL: "https://explorer-sepolia.inkonchain.com/api",
          browserURL: "https://explorer-sepolia.inkonchain.com",
        },
      },
      {
        network: "ink",
        chainId: 57073,
        urls: {
          apiURL: "https://explorer.inkonchain.com/api",
          browserURL: "https://explorer.inkonchain.com",
        },
      }
    ],
  },
};

export default config;

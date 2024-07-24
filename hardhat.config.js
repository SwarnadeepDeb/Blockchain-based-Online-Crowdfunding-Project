require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'sepolia',
  networks: {
    hardhat: {},
    sepolia :{
      url : 'https://rpc.ankr.com/eth_sepolia',
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    },
  },
  solidity: "0.8.24",
};

// 0xB7A45FDc01A3a56f24e7E50B6788ccbFDF328bcD
const path = require("path");
require("dotenv").config({ path: "./.env" });
const HDWalletProvider = require("@truffle/hdwallet-provider");
const MetaMaskAccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      port: 8545,
      network_id: "*",
      host: "127.0.0.1",
    },
    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          process.env.PRIVATE_KEY,
          process.env.INFURA_URL,
          MetaMaskAccountIndex
        );
      },
      network_id: 4,
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "^0.7.3",
    },
  },
};

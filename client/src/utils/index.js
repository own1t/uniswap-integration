import Web3 from "web3";
import Uni from "../contracts/UniswapIntegration.json";
import IERC20 from "../contracts/IERC20.json";

export const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Accounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://localhost:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });
};

export const getContracts = async (web3) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = Uni.networks[networkId];
  const uniswap = new web3.eth.Contract(
    Uni.abi,
    deployedNetwork && deployedNetwork.address
  );

  const tokens = await uniswap.methods.getTokens().call();
  const tokenContracts = tokens.reduce(
    (acc, token) => ({
      ...acc,
      [web3.utils.hexToUtf8(token.ticker)]: new web3.eth.Contract(
        IERC20.abi,
        token.tokenAddress
      ),
    }),
    {}
  );

  return { uniswap, ...tokenContracts };
};

export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";

  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatNumber = (number) => {
  return Number.parseFloat(number).toFixed(2);
};

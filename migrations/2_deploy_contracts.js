const UniswapIntegration = artifacts.require("./UniswapIntegration.sol");

// Rinkeby
const IUniswap = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const [BAT, DAI, UNI, WETH] = ["BAT", "DAI", "UNI", "WETH"].map((ticker) =>
  web3.utils.fromAscii(ticker)
);

const batAddress = "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99";
const daiAddress = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";
const uniAddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab";

module.exports = async (deployer) => {
  await deployer.deploy(UniswapIntegration, IUniswap);

  const UNISWAP = await UniswapIntegration.deployed();

  await Promise.all([
    UNISWAP.addToken(BAT, batAddress),
    UNISWAP.addToken(DAI, daiAddress),
    UNISWAP.addToken(UNI, uniAddress),
    UNISWAP.addToken(WETH, wethAddress),
  ]);
};

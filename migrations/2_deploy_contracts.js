const UniswapIntegration = artifacts.require("./UniswapIntegration.sol");

// Rinkeby
const IUniswap = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const [DAI, USDC, USDT, UNI, WETH, BAT, COMP, KNC, LINK, REP, WBTC, ZRX] = [
  "DAI",
  "USDC",
  "USDT",
  "UNI",
  "WETH",
  "BAT",
  "COMP",
  "KNC",
  "LINK",
  "REP",
  "WBTC",
  "ZRX",
].map((ticker) => web3.utils.fromAscii(ticker));

const daiAddress = "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa";
const usdcAddress = "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b";
const usdtAddress = "0x07de306FF27a2B630B1141956844eB1552B956B5";
const uniAddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
const wethAddress = "0xc778417e063141139fce010982780140aa0cd5ab";
const batAddress = "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99";
const compAddress = "0xe16C7165C8FeA64069802aE4c4c9C320783f2b6e";
const kncAddress = "0xdd974D5C2e2928deA5F71b9825b8b646686BD200";
const linkAddress = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
const repAddress = "0x6e894660985207feb7cf89Faf048998c71E8EE89";
const wbtcAddress = "0x577D296678535e4903D59A4C929B718e1D575e0A";
const zrxAddress = "0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6";

module.exports = async (deployer) => {
  await deployer.deploy(UniswapIntegration, IUniswap);

  const UNISWAP = await UniswapIntegration.deployed();

  await UNISWAP.addToken(UNI, uniAddress);

  await Promise.all([
    UNISWAP.addToken(BAT, batAddress),
    UNISWAP.addToken(COMP, compAddress),
    UNISWAP.addToken(DAI, daiAddress),
    UNISWAP.addToken(KNC, kncAddress),
    UNISWAP.addToken(LINK, linkAddress),
    UNISWAP.addToken(REP, repAddress),
    UNISWAP.addToken(USDC, usdcAddress),
    UNISWAP.addToken(USDT, usdtAddress),
    UNISWAP.addToken(WETH, wethAddress),
    UNISWAP.addToken(WBTC, wbtcAddress),
    UNISWAP.addToken(ZRX, zrxAddress),
  ]);
};

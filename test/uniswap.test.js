const {
  BN,
  constants,
  expectEvent,
  expectRevert,
} = require("@openzeppelin/test-helpers");
const { web3 } = require("@openzeppelin/test-helpers/src/setup");

const IERC20 = artifacts.require("IERC20");
const UniswapIntegration = artifacts.require("UniswapIntegration.sol");

const IUniswap = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WBTC = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

const DAI_WHALE = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
const USDC_WHALE = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
const USDT_WHALE = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";
const WETH_WHALE = "0xee2826453A4Fd5AfeB7ceffeEF3fFA2320081268";
const WBTC_WHALE = "0x3f5CE5FBFe3E9af3971dD833D26bA9b5C936f0bE";

contract("UniswapIntegration", (accounts) => {
  const CALLER = accounts[0];

  let uniswapIntegration;

  beforeEach(async () => {
    uniswapIntegration = await UniswapIntegration.new(IUniswap);
  });

  it("should swap tokens", async () => {
    const tokenIn = await IERC20.at(DAI);
    const tokenOut = await IERC20.at(WETH);

    const AMOUNT_IN = new BN(10).pow(new BN(18)).mul(new BN(100000));
    const AMOUNT_OUT_MIN = 1;

    await tokenIn.approve(uniswapIntegration.address, AMOUNT_IN, {
      from: DAI_WHALE,
    });

    await uniswapIntegration.swap(
      tokenIn.address,
      tokenOut.address,
      AMOUNT_IN,
      AMOUNT_OUT_MIN,
      CALLER,
      { from: DAI_WHALE }
    );

    console.log(`in ${AMOUNT_IN}`);
    console.log(`out ${await tokenOut.balanceOf(CALLER)}`);
  });

  it("should add liquidity and remove liquidity", async () => {
    const tokenA = await IERC20.at(DAI);
    const tokenB = await IERC20.at(WETH);

    const TOKEN_A_AMOUNT = new BN(10).pow(new BN(18));
    const TOKEN_B_AMOUNT = new BN(10).pow(new BN(18));

    await web3.eth.sendTransaction({
      from: CALLER,
      to: DAI_WHALE,
      value: web3.utils.toWei("1", "ether"),
    });

    await web3.eth.sendTransaction({
      from: CALLER,
      to: WETH_WHALE,
      value: web3.utils.toWei("1", "ether"),
    });

    await tokenA.transfer(CALLER, TOKEN_A_AMOUNT, { from: DAI_WHALE });
    await tokenB.transfer(CALLER, TOKEN_B_AMOUNT, { from: WETH_WHALE });

    await tokenA.approve(uniswapIntegration.address, TOKEN_A_AMOUNT, {
      from: CALLER,
    });
    await tokenB.approve(uniswapIntegration.address, TOKEN_B_AMOUNT, {
      from: CALLER,
    });

    let tx = await uniswapIntegration.addLiquidity(
      tokenA.address,
      tokenB.address,
      TOKEN_A_AMOUNT,
      TOKEN_B_AMOUNT,
      {
        from: CALLER,
      }
    );

    console.log("=== add liquidity ===");
    console.log(tx.logs);

    tx = await uniswapIntegration.removeLiquidity(
      tokenA.address,
      tokenB.address,
      {
        from: CALLER,
      }
    );

    console.log("=== remove liquidity ===");
    console.log(tx.logs);
  });
});

/*

ganache-cli \
--fork https://mainnet.infura.io/v3/$INFURA_PROJECT_ID \
--unlock $WETH_WHALE \
--unlock $DAI_WHALE \
--unlock $USDC_WHALE \
--unlock $USDT_WHALE \
--unlock $WBTC_WHALE \
--networkId 999

*/

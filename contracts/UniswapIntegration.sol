// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IUniswap.sol";

contract UniswapIntegration {
    struct Token {
        bytes32 ticker;
        address tokenAddress;
    }

    IUniswapV2Router public uniswap;
    IUniswapV2Factory public factory;

    address public owner;

    mapping(bytes32 => Token) public tokens;
    bytes32[] public tokenList;

    event NewSwap(
        address indexed tokenIn,
        address indexed tokenOut,
        address indexed trader,
        uint256 amountIn,
        uint256 amountOut
    );

    event AddedLiquidity(
        address tokenA,
        address tokenB,
        address provider,
        uint256 indexed amountA,
        uint256 indexed amountB,
        uint256 indexed liquidityAmount
    );

    event RemovedLiquidity(
        address tokenA,
        address tokenB,
        address provider,
        uint256 indexed amountA,
        uint256 indexed amountB,
        uint256 indexed liquidityAmount
    );

    constructor(address _uniswap) {
        uniswap = IUniswapV2Router(_uniswap);
        factory = IUniswapV2Factory(uniswap.factory());
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    function addToken(bytes32 ticker, address tokenAddress)
        external
        onlyOwner()
    {
        tokens[ticker] = Token(ticker, tokenAddress);
        tokenList.push(ticker);
    }

    function getTokens() external view returns (Token[] memory) {
        Token[] memory _tokens = new Token[](tokenList.length);
        for (uint256 i = 0; i < tokenList.length; i++) {
            _tokens[i] = Token(
                tokens[tokenList[i]].ticker,
                tokens[tokenList[i]].tokenAddress
            );
        }
        return _tokens;
    }

    function deposit(bytes32 ticker, uint256 amount) external {
        IERC20 tokenInstance = IERC20(tokens[ticker].tokenAddress);
        tokenInstance.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw(bytes32 ticker, uint256 amount) external onlyOwner() {
        IERC20 tokenInstance = IERC20(tokens[ticker].tokenAddress);
        uint256 balance = tokenInstance.balanceOf(address(this));

        require(balance >= amount, "Not enough balance");

        tokenInstance.transfer(msg.sender, amount);
    }

    function swap(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOut,
        address _to
    ) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(address(uniswap), _amountIn);

        address[] memory path;
        if (_tokenIn == uniswap.WETH() || _tokenOut == uniswap.WETH()) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = uniswap.WETH();
            path[2] = _tokenOut;
        }

        uniswap.swapExactTokensForTokens(
            _amountIn,
            _amountOut,
            path,
            _to,
            block.timestamp
        );

        emit NewSwap(_tokenIn, _tokenOut, msg.sender, _amountIn, _amountOut);
    }

    function getAmountOutMin(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn
    ) external view returns (uint256) {
        address[] memory path;

        if (_tokenIn == uniswap.WETH() || _tokenOut == uniswap.WETH()) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = uniswap.WETH();
            path[2] = _tokenOut;
        }

        uint256[] memory amountOutMins = uniswap.getAmountsOut(_amountIn, path);

        return amountOutMins[path.length - 1];
    }

    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    )
        external
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

        IERC20(_tokenA).approve(address(uniswap), _amountA);
        IERC20(_tokenB).approve(address(uniswap), _amountB);

        (uint256 amountA, uint256 amountB, uint256 liquidityAmount) =
            uniswap.addLiquidity(
                _tokenA,
                _tokenB,
                _amountA,
                _amountB,
                1,
                1,
                address(this),
                block.timestamp
            );

        emit AddedLiquidity(
            _tokenA,
            _tokenB,
            msg.sender,
            amountA,
            amountB,
            liquidityAmount
        );

        return (amountA, amountB, liquidityAmount);
    }

    function removeLiquidity(address _tokenA, address _tokenB)
        external
        returns (uint256, uint256)
    {
        address pair = factory.getPair(_tokenA, _tokenB);

        uint256 liquidityAmount = IERC20(pair).balanceOf(address(this));
        IERC20(pair).approve(address(uniswap), liquidityAmount);

        (uint256 amountA, uint256 amountB) =
            uniswap.removeLiquidity(
                _tokenA,
                _tokenB,
                liquidityAmount,
                1,
                1,
                address(this),
                block.timestamp
            );

        emit RemovedLiquidity(
            _tokenA,
            _tokenB,
            msg.sender,
            amountA,
            amountB,
            liquidityAmount
        );

        return (amountA, amountB);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/pancake/IPancakeRouter02.sol";
import "./interfaces/IUncxTokenVesting.sol";

contract DGWToken is ERC20Capped, ERC20Burnable, Pausable, Ownable {
    uint256 public constant PRECISION = 10000;
    uint256 public constant MAXIMUM_CAP = 50 * (10 ** 6) * (10 ** 18); // 50 M total supply
    
    uint256 public sellFee;
    uint256 public buyFee;

    uint8 private constant IDO_INDEX = 0;
    uint8 private constant FARMING_INDEX = 1;
    uint8 private constant LIQUIDITY_INDEX = 2;
    uint8 private constant TEAM_INDEX = 3;
    uint8 private constant MARKETING_INDEX = 4;
    uint8 private constant TREASURY_INDEX = 5;
    uint8 private constant COMMUNITY_INDEX = 6;

    // 50 M total supply
    uint256[7] public pools_amount;

    bool[7] public _minted_pool;
    
    IPancakeRouter02 public swapRouter;
    IUncxTokenVesting public tokenVesting;

    mapping(address => bool) public lpAddresses;

    constructor(
        string memory name, 
        string memory symbol,
        address tokenVesting_,
        address ido,
        address farming,
        address liquidity,
        address marketing,
        address community
    ) ERC20(name, symbol) ERC20Capped(MAXIMUM_CAP) {
        // __ERC20_init(name, symbol);
        // __ERC20Capped_init(MAXIMUM_CAP);
        // __ERC20Burnable_init();
        // __Ownable_init();
        // __Pausable_init();

        // Uncx vesting contract
        tokenVesting = IUncxTokenVesting(tokenVesting_);

        // Tokenomics 
        pools_amount = [
            5 * (10 ** 6) * (10 ** 18), // IDO - 10% - 5M
            20 * (10 ** 6) * (10 ** 18), // Farming, Staking - 40% - 20M
            5 * (10 ** 6) * (10 ** 18), // Liquidity - 10% - 5M
            5 * (10 ** 6) * (10 ** 18), // Team - 10% - 5M
            15 * (10 ** 5) * (10 ** 18), // Marketing - 3% - 1.5M
            10 * (10 ** 6) * (10 ** 18), // Treasury - 20% - 10M
            35 * (10 ** 5) * (10 ** 18) // Community - 7% - 3.5M
        ];

        mint(ido, pools_amount[IDO_INDEX]);
        _minted_pool[IDO_INDEX] = true;

        _mint(farming, pools_amount[FARMING_INDEX]);
        _minted_pool[FARMING_INDEX] = true;

        _mint(liquidity, pools_amount[LIQUIDITY_INDEX]);
        _minted_pool[LIQUIDITY_INDEX] = true;

        _mint(marketing, pools_amount[MARKETING_INDEX]);
        _minted_pool[MARKETING_INDEX] = true;

        _mint(community, pools_amount[COMMUNITY_INDEX]);
        _minted_pool[COMMUNITY_INDEX] = true;

        buyFee = 2000; // 20%
        sellFee = 3000; // 30%

        swapRouter = IPancakeRouter02(0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb); // Pancake router
    }

    function lock(
        address team, 
        address treasury
    ) external onlyOwner {
         // Pre-mint to the token itself then call to uncx to lock all token relates to treasury, team
        _mint(address(this), pools_amount[TREASURY_INDEX]);
        _minted_pool[TREASURY_INDEX] = true;

        _mint(address(this), pools_amount[TEAM_INDEX]);
        _minted_pool[TEAM_INDEX] = true;

        _approve(address(this), address(tokenVesting), pools_amount[TEAM_INDEX] + pools_amount[TREASURY_INDEX]);
        
        IUncxTokenVesting.LockParams memory treasuryLockParams = IUncxTokenVesting.LockParams({
            owner: payable(treasury),
            amount: pools_amount[TREASURY_INDEX],
            startEmission: 1726333200,
            endEmission: 1752253200, // in one hour
            condition: address(0)
        });

        IUncxTokenVesting.LockParams memory teamLockParams = IUncxTokenVesting.LockParams({
            owner: payable(team),
            amount: pools_amount[TEAM_INDEX],
            startEmission: 1772989200,
            endEmission: 1798909200, // in ten months
            condition: address(0)
        });

        IUncxTokenVesting.LockParams[] memory lockParams = new IUncxTokenVesting.LockParams[](2);

        lockParams[0] = treasuryLockParams;
        lockParams[1] = teamLockParams;


        tokenVesting.lock(
            address(this),
            lockParams
        );
    }

    function updateSwapRouter(address _routerAddress) external onlyOwner {
        swapRouter = IPancakeRouter02(_routerAddress); 
    }

    function updateUNCXTokenVesting(address _tokenVesting) external onlyOwner {
        tokenVesting = IUncxTokenVesting(_tokenVesting); 
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    function updateSellFee(uint256 _sellFee) external onlyOwner {
        require(_sellFee <= PRECISION, "Token: Swap Fee can not larger than 30%");
        sellFee = _sellFee;
    }

    function updateBuyFee(uint256 _buyFee) external onlyOwner {
        require(_buyFee <= PRECISION, "Token: Swap Fee can not larger than 100%");
        buyFee = _buyFee;
    }

    function updatePairAddress(address _includeAddress, bool _status) external onlyOwner {
        require(address(_includeAddress) != address(0), "Token: Pair address can not be zero address");
        lpAddresses[_includeAddress] = _status;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20, ERC20Capped) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `amount`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `amount`.
     */
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal override {
        uint256 taxAmount = 0;

        address caller = _msgSender();

        if (caller == address(swapRouter)) {
            taxAmount = amount * sellFee / PRECISION;
        } else if (from == caller && lpAddresses[caller]) {
            taxAmount = amount * buyFee / PRECISION;
        }

        // Transfer the remaining amount
        super._transfer(from, to, amount - taxAmount);

        // Burn tax amount to decrease token supply
        if (taxAmount > 0) {
            _burn(from, taxAmount);
        }
    }
}
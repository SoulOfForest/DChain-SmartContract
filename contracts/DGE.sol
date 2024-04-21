// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interfaces/pancake/IPancakeRouter02.sol";

contract DGEToken is ERC20BurnableUpgradeable, PausableUpgradeable, OwnableUpgradeable {
    uint256 public constant PRECISION = 10000;
    uint256 public constant MAXIMUM_CAP = 25 * (10 ** 6) * (10 ** 18); // 25 M total supply
    
    uint256 public sellFee;
    uint256 public buyFee;

    IPancakeRouter02 public swapRouter;

    mapping(address => bool) public lpAddresses;

    function initialize(string memory name, string memory symbol) public initializer {
        __ERC20_init(name, symbol);
        __ERC20Burnable_init();
        __Ownable_init();
        __Pausable_init();

        buyFee = 2000; // 20%
        sellFee = 3000; // 30%

        swapRouter = IPancakeRouter02(0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb);
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

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
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
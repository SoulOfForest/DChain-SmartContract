// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract DWToken is ERC20CappedUpgradeable, ERC20BurnableUpgradeable, PausableUpgradeable, OwnableUpgradeable {
    uint256 public constant PRECISION = 10000;
    uint256 public swapFee;

    mapping(address => bool) public includeAddress;

    function initialize(string memory name, string memory symbol, uint256 cap) public initializer {
        __ERC20_init(name, symbol);
        __ERC20Capped_init(cap);
        __ERC20Burnable_init();
        __Ownable_init();
        __Pausable_init();


        swapFee = 2000; // 20 %
        includeAddress[0x13f4EA83D0bd40E75C8222255bc855a974568Dd4] = true; // Smart router
        includeAddress[0x10ED43C718714eb63d5aA57B78B54704E256024E] = true; // Router
        includeAddress[0x2d03c57C96Ed8111545356c2D4288D1125C6e6D3] = true; // LP Pair
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    function updateSwapFee(uint256 _swapFee) external onlyOwner {
        require(_swapFee <= 300, "Token: Swap Fee can not larger than 30%");
        swapFee = _swapFee;
    }

    function updateIncludeAddress(address _includeAddress, bool _status) external onlyOwner {
        require(address(_includeAddress) != address(0), "Token: Address can not be zero address");
        includeAddress[_includeAddress] = _status;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _mint(address account, uint256 amount) internal virtual override(ERC20Upgradeable, ERC20CappedUpgradeable) {
        require(ERC20Upgradeable.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address to, uint256 amount) public virtual override returns (bool) {
        require(swapFee != 0, "Token: swap fee can not be zero");

        uint256 amountAfterFee = amount;

        if (includeAddress[msg.sender] == true) {
            amountAfterFee =  amount - ((amount * swapFee) / PRECISION);
        }

        address owner = _msgSender();

        _burn(owner, amount - amountAfterFee);
        _transfer(owner, to, amountAfterFee);
        return true;
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
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        require(swapFee != 0, "Token: swap fee can not be zero");

        uint256 amountAfterFee = amount;

        if (includeAddress[msg.sender] == true) {
            amountAfterFee =  amount - ((amount * swapFee) / PRECISION);
        }   

        address spender = _msgSender();
        _spendAllowance(from, spender, amount);

        _burn(from, amount - amountAfterFee);
        _transfer(from, to, amountAfterFee);

        return true;
    }
}
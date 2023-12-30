// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./interfaces/IERC20.sol";
import "./libraries/TransferHelper.sol";

contract DWVault is Ownable, Pausable, ReentrancyGuard {
     event BuyTokenByToken(
        address indexed offerToken,
        address indexed beneficiary,
        uint amount,
        uint soldTokens
    );

    struct OfferedCurrency {
        uint256 decimals;
        uint256 rate;
        bool created;
    }

    address public treasury;
    address public admin;
    address public fundReceiver;

    IERC20 public soldToken;

    uint public totalRaiseAmount; // In Sold token
    uint public totalRaised; // in Offer currency

    uint public totalSold; // In Sold token

    bool public poolStatus;
    
    // Asset token -> Offered Currency (to $)
    mapping(address => OfferedCurrency) public offeredCurrencies;

    constructor(IERC20 _soldToken, address _treasury, address _fundReceiver, uint _totalRaiseAmount) {
        /// @dev: ZA - Zero address
        require(address(soldToken) != address(0), "ZA");
        require(_treasury != address(0), "ZA");
        require(_fundReceiver != address(0), "ZA");

        soldToken = _soldToken;
        treasury = _treasury;
        fundReceiver = _fundReceiver;
        totalRaiseAmount = _totalRaiseAmount;
        admin = msg.sender;
    }

    function buyTokenWithToken(address _offerToken, address _beneficiary, uint256 _amount) external whenNotPaused nonReentrant {
        OfferedCurrency memory offeredCurrency = offeredCurrencies[_offerToken];
        require(offeredCurrency.rate != 0, "PresalePool::Offer currency rate is invalid!");
        require(_verifyAllowance(msg.sender, _offerToken, _amount), "PresalePool::Allowance for offered token unreached!");

        uint soldTokenAmount = _getSoldTokensByOfferedCurrency(_offerToken, _amount);
        require(soldTokenAmount + totalSold <= totalRaiseAmount, "PresalePool::Purchase amount exceeds max amount!");

        _forwardFundTransfer(_offerToken, _amount);
        _deliverTokens(_beneficiary, soldTokenAmount);

        totalRaised = totalRaised + _amount;
        totalSold = totalSold + soldTokenAmount;

        emit BuyTokenByToken(_offerToken, _beneficiary, _amount, soldTokenAmount);
    }


    function setTotalRaiseAmount(uint256 _totalRaiseAmount) external onlyAdmin {
        totalRaiseAmount = _totalRaiseAmount;
    }

    // how to convert from 1 Token - to $
    function setOfferedCurrency(address _currency, uint _rate, uint _decimals) external onlyAdmin {
        OfferedCurrency storage offeredCurrency = offeredCurrencies[_currency];
        offeredCurrency.rate = _rate;
        offeredCurrency.decimals = _decimals;
    }

    function pause() external onlyAdmin {
        poolStatus = false;
        _pause();
    }

    function unpause() external onlyAdmin {
        poolStatus = true;
        _unpause();
    }

      function _verifyAllowance(address _user, address _token, uint _amount) internal view returns(bool) {
        uint allowance = IERC20(_token).allowance(_user, address(this));
        return allowance >= _amount;
    }

    function _getSoldTokensByOfferedCurrency(address _token, uint _amount) internal view returns(uint) {
        OfferedCurrency memory offeredCurrency = offeredCurrencies[_token];
        return _amount * offeredCurrency.rate / (10 ** offeredCurrency.decimals);      
    }

     function _deliverTokens(address _beneficiary, uint _amount) internal {
        TransferHelper.safeTransfer(address(soldToken), _beneficiary, _amount);
    }

    function _forwardFundTransfer(address _token, uint _value) internal {
        TransferHelper.safeTransferFrom(_token, msg.sender, fundReceiver, _value);
    }

    /// --------------------------------
    /// ------- Modifier Function ------
    /// --------------------------------

    modifier onlyAdmin() {
        require(msg.sender == admin, "Permission: User is not admin");
        _;
    }
}
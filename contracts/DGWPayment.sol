// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IERC20WithBurn } from "./interfaces/IERC20.sol";
import "./DChainBase.sol";

contract DGWPayment is DChainBase {
  using SafeERC20 for IERC20WithBurn;

  bytes32 public constant ORDER_COMPLETED_SLUG =
    keccak256(abi.encode("COMPLETED"));

  struct PaymentOrder {
    bytes32 id;
    uint256 amount;
    address recipient;
  }

  event OrderExecuted(
    bytes32 indexed id,
    address indexed recipient,
    uint256 amount
  );

  IERC20WithBurn public rewardToken;

  mapping(bytes32 => bool) public executedOrders;
  mapping(address => bool) public validExecutors;

  function initialize(
    address _owner,
    IERC20WithBurn _rewardToken
  ) external initializer {
    __DChainBase_init(_owner);

    require(address(_rewardToken) != address(0), "ZA");
    rewardToken = _rewardToken;

    validExecutors[_owner] = true;
  }

  function executePayment(PaymentOrder[] calldata orders) external {
    for (uint i; i < orders.length; ) {
      PaymentOrder memory order = orders[i];

      require(validExecutors[_msgSender()], "Not a valid executor !");
      require(!executedOrders[order.id], "Order already has been executed!");

      rewardToken.safeTransferFrom(_msgSender(), order.recipient, order.amount);
      executedOrders[order.id] = true;

      emit OrderExecuted(order.id, order.recipient, order.amount);

      unchecked {
        i++;
      }
    }

    emit OrderExecuted(ORDER_COMPLETED_SLUG, address(1), 0);
  }

  function updateExecutor(
    address _executor,
    bool status
  ) external onlyRole(OWNER_ROLE) {
    validExecutors[_executor] = status;
  }
}

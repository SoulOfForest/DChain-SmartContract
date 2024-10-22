// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DChainBase.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract DGWBlacklist is DChainBase {
  using EnumerableSet for EnumerableSet.AddressSet;

  EnumerableSet.AddressSet private blacklist;

  function initialize(address _owner) external initializer {
    __DChainBase_init(_owner);
    _setupRole(SUB_ADMIN_ROLE, _owner);
  }

  function queryBlackListPagination(
    uint page,
    uint maxItemsPerPage
  ) public view returns (address[] memory blacklisted) {
    blacklisted = new address[](maxItemsPerPage);

    uint startIndex = page * maxItemsPerPage;
    uint lastItem = page * maxItemsPerPage + maxItemsPerPage;

    if (blacklist.length() - 1 < lastItem) {
      lastItem = blacklist.length() - 1;
    }

    for (uint i = startIndex; i <= lastItem; ) {
      address blacklistedUser = blacklist.at(i);

      if (blacklistedUser == address(0)) {
        break;
      }

      blacklisted[i] = blacklistedUser;

      unchecked {
        i++;
      }
    }
  }

  function blacklisted(address _user) public view returns (bool) {
    return blacklist.contains(_user);
  }

  function addToBlacklist(
    address _user
  ) external onlyRole(SUB_ADMIN_ROLE) OnlyNotBlacklisted(_user) {
    blacklist.add(_user);
  }

  function removeFromBlacklist(
    address _user
  ) external onlyRole(SUB_ADMIN_ROLE) OnlyBlacklisted(_user) {
    blacklist.remove(_user);
  }

  modifier OnlyNotBlacklisted(address _user) {
    require(!blacklisted(_user), "blacklist: user is blacklisted");
    _;
  }

  modifier OnlyBlacklisted(address _user) {
    require(blacklisted(_user), "blacklist: user is not blacklisted");
    _;
  }
}

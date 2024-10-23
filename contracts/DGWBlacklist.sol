// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DChainBase.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract DGWBlacklist is DChainBase {
  using EnumerableSet for EnumerableSet.AddressSet;

  EnumerableSet.AddressSet private blacklist;

  function initialize(address _owner, address _subAdmin) external initializer {
    __DChainBase_init(_owner);
    _setupRole(SUB_ADMIN_ROLE, _owner);
    _setupRole(SUB_ADMIN_ROLE, _subAdmin);
  }

  function grantSubAdmin(address _subAdmin) external onlyRole(SUB_ADMIN_ROLE) {
    _setupRole(SUB_ADMIN_ROLE, _subAdmin);
  }

  function revokeSubAdmin(address _subAdmin) external onlyRole(SUB_ADMIN_ROLE) {
    _revokeRole(SUB_ADMIN_ROLE, _subAdmin);
  }

  function queryBlackListPagination(
    uint page,
    uint maxItemsPerPage
  ) public view returns (address[] memory blacklisted) {
    uint totalBlacklisted = blacklist.length();

    if (totalBlacklisted == 0) {
      blacklisted = new address[](0);
      return blacklisted;
    }

    uint startIndex = page * maxItemsPerPage;
    uint lastItem = page * maxItemsPerPage + maxItemsPerPage;

    if (totalBlacklisted - 1 < lastItem) {
      lastItem = totalBlacklisted;
    }

    blacklisted = new address[](
      lastItem >= startIndex ? lastItem - startIndex : 0
    );

    for (uint i = startIndex; i < lastItem; ) {
      address blacklistedUser = blacklist.at(i);

      if (blacklistedUser == address(0)) {
        break;
      }

      blacklisted[i - startIndex] = blacklistedUser;

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

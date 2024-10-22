// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDGWBlacklist {
  function blacklisted(address _user) external view returns (bool);
}

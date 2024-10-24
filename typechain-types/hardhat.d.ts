/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AccessControlUpgradeable__factory>;
    getContractFactory(
      name: "IAccessControlUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAccessControlUpgradeable__factory>;
    getContractFactory(
      name: "OwnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OwnableUpgradeable__factory>;
    getContractFactory(
      name: "Initializable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Initializable__factory>;
    getContractFactory(
      name: "PausableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableUpgradeable__factory>;
    getContractFactory(
      name: "ReentrancyGuardUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuardUpgradeable__factory>;
    getContractFactory(
      name: "ERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Upgradeable__factory>;
    getContractFactory(
      name: "ERC20PermitUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20PermitUpgradeable__factory>;
    getContractFactory(
      name: "IERC20PermitUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20PermitUpgradeable__factory>;
    getContractFactory(
      name: "ERC20BurnableUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20BurnableUpgradeable__factory>;
    getContractFactory(
      name: "ERC20CappedUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20CappedUpgradeable__factory>;
    getContractFactory(
      name: "IERC20MetadataUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20MetadataUpgradeable__factory>;
    getContractFactory(
      name: "IERC20Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Upgradeable__factory>;
    getContractFactory(
      name: "ContextUpgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ContextUpgradeable__factory>;
    getContractFactory(
      name: "EIP712Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712Upgradeable__factory>;
    getContractFactory(
      name: "ERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC165Upgradeable__factory>;
    getContractFactory(
      name: "IERC165Upgradeable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC165Upgradeable__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Burnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Burnable__factory>;
    getContractFactory(
      name: "ERC20Capped",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Capped__factory>;
    getContractFactory(
      name: "IERC20Metadata",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20Metadata__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "IUniswapV3Pool",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3Pool__factory>;
    getContractFactory(
      name: "IUniswapV3PoolActions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolActions__factory>;
    getContractFactory(
      name: "IUniswapV3PoolDerivedState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolDerivedState__factory>;
    getContractFactory(
      name: "IUniswapV3PoolErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolErrors__factory>;
    getContractFactory(
      name: "IUniswapV3PoolEvents",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolEvents__factory>;
    getContractFactory(
      name: "IUniswapV3PoolImmutables",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolImmutables__factory>;
    getContractFactory(
      name: "IUniswapV3PoolOwnerActions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolOwnerActions__factory>;
    getContractFactory(
      name: "IUniswapV3PoolState",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUniswapV3PoolState__factory>;
    getContractFactory(
      name: "TickMath",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TickMath__factory>;
    getContractFactory(
      name: "DChainBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DChainBase__factory>;
    getContractFactory(
      name: "DGEToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGEToken__factory>;
    getContractFactory(
      name: "DGEStaking",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGEStaking__factory>;
    getContractFactory(
      name: "DGEVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGEVault__factory>;
    getContractFactory(
      name: "DGWToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGWToken__factory>;
    getContractFactory(
      name: "DGWBlacklist",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGWBlacklist__factory>;
    getContractFactory(
      name: "DGWPayment",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGWPayment__factory>;
    getContractFactory(
      name: "DGWStaking",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGWStaking__factory>;
    getContractFactory(
      name: "DGWSwap",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGWSwap__factory>;
    getContractFactory(
      name: "DGWVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DGWVault__factory>;
    getContractFactory(
      name: "IDChainStaking",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDChainStaking__factory>;
    getContractFactory(
      name: "IDDXStaking",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDDXStaking__factory>;
    getContractFactory(
      name: "IDDXVault",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDDXVault__factory>;
    getContractFactory(
      name: "IDGWBlacklist",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IDGWBlacklist__factory>;
    getContractFactory(
      name: "IEACAggregatorProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IEACAggregatorProxy__factory>;
    getContractFactory(
      name: "IERC173",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC173__factory>;
    getContractFactory(
      name: "IERC20WithBurn",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20WithBurn__factory>;
    getContractFactory(
      name: "IKeeperCompatible",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IKeeperCompatible__factory>;
    getContractFactory(
      name: "IOracleSimple",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOracleSimple__factory>;
    getContractFactory(
      name: "IRegister",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IRegister__factory>;
    getContractFactory(
      name: "IUncxTokenVesting",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUncxTokenVesting__factory>;
    getContractFactory(
      name: "IVersioned",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVersioned__factory>;
    getContractFactory(
      name: "IPancakeFactory",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPancakeFactory__factory>;
    getContractFactory(
      name: "IPancakePair",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPancakePair__factory>;
    getContractFactory(
      name: "IPancakeRouter01",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPancakeRouter01__factory>;
    getContractFactory(
      name: "IPancakeRouter02",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IPancakeRouter02__factory>;
    getContractFactory(
      name: "DWOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.DWOracle__factory>;
    getContractFactory(
      name: "UpkeepLibrary",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UpkeepLibrary__factory>;
    getContractFactory(
      name: "MockERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockERC20__factory>;
    getContractFactory(
      name: "MockOracle",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MockOracle__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Proxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Proxy__factory>;
    getContractFactory(
      name: "ProxyAdmin",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ProxyAdmin__factory>;
    getContractFactory(
      name: "TransparentUpgradeableProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TransparentUpgradeableProxy__factory>;
    getContractFactory(
      name: "UpgradeableProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UpgradeableProxy__factory>;
    getContractFactory(
      name: "AbstractFiatTokenV1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AbstractFiatTokenV1__factory>;
    getContractFactory(
      name: "AbstractFiatTokenV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AbstractFiatTokenV2__factory>;
    getContractFactory(
      name: "Blacklistable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Blacklistable__factory>;
    getContractFactory(
      name: "EIP2612",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP2612__factory>;
    getContractFactory(
      name: "EIP3009",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP3009__factory>;
    getContractFactory(
      name: "EIP712Domain",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP712Domain__factory>;
    getContractFactory(
      name: "FiatTokenV1_1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FiatTokenV1_1__factory>;
    getContractFactory(
      name: "FiatTokenV1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FiatTokenV1__factory>;
    getContractFactory(
      name: "FiatTokenV2_1",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FiatTokenV2_1__factory>;
    getContractFactory(
      name: "FiatTokenV2",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FiatTokenV2__factory>;
    getContractFactory(
      name: "IERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IERC20__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "Rescuable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Rescuable__factory>;
    getContractFactory(
      name: "BasicToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasicToken__factory>;
    getContractFactory(
      name: "BlackList",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BlackList__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC20Basic",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Basic__factory>;
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "Pausable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Pausable__factory>;
    getContractFactory(
      name: "StandardToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StandardToken__factory>;
    getContractFactory(
      name: "TetherToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TetherToken__factory>;
    getContractFactory(
      name: "UpgradedStandardToken",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UpgradedStandardToken__factory>;
    getContractFactory(
      name: "OracleSimple",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OracleSimple__factory>;
    getContractFactory(
      name: "ImplementationRepository",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ImplementationRepository__factory>;
    getContractFactory(
      name: "UcuProxy",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.UcuProxy__factory>;
    getContractFactory(
      name: "VersionedImplementationRepository",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VersionedImplementationRepository__factory>;

    getContractAt(
      name: "AccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AccessControlUpgradeable>;
    getContractAt(
      name: "IAccessControlUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IAccessControlUpgradeable>;
    getContractAt(
      name: "OwnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OwnableUpgradeable>;
    getContractAt(
      name: "Initializable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Initializable>;
    getContractAt(
      name: "PausableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableUpgradeable>;
    getContractAt(
      name: "ReentrancyGuardUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuardUpgradeable>;
    getContractAt(
      name: "ERC20Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Upgradeable>;
    getContractAt(
      name: "ERC20PermitUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20PermitUpgradeable>;
    getContractAt(
      name: "IERC20PermitUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20PermitUpgradeable>;
    getContractAt(
      name: "ERC20BurnableUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20BurnableUpgradeable>;
    getContractAt(
      name: "ERC20CappedUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20CappedUpgradeable>;
    getContractAt(
      name: "IERC20MetadataUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20MetadataUpgradeable>;
    getContractAt(
      name: "IERC20Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Upgradeable>;
    getContractAt(
      name: "ContextUpgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ContextUpgradeable>;
    getContractAt(
      name: "EIP712Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712Upgradeable>;
    getContractAt(
      name: "ERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC165Upgradeable>;
    getContractAt(
      name: "IERC165Upgradeable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC165Upgradeable>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Burnable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Burnable>;
    getContractAt(
      name: "ERC20Capped",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Capped>;
    getContractAt(
      name: "IERC20Metadata",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20Metadata>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "IUniswapV3Pool",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3Pool>;
    getContractAt(
      name: "IUniswapV3PoolActions",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolActions>;
    getContractAt(
      name: "IUniswapV3PoolDerivedState",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolDerivedState>;
    getContractAt(
      name: "IUniswapV3PoolErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolErrors>;
    getContractAt(
      name: "IUniswapV3PoolEvents",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolEvents>;
    getContractAt(
      name: "IUniswapV3PoolImmutables",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolImmutables>;
    getContractAt(
      name: "IUniswapV3PoolOwnerActions",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolOwnerActions>;
    getContractAt(
      name: "IUniswapV3PoolState",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUniswapV3PoolState>;
    getContractAt(
      name: "TickMath",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TickMath>;
    getContractAt(
      name: "DChainBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DChainBase>;
    getContractAt(
      name: "DGEToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGEToken>;
    getContractAt(
      name: "DGEStaking",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGEStaking>;
    getContractAt(
      name: "DGEVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGEVault>;
    getContractAt(
      name: "DGWToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGWToken>;
    getContractAt(
      name: "DGWBlacklist",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGWBlacklist>;
    getContractAt(
      name: "DGWPayment",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGWPayment>;
    getContractAt(
      name: "DGWStaking",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGWStaking>;
    getContractAt(
      name: "DGWSwap",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGWSwap>;
    getContractAt(
      name: "DGWVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DGWVault>;
    getContractAt(
      name: "IDChainStaking",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDChainStaking>;
    getContractAt(
      name: "IDDXStaking",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDDXStaking>;
    getContractAt(
      name: "IDDXVault",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDDXVault>;
    getContractAt(
      name: "IDGWBlacklist",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IDGWBlacklist>;
    getContractAt(
      name: "IEACAggregatorProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IEACAggregatorProxy>;
    getContractAt(
      name: "IERC173",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC173>;
    getContractAt(
      name: "IERC20WithBurn",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20WithBurn>;
    getContractAt(
      name: "IKeeperCompatible",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IKeeperCompatible>;
    getContractAt(
      name: "IOracleSimple",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IOracleSimple>;
    getContractAt(
      name: "IRegister",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IRegister>;
    getContractAt(
      name: "IUncxTokenVesting",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IUncxTokenVesting>;
    getContractAt(
      name: "IVersioned",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IVersioned>;
    getContractAt(
      name: "IPancakeFactory",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPancakeFactory>;
    getContractAt(
      name: "IPancakePair",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPancakePair>;
    getContractAt(
      name: "IPancakeRouter01",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPancakeRouter01>;
    getContractAt(
      name: "IPancakeRouter02",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IPancakeRouter02>;
    getContractAt(
      name: "DWOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.DWOracle>;
    getContractAt(
      name: "UpkeepLibrary",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UpkeepLibrary>;
    getContractAt(
      name: "MockERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockERC20>;
    getContractAt(
      name: "MockOracle",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.MockOracle>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Proxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Proxy>;
    getContractAt(
      name: "ProxyAdmin",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ProxyAdmin>;
    getContractAt(
      name: "TransparentUpgradeableProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TransparentUpgradeableProxy>;
    getContractAt(
      name: "UpgradeableProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UpgradeableProxy>;
    getContractAt(
      name: "AbstractFiatTokenV1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AbstractFiatTokenV1>;
    getContractAt(
      name: "AbstractFiatTokenV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AbstractFiatTokenV2>;
    getContractAt(
      name: "Blacklistable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Blacklistable>;
    getContractAt(
      name: "EIP2612",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP2612>;
    getContractAt(
      name: "EIP3009",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP3009>;
    getContractAt(
      name: "EIP712Domain",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP712Domain>;
    getContractAt(
      name: "FiatTokenV1_1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FiatTokenV1_1>;
    getContractAt(
      name: "FiatTokenV1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FiatTokenV1>;
    getContractAt(
      name: "FiatTokenV2_1",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FiatTokenV2_1>;
    getContractAt(
      name: "FiatTokenV2",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FiatTokenV2>;
    getContractAt(
      name: "IERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.IERC20>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "Rescuable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Rescuable>;
    getContractAt(
      name: "BasicToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BasicToken>;
    getContractAt(
      name: "BlackList",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BlackList>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC20Basic",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Basic>;
    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "Pausable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Pausable>;
    getContractAt(
      name: "StandardToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StandardToken>;
    getContractAt(
      name: "TetherToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TetherToken>;
    getContractAt(
      name: "UpgradedStandardToken",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UpgradedStandardToken>;
    getContractAt(
      name: "OracleSimple",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OracleSimple>;
    getContractAt(
      name: "ImplementationRepository",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ImplementationRepository>;
    getContractAt(
      name: "UcuProxy",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.UcuProxy>;
    getContractAt(
      name: "VersionedImplementationRepository",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.VersionedImplementationRepository>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}

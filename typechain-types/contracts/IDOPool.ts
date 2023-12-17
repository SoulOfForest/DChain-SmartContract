/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface IDOPoolInterface extends utils.Interface {
  functions: {
    "Oracle()": FunctionFragment;
    "TEN_MINUTES()": FunctionFragment;
    "USDC()": FunctionFragment;
    "buyToken(uint256,address)": FunctionFragment;
    "getTotalTokenSold()": FunctionFragment;
    "getTotalUSDStakedAndBought(address)": FunctionFragment;
    "minAmount()": FunctionFragment;
    "nikaStaking()": FunctionFragment;
    "owner()": FunctionFragment;
    "paused()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "token()": FunctionFragment;
    "tokenSold()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "treasuryAddress()": FunctionFragment;
    "updateAddress(address,address,address,address)": FunctionFragment;
    "updateMinAmount(uint256)": FunctionFragment;
    "updateNikaStakingAddress(address)": FunctionFragment;
    "updateOracleAddress(address)": FunctionFragment;
    "updateTokenAddress(address)": FunctionFragment;
    "updateTreasuryWallet(address)": FunctionFragment;
    "updateUSDAddress(address)": FunctionFragment;
    "usdcBought(address)": FunctionFragment;
    "usdcUserBought(address,uint256)": FunctionFragment;
    "withdrawFundUSDC()": FunctionFragment;
    "withdrawToken(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "Oracle"
      | "TEN_MINUTES"
      | "USDC"
      | "buyToken"
      | "getTotalTokenSold"
      | "getTotalUSDStakedAndBought"
      | "minAmount"
      | "nikaStaking"
      | "owner"
      | "paused"
      | "renounceOwnership"
      | "token"
      | "tokenSold"
      | "transferOwnership"
      | "treasuryAddress"
      | "updateAddress"
      | "updateMinAmount"
      | "updateNikaStakingAddress"
      | "updateOracleAddress"
      | "updateTokenAddress"
      | "updateTreasuryWallet"
      | "updateUSDAddress"
      | "usdcBought"
      | "usdcUserBought"
      | "withdrawFundUSDC"
      | "withdrawToken"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "Oracle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "TEN_MINUTES",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "USDC", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buyToken",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalTokenSold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalUSDStakedAndBought",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "minAmount", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "nikaStaking",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(functionFragment: "tokenSold", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "treasuryAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "updateAddress",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "updateMinAmount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateNikaStakingAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateOracleAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTokenAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateTreasuryWallet",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateUSDAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "usdcBought",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "usdcUserBought",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFundUSDC",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "Oracle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "TEN_MINUTES",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "USDC", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "buyToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalTokenSold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalUSDStakedAndBought",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "minAmount", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "nikaStaking",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenSold", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "treasuryAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateMinAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateNikaStakingAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateOracleAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateTreasuryWallet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateUSDAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "usdcBought", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "usdcUserBought",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFundUSDC",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {
    "BuyToken(address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
    "UsdcBought(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BuyToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UsdcBought"): EventFragment;
}

export interface BuyTokenEventObject {
  _to: string;
  _amount: BigNumber;
}
export type BuyTokenEvent = TypedEvent<
  [string, BigNumber],
  BuyTokenEventObject
>;

export type BuyTokenEventFilter = TypedEventFilter<BuyTokenEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface UsdcBoughtEventObject {
  _user: string;
  _amount: BigNumber;
}
export type UsdcBoughtEvent = TypedEvent<
  [string, BigNumber],
  UsdcBoughtEventObject
>;

export type UsdcBoughtEventFilter = TypedEventFilter<UsdcBoughtEvent>;

export interface IDOPool extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDOPoolInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    Oracle(overrides?: CallOverrides): Promise<[string]>;

    TEN_MINUTES(overrides?: CallOverrides): Promise<[number]>;

    USDC(overrides?: CallOverrides): Promise<[string]>;

    buyToken(
      _amount: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getTotalTokenSold(overrides?: CallOverrides): Promise<[BigNumber]>;

    getTotalUSDStakedAndBought(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    minAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    nikaStaking(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    tokenSold(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    treasuryAddress(overrides?: CallOverrides): Promise<[string]>;

    updateAddress(
      _token: PromiseOrValue<string>,
      _usdc: PromiseOrValue<string>,
      _nikaStaking: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateMinAmount(
      _minAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateNikaStakingAddress(
      _nikaStaking: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateOracleAddress(
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateTokenAddress(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateTreasuryWallet(
      _wallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateUSDAddress(
      _usdc: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    usdcBought(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    usdcUserBought(
      _user: PromiseOrValue<string>,
      _amountNika: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFundUSDC(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawToken(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  Oracle(overrides?: CallOverrides): Promise<string>;

  TEN_MINUTES(overrides?: CallOverrides): Promise<number>;

  USDC(overrides?: CallOverrides): Promise<string>;

  buyToken(
    _amount: PromiseOrValue<BigNumberish>,
    _referrer: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getTotalTokenSold(overrides?: CallOverrides): Promise<BigNumber>;

  getTotalUSDStakedAndBought(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  minAmount(overrides?: CallOverrides): Promise<BigNumber>;

  nikaStaking(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  tokenSold(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  treasuryAddress(overrides?: CallOverrides): Promise<string>;

  updateAddress(
    _token: PromiseOrValue<string>,
    _usdc: PromiseOrValue<string>,
    _nikaStaking: PromiseOrValue<string>,
    _oracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateMinAmount(
    _minAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateNikaStakingAddress(
    _nikaStaking: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateOracleAddress(
    _oracle: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateTokenAddress(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateTreasuryWallet(
    _wallet: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateUSDAddress(
    _usdc: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  usdcBought(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  usdcUserBought(
    _user: PromiseOrValue<string>,
    _amountNika: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFundUSDC(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawToken(
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    Oracle(overrides?: CallOverrides): Promise<string>;

    TEN_MINUTES(overrides?: CallOverrides): Promise<number>;

    USDC(overrides?: CallOverrides): Promise<string>;

    buyToken(
      _amount: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    getTotalTokenSold(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalUSDStakedAndBought(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minAmount(overrides?: CallOverrides): Promise<BigNumber>;

    nikaStaking(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    tokenSold(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    treasuryAddress(overrides?: CallOverrides): Promise<string>;

    updateAddress(
      _token: PromiseOrValue<string>,
      _usdc: PromiseOrValue<string>,
      _nikaStaking: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateMinAmount(
      _minAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateNikaStakingAddress(
      _nikaStaking: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateOracleAddress(
      _oracle: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateTokenAddress(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateTreasuryWallet(
      _wallet: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateUSDAddress(
      _usdc: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    usdcBought(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    usdcUserBought(
      _user: PromiseOrValue<string>,
      _amountNika: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFundUSDC(overrides?: CallOverrides): Promise<void>;

    withdrawToken(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "BuyToken(address,uint256)"(
      _to?: PromiseOrValue<string> | null,
      _amount?: null
    ): BuyTokenEventFilter;
    BuyToken(
      _to?: PromiseOrValue<string> | null,
      _amount?: null
    ): BuyTokenEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;

    "UsdcBought(address,uint256)"(
      _user?: PromiseOrValue<string> | null,
      _amount?: null
    ): UsdcBoughtEventFilter;
    UsdcBought(
      _user?: PromiseOrValue<string> | null,
      _amount?: null
    ): UsdcBoughtEventFilter;
  };

  estimateGas: {
    Oracle(overrides?: CallOverrides): Promise<BigNumber>;

    TEN_MINUTES(overrides?: CallOverrides): Promise<BigNumber>;

    USDC(overrides?: CallOverrides): Promise<BigNumber>;

    buyToken(
      _amount: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getTotalTokenSold(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalUSDStakedAndBought(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    minAmount(overrides?: CallOverrides): Promise<BigNumber>;

    nikaStaking(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    tokenSold(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    treasuryAddress(overrides?: CallOverrides): Promise<BigNumber>;

    updateAddress(
      _token: PromiseOrValue<string>,
      _usdc: PromiseOrValue<string>,
      _nikaStaking: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateMinAmount(
      _minAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateNikaStakingAddress(
      _nikaStaking: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateOracleAddress(
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateTokenAddress(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateTreasuryWallet(
      _wallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateUSDAddress(
      _usdc: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    usdcBought(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    usdcUserBought(
      _user: PromiseOrValue<string>,
      _amountNika: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFundUSDC(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawToken(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    Oracle(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    TEN_MINUTES(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USDC(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyToken(
      _amount: PromiseOrValue<BigNumberish>,
      _referrer: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getTotalTokenSold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getTotalUSDStakedAndBought(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    minAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nikaStaking(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenSold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    treasuryAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    updateAddress(
      _token: PromiseOrValue<string>,
      _usdc: PromiseOrValue<string>,
      _nikaStaking: PromiseOrValue<string>,
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateMinAmount(
      _minAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateNikaStakingAddress(
      _nikaStaking: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateOracleAddress(
      _oracle: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateTokenAddress(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateTreasuryWallet(
      _wallet: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateUSDAddress(
      _usdc: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    usdcBought(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    usdcUserBought(
      _user: PromiseOrValue<string>,
      _amountNika: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFundUSDC(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

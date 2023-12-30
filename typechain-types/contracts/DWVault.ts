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

export interface DWVaultInterface extends utils.Interface {
  functions: {
    "admin()": FunctionFragment;
    "buyTokenWithToken(address,address,uint256)": FunctionFragment;
    "fundReceiver()": FunctionFragment;
    "offeredCurrencies(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "poolStatus()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setOfferedCurrency(address,uint256,uint256)": FunctionFragment;
    "setTotalRaiseAmount(uint256)": FunctionFragment;
    "soldToken()": FunctionFragment;
    "totalRaiseAmount()": FunctionFragment;
    "totalRaised()": FunctionFragment;
    "totalSold()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "treasury()": FunctionFragment;
    "unpause()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "admin"
      | "buyTokenWithToken"
      | "fundReceiver"
      | "offeredCurrencies"
      | "owner"
      | "pause"
      | "paused"
      | "poolStatus"
      | "renounceOwnership"
      | "setOfferedCurrency"
      | "setTotalRaiseAmount"
      | "soldToken"
      | "totalRaiseAmount"
      | "totalRaised"
      | "totalSold"
      | "transferOwnership"
      | "treasury"
      | "unpause"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "buyTokenWithToken",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "fundReceiver",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "offeredCurrencies",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "poolStatus",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setOfferedCurrency",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setTotalRaiseAmount",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "soldToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalRaiseAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalRaised",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "totalSold", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "treasury", values?: undefined): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "buyTokenWithToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "fundReceiver",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "offeredCurrencies",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "poolStatus", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setOfferedCurrency",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTotalRaiseAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "soldToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalRaiseAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalRaised",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "totalSold", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "treasury", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;

  events: {
    "BuyTokenByToken(address,address,uint256,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Paused(address)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "BuyTokenByToken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export interface BuyTokenByTokenEventObject {
  offerToken: string;
  beneficiary: string;
  amount: BigNumber;
  soldTokens: BigNumber;
}
export type BuyTokenByTokenEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  BuyTokenByTokenEventObject
>;

export type BuyTokenByTokenEventFilter = TypedEventFilter<BuyTokenByTokenEvent>;

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

export interface DWVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: DWVaultInterface;

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
    admin(overrides?: CallOverrides): Promise<[string]>;

    buyTokenWithToken(
      _offerToken: PromiseOrValue<string>,
      _beneficiary: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    fundReceiver(overrides?: CallOverrides): Promise<[string]>;

    offeredCurrencies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, boolean] & {
        decimals: BigNumber;
        rate: BigNumber;
        created: boolean;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    poolStatus(overrides?: CallOverrides): Promise<[boolean]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setOfferedCurrency(
      _currency: PromiseOrValue<string>,
      _rate: PromiseOrValue<BigNumberish>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setTotalRaiseAmount(
      _totalRaiseAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    soldToken(overrides?: CallOverrides): Promise<[string]>;

    totalRaiseAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalRaised(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalSold(overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    treasury(overrides?: CallOverrides): Promise<[string]>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  admin(overrides?: CallOverrides): Promise<string>;

  buyTokenWithToken(
    _offerToken: PromiseOrValue<string>,
    _beneficiary: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  fundReceiver(overrides?: CallOverrides): Promise<string>;

  offeredCurrencies(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, boolean] & {
      decimals: BigNumber;
      rate: BigNumber;
      created: boolean;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  poolStatus(overrides?: CallOverrides): Promise<boolean>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setOfferedCurrency(
    _currency: PromiseOrValue<string>,
    _rate: PromiseOrValue<BigNumberish>,
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setTotalRaiseAmount(
    _totalRaiseAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  soldToken(overrides?: CallOverrides): Promise<string>;

  totalRaiseAmount(overrides?: CallOverrides): Promise<BigNumber>;

  totalRaised(overrides?: CallOverrides): Promise<BigNumber>;

  totalSold(overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  treasury(overrides?: CallOverrides): Promise<string>;

  unpause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    admin(overrides?: CallOverrides): Promise<string>;

    buyTokenWithToken(
      _offerToken: PromiseOrValue<string>,
      _beneficiary: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    fundReceiver(overrides?: CallOverrides): Promise<string>;

    offeredCurrencies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, boolean] & {
        decimals: BigNumber;
        rate: BigNumber;
        created: boolean;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    poolStatus(overrides?: CallOverrides): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setOfferedCurrency(
      _currency: PromiseOrValue<string>,
      _rate: PromiseOrValue<BigNumberish>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    setTotalRaiseAmount(
      _totalRaiseAmount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    soldToken(overrides?: CallOverrides): Promise<string>;

    totalRaiseAmount(overrides?: CallOverrides): Promise<BigNumber>;

    totalRaised(overrides?: CallOverrides): Promise<BigNumber>;

    totalSold(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    treasury(overrides?: CallOverrides): Promise<string>;

    unpause(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "BuyTokenByToken(address,address,uint256,uint256)"(
      offerToken?: PromiseOrValue<string> | null,
      beneficiary?: PromiseOrValue<string> | null,
      amount?: null,
      soldTokens?: null
    ): BuyTokenByTokenEventFilter;
    BuyTokenByToken(
      offerToken?: PromiseOrValue<string> | null,
      beneficiary?: PromiseOrValue<string> | null,
      amount?: null,
      soldTokens?: null
    ): BuyTokenByTokenEventFilter;

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
  };

  estimateGas: {
    admin(overrides?: CallOverrides): Promise<BigNumber>;

    buyTokenWithToken(
      _offerToken: PromiseOrValue<string>,
      _beneficiary: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    fundReceiver(overrides?: CallOverrides): Promise<BigNumber>;

    offeredCurrencies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    poolStatus(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setOfferedCurrency(
      _currency: PromiseOrValue<string>,
      _rate: PromiseOrValue<BigNumberish>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setTotalRaiseAmount(
      _totalRaiseAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    soldToken(overrides?: CallOverrides): Promise<BigNumber>;

    totalRaiseAmount(overrides?: CallOverrides): Promise<BigNumber>;

    totalRaised(overrides?: CallOverrides): Promise<BigNumber>;

    totalSold(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    treasury(overrides?: CallOverrides): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    buyTokenWithToken(
      _offerToken: PromiseOrValue<string>,
      _beneficiary: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    fundReceiver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    offeredCurrencies(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    poolStatus(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setOfferedCurrency(
      _currency: PromiseOrValue<string>,
      _rate: PromiseOrValue<BigNumberish>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setTotalRaiseAmount(
      _totalRaiseAmount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    soldToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalRaiseAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalRaised(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSold(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    treasury(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

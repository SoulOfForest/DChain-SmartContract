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
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IDDXVaultInterface extends utils.Interface {
  functions: {
    "rewardApplicable()": FunctionFragment;
    "rewardFromDWStaking(address,uint256)": FunctionFragment;
    "startVestingTime()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "rewardApplicable"
      | "rewardFromDWStaking"
      | "startVestingTime"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "rewardApplicable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardFromDWStaking",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "startVestingTime",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "rewardApplicable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardFromDWStaking",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startVestingTime",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IDDXVault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IDDXVaultInterface;

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
    rewardApplicable(overrides?: CallOverrides): Promise<[boolean]>;

    rewardFromDWStaking(
      _beneficiary: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    startVestingTime(overrides?: CallOverrides): Promise<[BigNumber]>;
  };

  rewardApplicable(overrides?: CallOverrides): Promise<boolean>;

  rewardFromDWStaking(
    _beneficiary: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  startVestingTime(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    rewardApplicable(overrides?: CallOverrides): Promise<boolean>;

    rewardFromDWStaking(
      _beneficiary: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    startVestingTime(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    rewardApplicable(overrides?: CallOverrides): Promise<BigNumber>;

    rewardFromDWStaking(
      _beneficiary: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    startVestingTime(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    rewardApplicable(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardFromDWStaking(
      _beneficiary: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    startVestingTime(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}

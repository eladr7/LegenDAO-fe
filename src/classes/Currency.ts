import { AppCurrency } from "@keplr-wallet/types";

export interface ICurrency {
  readonly coinDenom: string;
  readonly coinMinimalDenom: string;
  readonly coinDecimals: number;
  readonly coinGeckoId?: string;
}

export const SCRT: AppCurrency = {
  coinDenom: "SCRT",
  coinMinimalDenom: "uscrt",
  coinDecimals: 6,
  coinGeckoId: "secret",
};

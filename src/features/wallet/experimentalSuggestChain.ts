import { SCRT } from "../../classes/Currency";
import { IChainInfo } from "../../classes/Wallet";

export const experimentalSuggestChain = async (
  currencies = [SCRT],
  feeCurrencies = [SCRT],
  stakeCurrency = SCRT,
  chain = "secret",
  gasPriceStep = {
    low: 0.01,
    average: 0.025,
    high: 0.03,
  },
) => {
  const chainId = process.env.REACT_APP_NETWORK_CHAINID || "";
  const chainInfo: IChainInfo = {
    chainId,
    chainName: "Secret Testnet" || "",
    rpc: process.env.REACT_APP_NETWORK_RPC || "",
    rest: process.env.REACT_APP_NETWORK_REST || "",
    bip44: {
      coinType: 529,
    },
    bech32Config: {
      bech32PrefixAccAddr: chain,
      bech32PrefixAccPub: chain + "pub",
      bech32PrefixValAddr: chain + "valoper",
      bech32PrefixValPub: chain + "valoperpub",
      bech32PrefixConsAddr: chain + "valcons",
      bech32PrefixConsPub: chain + "valconspub",
    },
    coinType: 118,
    currencies,
    feeCurrencies,
    stakeCurrency,
    gasPriceStep,
  };

  return await window.keplr?.experimentalSuggestChain(chainInfo);
};

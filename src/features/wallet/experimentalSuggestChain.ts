import { SCRT } from "../../classes/Currency";
import { IChainInfo } from "../../classes/Wallet";

export const experimentalSuggestChain = async (
  currencies = [SCRT],
  feeCurrencies = [SCRT],
  stakeCurrency = SCRT,
  gasPriceStep = {
    low: 25,
    average: 50,
    high: 100,
  },
) => {
  const chainId = process.env.REACT_APP_NETWORK_CHAINID || "";
  const chain = chainId.split("-")[0];
  const chainInfo: IChainInfo = {
    chainId,
    chainName: process.env.REACT_APP_NETWORK_CHAIN_NAME || "",
    rpc: process.env.REACT_APP_NETWORK_RPC || "",
    rest: process.env.REACT_APP_NETWORK_REST || "",
    bip44: {
      coinType: 118,
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

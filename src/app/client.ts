/* eslint-disable no-console */
import { Permission, SecretNetworkClient, StdSignature } from "secretjs";
import { AccountData } from "secretjs/dist/wallet_amino";

export const createClient = async () => {
    const chainId: string = process.env.REACT_APP_NET_CHAIN_ID || "";
    const grpcWebUrl: string = process.env.REACT_APP_NET_URL_RPC || "";
    if (!chainId && !grpcWebUrl) return;
    const offlineSigner = await window.keplr?.getOfflineSignerOnlyAmino(chainId);
    const accounts = await offlineSigner?.getAccounts();
    return await SecretNetworkClient.create({
        grpcWebUrl,
        chainId,
        wallet: offlineSigner,
        walletAddress: (accounts as AccountData[])[0].address,
    });
};

export const getSigner = async (
    chainId: string,
    address: string,
    params: {
        permit_name: string;
        permissions: Permission[];
        allowed_tokens: string[];
    }
): Promise<StdSignature | undefined> => {
    try {
        if (window.keplr) {
            await window.keplr.enable(chainId);
            const { signature } = await window.keplr.signAmino(
                chainId as string,
                address as string,
                {
                    chain_id: chainId as string,
                    account_number: "0", // Must be 0
                    sequence: "0", // Must be 0
                    fee: {
                        amount: [{ denom: "uscrt", amount: "0" }], // Must be 0 uscrt
                        gas: "1", // Must be 1
                    },
                    msgs: [
                        {
                            type: "query_permit", // Must be "query_permit"
                            value: params,
                        },
                    ],
                    memo: "", // Must be empty
                },
                {
                    preferNoSetFee: true, // Fee must be 0, so hide it from the user
                    preferNoSetMemo: true, // Memo must be empty, so hide it from the user
                }
            );
            return signature;
        } else {
            return undefined;
        }
    } catch (error) {
        console.warn(error);
    }
};

import { SecretNetworkClient } from "secretjs";
import { AccountData } from "secretjs/dist/wallet_amino";

export const createCli = async () => {
    const url = new URL(process.env.REACT_APP_NETWORK_RPC || "");
    url.port = process.env.REACT_APP_RPC_PORT || "";
    const urlString = url.toString();
    const chainId = process.env.REACT_APP_NETWORK_CHAINID || "";
    const offlineSigner =
    window.getOfflineSigner &&
    window.getOfflineSigner(process.env.REACT_APP_NETWORK_CHAINID || "");
    
    const accounts = await offlineSigner?.getAccounts();

    return await SecretNetworkClient.create({
        grpcWebUrl: urlString,
        chainId: chainId,
        wallet: offlineSigner,
        walletAddress: (accounts as AccountData[])[0].address,
    });
};

export const getAccounts = async (): Promise<AccountData[]> => {
    const offlineSigner =
        window.getOfflineSigner &&
        window.getOfflineSigner(process.env.REACT_APP_NETWORK_CHAINID || "");

    const accounts = await offlineSigner?.getAccounts();

    return (accounts as AccountData[]);
};

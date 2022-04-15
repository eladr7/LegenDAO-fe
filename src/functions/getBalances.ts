import { AccountData } from "secretjs/dist/wallet_amino";
import { createCli, getAccounts } from "./contract";

export const getAllBlances = async () => {
    const contract = await createCli();

    const accounts = await getAccounts();
    const allBlances = await contract.query.bank.allBalances({
        address: (accounts as AccountData[])[0].address,
    });

    return allBlances;
};

export const getBalanceToken = async (denom: string) => {
    const contract = await createCli();

    const accounts = await getAccounts();
    const balanceToken = await contract.query.bank.balance({
        address: (accounts as AccountData[])[0].address,
        denom,
    });

    return balanceToken;
};

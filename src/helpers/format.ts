import BigNumber from "bignumber.js";

export const shortenAddress = (string?: string, start?: number, end?: number): string => {
    if (typeof string !== "string") return "";
    return (string.slice(0, start || 7) + "..." + string.slice(-(end || 6))).toLowerCase();
};

export const formatBalance = (str: string | number, decimals = 6): string => {
    const balance = new BigNumber(str).div(new BigNumber(10).pow(decimals));
    return balance.isNaN() ? "0" : balance.toFixed();
};

export const parseBalance = (str: string | number, decimals = 6): string => {
    const balance = new BigNumber(str).times(new BigNumber(10).pow(decimals));
    return balance.toFixed();
};

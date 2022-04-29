import BigNumber from "bignumber.js";

export const shortenAddress = (string?: string, start?: number, end?: number): string => {
    if (typeof string !== "string") return "";
    return (string.slice(0, start || 7) + "..." + string.slice(-(end || 6))).toLowerCase();
};

export const formatBalance = (str: string | number, decimals = 6): string => {
    if (!str) return "0";
    const balance = new BigNumber(str).div(new BigNumber(10).pow(decimals));
    return balance.isNaN() ? "0" : balance.toFixed();
};

export const parseBalance = (str: string | number, decimals = 6): string => {
    const balance = new BigNumber(str).times(new BigNumber(10).pow(decimals));
    return balance.toFixed();
};

export const formatIntBalance = (num: string | number, decimals= 6) => {
    const balanceSplit = String(num).split(".");

    if (balanceSplit.length === 1 || balanceSplit[1] === "0") {
        const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
        });

        return formatter.format(Number(balanceSplit[0]) || 0);
    } else {
        const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
        });
        if (balanceSplit[1].length < decimals) {
            return `${formatter.format(Number(balanceSplit[0]))}.${balanceSplit[1]}`;
        } else {
            return `${formatter.format(Number(balanceSplit[0]))}.${balanceSplit[1].slice(
                0,
                decimals
            )}`;
        }
    }
};

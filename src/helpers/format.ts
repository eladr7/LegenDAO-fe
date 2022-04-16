export const shortenAddress = (string?: string, start?: number, end?: number): string => {
    if (typeof string !== "string") return "";
    return (string.slice(0, start || 7) + "..." + string.slice(-(end || 6))).toLowerCase();
};

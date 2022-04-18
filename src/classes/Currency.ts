const DENOMINATIONS = ["uscrt", "lgnd"] as const;
const COINGECKO_ID = ["secret", "legend"] as const;
export type TDenomination = typeof DENOMINATIONS[number];
export type TCoingeckoId = typeof COINGECKO_ID[number];
export const COIN_TYPES = {
    scrt: 529, // Secret Network
    atom: 118, // Cosmos Hub
};

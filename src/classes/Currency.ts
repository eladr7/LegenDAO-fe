const DENOMINATIONS = ["uscrt", "lgnd"] as const;
export type TDenomination = typeof DENOMINATIONS[number];
export const COIN_TYPES = {
    scrt: 529, // Secret Network
    atom: 118, // Cosmos Hub
};

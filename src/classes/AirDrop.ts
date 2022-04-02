const AIRDROP_STATUSES = ["eligible", "not/eligible"] as const;

export type TAirDropStatus = typeof AIRDROP_STATUSES[number];

export type TAirDropStatusDict = {
    [key in TAirDropStatus]: {
        type: key;
        name?: string;
    };
};

export const AIRDROP_STATUS_DICT: TAirDropStatusDict = {
    eligible: {
        type: "eligible",
        name: "Eligible",
    },
    "not/eligible": {
        type: "not/eligible",
        name: "Not Eligible",
    },
};

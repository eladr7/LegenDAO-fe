import BigNumber from "bignumber.js";
import { addressToBytes } from "secretjs";

const inputingFloat = (
    e: React.KeyboardEvent<HTMLInputElement>,
    pre: string,
    decimals?: number
) => {
    if (e.ctrlKey && /[aA]/.test(e.key)) return true;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") return true;
    if (e.key === "End" || e.key === "Home") return true;
    if (e.key === "Backspace" || e.key === "Delete") return true;
    if (!/[0-9.]/.test(e.key) || (e.key === "." && pre.includes("."))) return false;
    if (pre.includes(".") && pre.split(".")[1].length === (decimals || 6)) return false;
    return true;
};

const REGEXP_TWITTER_PROFILE = /^(?=[a-zA-Z0-9._])(?!.*[_.]{2})[^_.].*[^_.]$/;
const REGEXP_DISCORD_USER_ID = /^.{3,32}#[0-9]{4}$/;
const SUPPORT_CHAIN = ["secret", "cosmos", "terra"];
const REGEXP_EMAIL = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const validateForm = {
    walletAddress: {
        validate: (val: string) => {
            const index = SUPPORT_CHAIN.findIndex((key) => {
                return val.indexOf(key) === 0;
            });
            if (!val) {
                return "This field is required.";
            }
            if (!isAddress(val) || index === -1) {
                return "Address not valid, please enter a valid address.";
            }
        },
    },
    twitterProfile: {
        validate: (val: string) => {
            if (!val) {
                return "This field is required.";
            }
            if (!REGEXP_TWITTER_PROFILE.test(val) || val.toLowerCase() === "here" || val.toLowerCase() === "everyone") {
                return "Invalid profile. Please try again.";
            }
        },
    },
    discordUserId: {
        validate: (val: string) => {
            if (!val) {
                return "This field is required.";
            }
            if (!REGEXP_DISCORD_USER_ID.test(val)) {
                return "Invalid ID. Please try again.";
            }
        },
    },
    email: {
        validate: (val: string) => {
            if (!REGEXP_EMAIL.test(val) && val) {
                return "Invalid email address.";
            }
        },
    },
    requireField: {
        required: (val: string) => {
            if (!val) {
                return "This field is required.";
            }
        },
    },
};

const inputAmount = (amount: string, balance: string): string => {
    if (!amount) {
        return "This field is required.";
    } else if (new BigNumber(amount).isZero()) {
        return "Invalid input.";
    } else if (new BigNumber(amount).gt(balance)) {
        return "Insufficient balance.";
    } else {
        return "";
    }
};

const isAddress = (address: string) => {
    try {
        addressToBytes(address);
        return true;
    } catch (error) {
        return false;
    }
};

const validator = {
    inputingFloat,
    validateForm,
    inputAmount,
};

export default validator;

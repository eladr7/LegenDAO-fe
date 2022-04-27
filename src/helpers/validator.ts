import { addressToBytes } from "secretjs";

const inputingFloat = (e: React.KeyboardEvent<HTMLInputElement>, pre: string) => {
    if (e.ctrlKey && /[aA]/.test(e.key)) return true;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") return true;
    if (e.key === "End" || e.key === "Home") return true;
    if (e.key === "Backspace" || e.key === "Delete") return true;
    if (!/[0-9.]/.test(e.key) || (e.key === "." && pre.includes("."))) return false;
    return true;
};

const REGEXP_TWITTER_PROFILE = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
const REGEXP_DISCORD_USER_ID = /^.{3,32}#[0-9]{4}$/;
const SUPPORT_CHAIN = ["secret", "cosmos", "terra"];

const validateForm = {
    walletAddress: {
        validate: (val: string) => {
            const index = SUPPORT_CHAIN.findIndex(key => {
                return val.indexOf(key) === 0;
            });

            if (!isAddress(val) || index === -1) {
                return "Address not valid. Please enter a valid address.";
            }
            if (!val) {
                return "This field is required.";
            }
        },
    },
    twitterProfile: {
        validator: (val: string) => {
            if (!REGEXP_TWITTER_PROFILE.test(val)) {
                return "Twitter profile is not valid, please enter a valid profile";
            }
            if (!val) {
                return "This field is required.";
            }
        }
    },
    discordUserId: {
        validator: (val: string) => {
            if (!REGEXP_DISCORD_USER_ID.test(val)) {
                return "Twitter profile is not valid, please enter a valid profile";
            }
            if (!val) {
                return "This field is required.";
            }
        }
    },
};

const validator = {
    inputingFloat,
    validateForm,
};

export default validator;

const isAddress = (address: string) => {
    try {
        addressToBytes(address);
        return true;
    } catch (error) {
        return false;
    }
};

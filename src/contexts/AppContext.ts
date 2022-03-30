import React from "react";

export type TAppContext = {
    state: {
        bodyElement?: HTMLBodyElement;
        successMessage?: string;
        errorMessage?: string;
    };
    setBodyElement: React.Dispatch<React.SetStateAction<HTMLBodyElement | undefined>>;
    setSuccessMessage?: React.Dispatch<React.SetStateAction<string | undefined>>;
    setErrorMessage?: React.Dispatch<React.SetStateAction<string | undefined>>;
};

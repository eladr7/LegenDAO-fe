import React from "react";
import cn from "classnames";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Icon({
    children,
    className,
}: Props): React.ReactElement {
    return (
        <svg
            className={cn("w-full h-full select-none cursor-pointer", className ? className : "fill-slate-700")}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            {children}
        </svg>
    );
}

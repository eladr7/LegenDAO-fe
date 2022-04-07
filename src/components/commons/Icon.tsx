import React from "react";
import cn from "classnames";

type Props = {
    children: React.ReactNode;
    className?: string;
    size?: number;
};

export default function Icon({
    children,
    className,
    size = 24,
}: Props): React.ReactElement {
    return (
        <svg
            className={cn("w-full h-full select-none cursor-pointer", className ? className : "fill-white")}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            {children}
        </svg>
    );
}

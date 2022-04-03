import React from "react";
import cn from "classnames";

interface IProps extends React.BaseHTMLAttributes<HTMLDivElement> {
    bFullScreen?: boolean;
}

export default function Article({ children, bFullScreen, className, ...props }: IProps): React.ReactElement {
    return (
        <div
            className={cn(
                "relative flex flex-row flex-nowrap justify-between items-stretch",
                "bg-no-repeat overflow-hidden font-light",
                { "min-h-screen": bFullScreen },
                className || "min-h-[700px]",
            )}
            {...props}
        >
            {children}
        </div>
    );
}

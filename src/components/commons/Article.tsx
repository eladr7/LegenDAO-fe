import React, { useCallback } from "react";
import cn from "classnames";

interface IProps extends React.BaseHTMLAttributes<HTMLDivElement> {
    bFullScreen?: boolean;
}

export default function Article({
    children,
    bFullScreen,
    className,
    ...props
}: IProps): React.ReactElement {
    const getDefaultHeightClasses = useCallback(() => {
        return bFullScreen ? "min-h-screen" : "min-h-[700px]";
    }, [bFullScreen]);

    return (
        <div
            className={cn(
                "relative flex flex-row flex-nowrap justify-between items-stretch",
                "bg-no-repeat overflow-hidden font-light",
                { "min-h-screen": bFullScreen },
                className || getDefaultHeightClasses()
            )}
            {...props}
        >
            {children}
        </div>
    );
}

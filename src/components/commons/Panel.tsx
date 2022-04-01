import React, { useCallback } from "react";
import cn from "classnames";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    borderWith?: number;
    borderRadius?: number;
};

export default function Panel({
    borderRadius = 14,
    borderWith = 1,
    children,
}: Props): React.ReactElement {
    const calcClampedBorderWith = useCallback(() => {
        return Math.min(2, borderWith);
    }, [borderWith]);

    const calcOuterBorderRadius = useCallback(() => {
        return Math.max(10, borderRadius);
    }, [borderRadius]);

    const calcInnerBorderRarius = useCallback(() => {
        return calcOuterBorderRadius() - calcClampedBorderWith();
    }, [calcClampedBorderWith, calcOuterBorderRadius]);

    return (
        <div className="relative p-8 z-10">
            <div
                className={cn(
                    `p-[${calcClampedBorderWith()}px] rounded-[${calcOuterBorderRadius()}px]`,
                    "absolute top-0 left-0 bottom-0 right-0 -z-10",
                    "bg-gradient-to-br from-violet-200/75 to-violet-900/75",
                    "flex flex-col flex-none items-stretch"
                )}
            >
                <div
                    className={cn(
                        "grow",
                        "bg-gradient-to-br from-violet-500/50 via-violet-700/50 to-violet-700/50",
                        `rounded-[${calcInnerBorderRarius()}px]`,
                        "backdrop-filter backdrop-blur-sm"
                    )}
                ></div>
            </div>
            <div className="z-10">{children}</div>
        </div>
    );
}

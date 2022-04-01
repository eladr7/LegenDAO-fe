import React, { useCallback } from "react";
import cn from "classnames";
import CloseIcon from "../icons/CloseIcon";

type Props = React.BaseHTMLAttributes<HTMLDivElement> & {
    borderWith?: number;
    borderRadius?: number;
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function Panel({
    borderRadius = 14,
    borderWith = 1,
    onCloseBtnClicked,
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

    const renderCloseBtn = useCallback(() => {
        if (!onCloseBtnClicked) return null;
        return (
            <div className="p-2 absolute top-8 right-8">
                <div className="w-icon-sm h-icon-sm grow-0 shrink-0" onClick={onCloseBtnClicked}>
                    <CloseIcon />
                </div>
            </div>
        );
    }, [onCloseBtnClicked]);

    return (
        <div className="relative p-8 z-10">
            <div
                className={cn(
                    `p-[${calcClampedBorderWith()}px] rounded-[${calcOuterBorderRadius()}px]`,
                    "absolute top-0 left-0 bottom-0 right-0 -z-10",
                    "bg-gradient-to-br from-white/25 to-violet-900/75",
                    "flex flex-col flex-none items-stretch"
                )}
            >
                <div
                    className={cn(
                        "grow",
                        "bg-gradient-to-br from-violet-600/50 via-violet-700/25 to-violet-700/25",
                        `rounded-[${calcInnerBorderRarius()}px]`,
                        "backdrop-filter backdrop-blur-sm"
                    )}
                ></div>
            </div>
            {renderCloseBtn()}
            <div className="z-10">{children}</div>
        </div>
    );
}

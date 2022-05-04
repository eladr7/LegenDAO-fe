import React from "react";
import cn from "classnames";
import QuestionIcon from "../icons/QuestionIcon";
import Panel from "./Panel";
type Props = {
    className?: string;
};

export default function SecretCollectionCard({ className }: Props) {
    return (
        <div className={cn("w-[260px] h-[320px]", "opacity-75", className)}>
            <Panel color="darker">
                <div className="flex flex-col flex-nowrap justify-between items-center">
                    <div className="w-[50px] h-[80px] lg:w-[150px] lg:h-[200px] grow-0 shrink-0 opacity-75">
                        <QuestionIcon />
                    </div>
                    <div className="font-semibold text-center text-md">Top Secret Collection</div>
                </div>
            </Panel>
        </div>
    );
}

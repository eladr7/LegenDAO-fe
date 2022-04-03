import React from "react";
import cn from "classnames";
import QuestionIcon from "../icons/QuestionIcon";
import Panel from "./Panel";

export default function SecretCollectionCard(): React.ReactElement {
    return (
        <div className={cn("w-[230px] h-[320px]", "opacity-75")}>
            <Panel>
                <div className="flex flex-col flex-nowrap justify-between items-center">
                    <div className="w-[150px] h-[200px] grow-0 shrink-0 opacity-75">
                        <QuestionIcon />
                    </div>
                    <div className="font-semibold text-center text-xl">Top Secret Collection</div>
                </div>
            </Panel>
        </div>
    );
}

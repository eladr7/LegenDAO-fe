import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";
import { TMintAgent } from "../classes/MintAgent";

type Props = {
    mintAgent: TMintAgent;
    onCloseBtnClicked?: React.MouseEventHandler<HTMLElement>;
};

export default function MintAgentDetailPanel({
    mintAgent,
    onCloseBtnClicked,
}: Props): React.ReactElement {
    return (
        <Panel className="text-white" onCloseBtnClicked={onCloseBtnClicked}>
            <div className={cn("flex flex-col items-stretch justify-start")}>
                <div className="py-4 border-b last:border-b-0 border-white/10 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-blue-300">Description</div>
                    <div className="mb-2 last:mb-0">{mintAgent.description}</div>
                </div>
                <div className="py-4 border-b last:border-b-0 border-white/10 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-blue-300">Public Attributes</div>
                    <div className="mb-2 last:mb-0 grid grid-cols-3 gap-4">
                        {mintAgent.publicAttributes?.map((attr, attrIndex) => {
                            return (
                                <div
                                    key={attrIndex}
                                    className="bg-slate-900 rounded-lg py-2 text-center truncate"
                                >
                                    {attr}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="py-4 border-b last:border-b-0 border-white/10 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-blue-300">Private Attributes</div>
                    <div className="mb-2 last:mb-0 grid grid-cols-3 gap-4">
                        {mintAgent.privateAttributes?.map((attr, attrIndex) => {
                            return (
                                <div
                                    key={attrIndex}
                                    className="bg-slate-900 rounded-lg py-2 text-center truncate"
                                >
                                    {attr}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="py-4 border-b last:border-b-0 border-white/10 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-blue-300">Royalties</div>
                    <div
                        className={cn(
                            "mb-2 last:mb-0 flex flex-col flex-nowrap justify-between items-start overflow-hidden",
                            "tablet-2:flex-row tablet-2:items-center"
                        )}
                    >
                        <div className="grow break-all text-sm tablet-2:text-base">
                            {mintAgent.token}
                        </div>
                        <div className="mt-4 tablet-2:mt-0 tablet-2:ml-4 first:ml-0 bg-slate-900 px-8 h-input rounded-lg flex justify-center items-center">
                            {mintAgent.royalties}%
                        </div>
                    </div>
                </div>
                <div className="py-4 border-b last:border-b-0 border-white/10 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 text-blue-300">More Details</div>
                </div>
            </div>
        </Panel>
    );
}

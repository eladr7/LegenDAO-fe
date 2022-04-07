import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";

export default function ProfileItemsPanel(): React.ReactElement {
    return (
        <Panel>
            <div className="mb-4 last:mb-0 text-teal-200 text-xl">Items</div>
            <div className="grid grid-cols-3 gap-4">
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "flex justify-center items-center text-center text-sm font-semibold cursor-pointer"
                    )}
                >
                    Comming Soon
                </div>
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "flex justify-center items-center text-center text-sm font-semibold cursor-pointer"
                    )}
                >
                    Comming Soon
                </div>
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "flex justify-center items-center text-center text-sm font-semibold cursor-pointer"
                    )}
                >
                    Comming Soon
                </div>

                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "flex justify-center items-center text-center text-sm font-semibold cursor-pointer"
                    )}
                >
                    Comming Soon
                </div>
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "flex justify-center items-center text-center text-sm font-semibold cursor-pointer"
                    )}
                >
                    Comming Soon
                </div>
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "flex justify-center items-center text-center text-sm font-semibold cursor-pointer"
                    )}
                >
                    Comming Soon
                </div>
            </div>
        </Panel>
    );
}

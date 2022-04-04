import React from "react";
import cn from "classnames";
import Panel from "./commons/Panel";

import imgSword01 from "./../assets/images/sword-01.png";

export default function ProfileMyCollectionPanel(): React.ReactElement {
    return (
        <Panel>
            <div className="mb-4 last:mb-0">My Collection</div>
            <div className="grid grid-cols-2 gap-4">
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "bg-contain bg-center bg-no-repeat cursor-pointer"
                    )}
                    style={{backgroundImage: `url(${imgSword01})`}}
                ></div>
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "bg-contain bg-center bg-no-repeat cursor-pointer"
                    )}
                    style={{backgroundImage: `url(${imgSword01})`}}
                ></div>
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "bg-contain bg-center bg-no-repeat cursor-pointer"
                    )}
                    style={{backgroundImage: `url(${imgSword01})`}}
                ></div>
                <div
                    className={cn(
                        "w-[100px] h-[100px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                        "bg-contain bg-center bg-no-repeat cursor-pointer"
                    )}
                    style={{backgroundImage: `url(${imgSword01})`}}
                ></div>
            </div>
        </Panel>
    );
}

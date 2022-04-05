import React from "react";
import cn from "classnames";

type Props = {
    bChecked?: boolean;
};

export default function CheckBox({ bChecked }: Props): React.ReactElement {
    return (
        <div
            className={cn(
                "w-icon-sm h-icon-sm grow-0 shrink-0 bg-slate-900 rounded p-1 select-none cursor-pointer"
            )}
        >
            {bChecked && <div className="bg-white rounded-sm w-full h-full"></div>}
        </div>
    );
}

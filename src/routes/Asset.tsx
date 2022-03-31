import React from "react";
import cn from "classnames";
import { VoidLayout } from "../components/layouts/VoidLayout";
import imgYeti01 from "./../assets/images/yeti-01.png";
import imgYeti02 from "./../assets/images/yeti-02.png";
import imgYetiSleep01 from "./../assets/images/yeti-sleep-01.png";
import imgTank01 from "./../assets/images/tank-01.png";
import imgTank01Filter from "./../assets/images/tank-01-filter.png";
import imgTank01Line01 from "./../assets/images/tank-01-line-01.png";
import imgTank01Line02 from "./../assets/images/tank-01-line-02.png";
import imgTank01Line03 from "./../assets/images/tank-01-line-03.png";
import imgMountain01 from "./../assets/images/mountain-01.png";
import imgLab01 from "./../assets/images/lab-01.png";

export function Asset(): React.ReactElement {
    return (
        <VoidLayout>
            <div className="mt-12 mb-4 last:mb-0 first:mt-0">
                <h1 className="text-white">Welcome Page</h1>
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]">
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgYeti01})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgYeti02})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgYetiSleep01})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgTank01})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgTank01Filter})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgTank01Line01})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgTank01Line02})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgTank01Line03})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgMountain01})` }}
                ></div>
                <div
                    className={cn(
                        "w-[300px] h-[300px]",
                        "bg-no-repeat bg-center bg-contain",
                        "border border-white rounded-lg"
                    )}
                    style={{ backgroundImage: `url(${imgLab01})` }}
                ></div>
            </div>

            <div className="mt-12 mb-4 last:mb-0 first:mt-0">
                <h1 className="text-white">Domain Pages</h1>
            </div>
        </VoidLayout>
    );
}

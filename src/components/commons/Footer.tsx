import React from "react";
import cn from "classnames";
import imgYetiHead01 from "../../assets/images/yeti-head-01.png";
import DiscordIcon from "../icons/DiscordIcon";
import TwitterIcon from "../icons/TwitterIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TelegramIcon from "../icons/TelegramIcon";
import Input from "./Input";

export function Footer(): React.ReactElement {
    return (
        <div className="h-footer bg-gray-900 text-white flex flex-row justify-around items-center">
            <div className="flex flex-row flex-nowrap justify-start items-center">
                <div
                    className="bg-cover bg-center bg-no-repeat w-[150px] h-[120px] mr-8 last:mr-0"
                    style={{ backgroundImage: `url(${imgYetiHead01})` }}
                ></div>
                <div className="flex flex-col flex-nowrap">
                    <div className="font-semibold text-2xl">The SOD</div>
                    <div className="font-bold text-4xl leading-none">Universe</div>
                </div>
            </div>
            <div className="flex flex-col flex-nowrap items-center">
                <div className="font-bold mb-4 last:mb-0">Join our community</div>
                <div className="flex flex-row flex-nowrap items-center">
                    <div className="w-icon-lg h-iconw-icon-lg grow-0 shrink-0 mr-8 last:mr-0">
                        <DiscordIcon className="fill-slate-300" />
                    </div>
                    <div className="w-icon-lg h-iconw-icon-lg grow-0 shrink-0 mr-8 last:mr-0">
                        <TwitterIcon className="fill-slate-300" />
                    </div>
                    <div className="w-icon-lg h-iconw-icon-lg grow-0 shrink-0 mr-8 last:mr-0">
                        <InstagramIcon className="fill-slate-300" />
                    </div>
                    <div className="w-icon-lg h-iconw-icon-lg grow-0 shrink-0 mr-8 last:mr-0">
                        <TelegramIcon className="fill-slate-300" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-nowrap items-center">
                <div className="font-bold mb-4 last:mb-0">Stay in the loop</div>
                <div className="opacity-50 max-w-[450px] font-light">
                    Join our mailing list to be the first one to hear about{" "}
                    <span className="whitespace-nowrap">new collection</span>, feature releases tips
                    and tricks.
                </div>
            </div>
            <div>
                <Input className="text-slate-700" type="email" placeholder="Your email" />
            </div>
        </div>
    );
}

import React from "react";
import cn from "classnames";
import Article from "./commons/Article";

import imgMountain02 from "./../assets/images/mountain-02.png";

export default function MountainsOfSodArticle(): React.ReactElement {
    return (
        <Article className="min-h-[900px]">
            <div
                className={cn(
                    "absolute top-0 bottom-0 right-0 left-0",
                    "bg-no-repeat bg-cover bg-center"
                )}
                style={{ backgroundImage: `url(${imgMountain02})` }}
            ></div>

            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 h-[200px] z-20",
                    "bg-gradient-to-t from-slate-900 to-slate-900/0"
                )}
            ></div>

            <div
                className={cn(
                    "absolute top-0 left-0 right-0 h-[200px] z-20",
                    "bg-gradient-to-b from-slate-900 to-slate-900/0"
                )}
            ></div>

            <div className="relative w-1/2 z-10">
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 w-1/2",
                        "bg-gradient-to-l from-slate-900 to-slate-900/0"
                    )}
                ></div>
            </div>

            <div
                className={cn(
                    "w-1/2 z-20 bg-slate-900 px-16",
                    "text-white flex flex-col flex-nowrap justify-center items-start"
                )}
            >
                <h1 className="mb-8 last:mb-0 font-bold text-5xl">The Mountains of Sod</h1>
                <div className="mb-8 last:mb-0 max-w-2xl">
                    <p className="mb-4 last:mb-0 opacity-75 text-lg">
                        Hidden in the secret mountain ridge of Sod, hide the true creators of
                        Secret. These mythical apes, known colloquially as Sasquatch, Bigfoot and
                        Yeti, have long eluded humanity&apos;s grasp. They are a friendly bunch,
                        who&apos;ve kept mostly to themselves since the dawn of time. Having seen
                        mankind&apos;s rise from primates to a dominating, yet destructive force,
                        these peaceful creatures have long sought a way to help humanity rise from
                        its violent tendencies and into a fair, sustainable society.
                    </p>

                    <p className="mb-4 last:mb-0 opacity-75 text-lg">
                        They&apos;ve seen our species fail before, as has happened with the ancient
                        Atlantean and Egyptian civilizations, now lost to the great sea and sands of
                        time. But the rise of information-technology has, for the first time ever,
                        given them hope that humanity is going in the right direction. A world wide
                        web connecting the farthest reaches of Earth together, allowing information
                        to travel in sub-second speeds from pole to pole.
                    </p>
                    <p className="mb-4 last:mb-0 opacity-75 text-lg">
                        Alas, things have again not turned out the way they&apos;d hoped. The
                        internet as we know it today has turned from a decentralized, open-access
                        system that was meant to lower the barriers of entry and avoid
                        centralization of power, into a tool allowing conglomerates and governments
                        to amass power, data and control faster than ever before. In 2010, shortly
                        after the days of the last financial crisis and the invention of Bitcoin and
                        blockchain, they finally saw an opportunity to intervene, and help steer
                        humanity back onto the right track.
                    </p>
                </div>
            </div>
        </Article>
    );
}

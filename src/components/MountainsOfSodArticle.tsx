import React from "react";
import cn from "classnames";
import Article from "./commons/Article";

import imgArticlePlatform02Background from "./../assets/images/article-platform-02-background.png";
import { useMediaQuery } from "../app/hooks";

export default function MountainsOfSodArticle(): React.ReactElement {
    const mediaQuery = useMediaQuery();

    return (
        <Article
            style={{
                backgroundImage: mediaQuery.checkMatchMinWidth(1024)
                    ? `url(${imgArticlePlatform02Background})`
                    : "",
            }}
            className="lg:min-h-[1200px] min-h-[700px]  bg-cover"
        >
            <div
                className={cn(
                    "lg:w-1/2 z-20 px-5 lg:px-16 lg:ml-[45%] ",
                    "text-white flex flex-col flex-nowrap justify-center items-start"
                )}
            >
                <h1 className="mb-8 last:mb-0 font-bold text-2xl lg:text-5xl">The Hidden Ridge</h1>
                <div className="mb-8 last:mb-0 max-w-[840px]">
                    <p className="mb-10 last:mb-0 opacity-75 text-paragraph">
                        Hidden in the secret mountain ridge of Sod, hide the true creators of
                        Secret. These mythical apes, known colloquially as Sasquatch, Bigfoot and
                        Yeti, have long eluded humanity&apos;s grasp. They are a friendly bunch,
                        who&apos;ve kept mostly to themselves since the dawn of time. Having seen
                        mankind&apos;s rise from primates to a dominating, yet destructive force,
                        these peaceful creatures have long sought a way to help humanity rise from
                        its violent tendencies and into a fair, sustainable society.
                    </p>

                    <p className="mb-10 last:mb-0 opacity-75 text-paragraph">
                        They&apos;ve seen our species fail before, as has happened with the ancient
                        Atlantean and Egyptian civilizations, now lost to the great sea and sands of
                        time. But the rise of information-technology has, for the first time ever,
                        given them hope that humanity is going in the right direction. A world wide
                        web connecting the farthest reaches of Earth together, allowing information
                        to travel in sub-second speeds from pole to pole.
                    </p>
                    <p className="mb-10 last:mb-0 opacity-75 text-paragraph">
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

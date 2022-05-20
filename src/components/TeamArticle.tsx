import React, { useMemo } from "react";
import cn from "classnames";
import Article from "./commons/Article";
import TeamMemberCard from "./TeamMemberCard";
import Guy from "../assets/images/LGDTeam/Guy.png";
import Itzik from "../assets/images/LGDTeam/Itzik.png";
import Assaf from "../assets/images/LGDTeam/Assaf.png";
import Tom from "../assets/images/LGDTeam/Tom.png";
import Reuven from "../assets/images/LGDTeam/Reuven.png";
import Yonatan from "../assets/images/LGDTeam/Yonatan.png";
import Nir from "../assets/images/LGDTeam/Nir.png";
import Shahar from "../assets/images/LGDTeam/Shahar.png";
import Eshel from "../assets/images/LGDTeam/Eshel.png";
import Elad from "../assets/images/LGDTeam/Elad.png";
import Lior from "../assets/images/LGDTeam/Lior.png";
import Tovi from "../assets/images/LGDTeam/Tovi.png";

export default function TeamArticle(): React.ReactElement {
    const teamMemberArr = useMemo(
        () => [
            { name: "Guy", position: "CEO", img: Guy },
            { name: "Itzik", position: "CTO", img: Itzik },
            { name: "Assaf", position: "Developer", img: Assaf },
            { name: "Tom", position: "Developer", img: Tom },
            { name: "Reuven", position: "Developer", img: Reuven },
            { name: "Yonatan", position: "Head of Product", img: Yonatan },
            { name: "Nir", position: "Head of Business Development", img: Nir },
            { name: "Shahar", position: "Head of Marketing", img: Shahar },
            { name: "Eshel", position: "Developer", img: Eshel },
            { name: "Elad", position: "Developer", img: Elad },
            { name: "Lior", position: "Developer", img: Lior },
            { name: "Tovi", position: "Developer", img: Tovi },
        ],
        []
    );
    return (
        <Article className=" px-5 lg:px-16 py-8 !pt-16  lg:py-16 lg:mb-14">
            <div
                className={cn(
                    "absolute top-0 bottom-0 right-0 left-0",
                    "bg-no-repeat bg-cover bg-center bg-primary-mint-lab"
                )}
            ></div>

            <div
                className={cn(
                    "grow z-20 bg-primary-mint-lab ",
                    "text-white flex flex-col flex-nowrap justify-center items-center overflow-hidden "
                )}
            >
                <h1 className=" mb-6 lg:mb-20 last:mb-0 font-bold text-2xl lg:text-5xl">
                    The Legendary Team
                </h1>
                <div
                    className={cn(
                        "w-full flex flex-row flex-nowrap gap-8 ",
                        "overflow-x-scroll snap-x scrollbar-none",
                        " lg:grid lg:grid-cols-4  lg:justify-items-center lg:items-center"
                    )}
                >
                    {teamMemberArr.map((item, i) => {
                        return (
                            <TeamMemberCard
                                classname="snap-start flex-none"
                                key={i}
                                name={item.name}
                                position={item.position}
                                img={item.img}
                            />
                        );
                    })}
                </div>
            </div>
        </Article>
    );
}

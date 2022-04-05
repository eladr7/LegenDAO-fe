import Article from "../components/commons/Article";
import cn from "classnames";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import imgMountain01 from "./../assets/images/mountain-01.png";
import imgLab01 from "./../assets/images/lab-01.png";
import Button from "../components/commons/Button";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MintLabStatusPanel from "../components/MintLabStatusPanel";

function Home(): React.ReactElement {
    const navigate = useNavigate();

    const handleOnMintLabLaunchBtnClicked = useCallback(() => {
        navigate("/mint-lab");
    }, [navigate]);

    return (
        <DefaultLayout headerType="intro" sidebarTab="tab/home">
            <Article bFullScreen className="text-white">
                <div className="absolute top-[25%] left-0 right-0 z-20 flex justify-center items-center">
                    <h1 className="font-bold leading-none text-8xl tracking-[1.5rem]">LEGENDAO</h1>
                </div>
                <div
                    className={cn(
                        "relative w-1/2 z-10 bg-slate-900 px-16 pb-28",
                        "flex flex-col flex-nowrap justify-end items-center",
                        "bg-no-repeat bg-cover bg-left-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgLab01})` }}
                >
                    <div
                        className={cn("absolute top-0 left-0 right-0 bottom-0", "bg-cyan-900/50")}
                    ></div>
                    <div
                        className={cn("absolute top-0 left-0 right-0 bottom-0", "bg-slate-900/40")}
                    ></div>

                    <div className="absolute top-0 left-0 right-0 bottom-0 font-bold text-5xl flex justify-center items-center">
                        Mint Lab
                    </div>

                    <div className="flex flex-col flex-nowrap z-10">
                        <div className="mb-8 last:mb-0">
                            <MintLabStatusPanel price={0.5} apy={55} liquidity={25} volume={2.5} />
                        </div>
                        <div className="mb-8 last:mb-0 flex flex-col justify-center items-center">
                            <Button onClick={handleOnMintLabLaunchBtnClicked}>Launch</Button>
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        "relative w-1/2 z-10 bg-slate-900 px-16 pb-28",
                        "flex flex-col flex-nowrap justify-end items-center",
                        "bg-no-repeat bg-cover bg-right-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgMountain01})` }}
                >
                    <div
                        className={cn("absolute top-0 left-0 right-0 bottom-0", "bg-red-900/25")}
                    ></div>
                    <div
                        className={cn("absolute top-0 left-0 right-0 bottom-0", "bg-slate-900/40")}
                    ></div>

                    <div className="absolute top-0 left-0 right-0 bottom-0 font-bold text-5xl flex justify-center items-center">
                        Legend Universe
                    </div>
                    <div className="flex flex-col flex-nowrap z-10">
                        <Button bTransparent disabled>
                            Comming Soon
                        </Button>
                    </div>
                </div>
            </Article>
        </DefaultLayout>
    );
}

export default Home;

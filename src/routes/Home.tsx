import Article from "../components/commons/Article";
import cn from "classnames";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import imgTank01 from "./../assets/images/tank-01.png";
import imgYetiSleep01 from "./../assets/images/yeti-sleep-01.png";
import imgTank01Filter from "./../assets/images/tank-01-filter.png";
import imgYeti01 from "./../assets/images/yeti-01.png";
import imgYeti02 from "./../assets/images/yeti-02.png";
import imgMountain01 from "./../assets/images/mountain-01.png";
import imgLab01 from "./../assets/images/lab-01.png";
import Button from "../components/commons/Button";
import { useCallback } from "react";
import MintLabStatusPanel from "../components/MintLabStatusPanel";
import { Footer } from "../components/commons/Footer";

function Home(): React.ReactElement {
    const handleOnMintLabLaunchBtnClicked = useCallback(() => {
        window.open("/mint-lab", "_blank");
    }, []);

    return (
        <DefaultLayout headerType="intro" sidebarTab="tab/home">
            <Article bFullScreen className="text-white">
                <div className="absolute top-28 tablet-2:top-[25%] left-0 right-0 z-20 flex justify-center items-center">
                    <h1 className="font-bold leading-none text-4xl tablet-2:text-8xl tracking-widest tablet-2:tracking-[1.5rem]">
                        LEGENDAO
                    </h1>
                </div>

                <div className="grow flex flex-col tablet-2:flex-row justify-start tablet-2:justify-between">
                    <div
                        className={cn(
                            "relative w-full tablet-2:w-1/2 z-10 bg-slate-900 px-16 pb-28",
                            "flex flex-col flex-nowrap justify-end items-center",
                            "bg-no-repeat bg-cover bg-left-bottom",
                            "h-screen tablet-2:h-auto"
                        )}
                        style={{ backgroundImage: `url(${imgLab01})` }}
                    >
                        <div
                            className={cn(
                                "absolute left-0 bottom-20 w-[200px] h-[500px]",
                                "tablet-2:w-[400px] tablet-2:h-[1000px]",
                                "bg-no-repeat bg-contain bg-left-bottom"
                            )}
                            style={{ backgroundImage: `url(${imgTank01})` }}
                        ></div>
                        <div
                            className={cn(
                                "absolute left-0 bottom-52 w-[180px] h-[300px]",
                                "tablet-2:bottom-60 tablet-2:w-[380px] tablet-2:h-[700px]",
                                "bg-no-repeat bg-contain bg-left-bottom"
                            )}
                            style={{ backgroundImage: `url(${imgYetiSleep01})` }}
                        ></div>
                        <div
                            className={cn(
                                "absolute left-0 bottom-36 w-[180px] h-[320px]",
                                "tablet-2: tablet-2:w-[350px] tablet-2:h-[700px]",
                                "bg-no-repeat bg-contain bg-left-bottom"
                            )}
                            style={{ backgroundImage: `url(${imgTank01Filter})` }}
                        ></div>

                        <div
                            className={cn(
                                "absolute top-0 left-0 right-0 bottom-0",
                                "bg-cyan-900/50"
                            )}
                        ></div>
                        <div
                            className={cn(
                                "absolute top-0 left-0 right-0 bottom-0",
                                "bg-slate-900/40"
                            )}
                        ></div>

                        <div className="absolute px-4 tablet-2:px-0 top-0 left-0 right-0 bottom-0 font-bold flex flex-col justify-center items-center">
                            <h1 className="mb-8 tablet-2:mb-0 text-4xl tablet-2:text-5xl">
                                Mint Lab
                            </h1>
                            <div className="tablet-2:hidden">
                                <Button
                                    bigness="lg"
                                    onClick={handleOnMintLabLaunchBtnClicked}
                                >
                                    <span className="px-12 text-lg">Launch</span>
                                </Button>
                            </div>
                        </div>

                        <div className="hidden tablet-2:flex flex-col flex-nowrap z-10">
                            <div className="mb-8 last:mb-0">
                                <MintLabStatusPanel
                                    price={0.5}
                                    apy={55}
                                    liquidity={25}
                                    volume={2.5}
                                />
                            </div>
                            <div className="mb-8 last:mb-0 flex flex-col justify-center items-center">
                                <Button bigness="lg" onClick={handleOnMintLabLaunchBtnClicked}>
                                    <span className="px-12 text-lg">Launch</span>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={cn(
                            "relative w-full tablet-2:w-1/2 z-10 bg-slate-900 px-16 pb-28",
                            "flex flex-col flex-nowrap justify-end items-center",
                            "bg-no-repeat bg-cover bg-bottom tablet:bg-right-bottom",
                            "h-screen tablet-2:h-auto"
                        )}
                        style={{ backgroundImage: `url(${imgMountain01})` }}
                    >
                        <div
                            className={cn(
                                "absolute right-0 bottom-0 w-2/3 tablet:w-3/4 h-3/4",
                                "bg-no-repeat bg-contain bg-right-bottom"
                            )}
                            style={{ backgroundImage: `url(${imgYeti01})` }}
                        ></div>
                        <div
                            className={cn(
                                "absolute left-0 bottom-0 w-1/2 tablet:w-2/3 h-2/3",
                                "bg-no-repeat bg-contain bg-left-bottom"
                            )}
                            style={{ backgroundImage: `url(${imgYeti02})` }}
                        ></div>

                        <div
                            className={cn(
                                "absolute top-0 left-0 right-0 bottom-0",
                                "bg-pink-600/40"
                            )}
                        ></div>
                        <div
                            className={cn(
                                "absolute top-0 left-0 right-0 bottom-0",
                                "bg-slate-900/40"
                            )}
                        ></div>

                        <div className="absolute px-4 tablet-2:px-0 top-0 left-0 right-0 bottom-0 font-bold flex flex-col justify-center items-center">
                            <h1 className="mb-8 tablet-2:mb-0 text-center text-4xl tablet-2:text-5xl">
                                Legend Universe
                            </h1>
                            <div className="tablet-2:hidden">
                                <Button bigness="lg" bTransparent bPlaceholder disabled>
                                    <span className="px-4 text-lg">Coming Soon</span>
                                </Button>
                            </div>
                        </div>
                        <div className="hidden tablet-2:flex flex-col flex-nowrap z-10">
                            <Button bigness="lg" bTransparent bPlaceholder disabled>
                                <span className="px-4 text-lg">Coming Soon</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Article>

            <Article bFullScreen className="tablet-2:hidden text-white">
                <div
                    className={cn(
                        "relative w-full bg-[#001b47] px-16",
                        "flex tablet-2:hidden flex-col flex-nowrap justify-center items-center",
                        "h-screen tablet-2:h-auto"
                    )}
                >
                    <MintLabStatusPanel price={0.5} apy={55} liquidity={25} volume={2.5} />
                </div>
            </Article>

            <div className="tablet-2:hidden w-full">
                <Footer />
            </div>
        </DefaultLayout>
    );
}

export default Home;

import cn from "classnames";
import { useCallback } from "react";
import { useAppSelector } from "../app/hooks";
import Article from "../components/commons/Article";
import Button from "../components/commons/Button";
import { Footer } from "../components/commons/Footer";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import MintLabStatusPanel from "../components/MintLabStatusPanel";
import imgLab01 from "./../assets/images/lab-01.png";
import imgMountain01 from "./../assets/images/mountain-01.png";
import imgYeti01 from "./../assets/images/yeti-01.png";
import imgYeti02 from "./../assets/images/yeti-02.png";

interface IStatus {
    price: number;
    apy: number;
    liquidity: number;
    dailyVolume: number;
}

function Home(): React.ReactElement {
    const { tokenData } = useAppSelector((state) => state.wallet);

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
                                <Button bigness="lg" onClick={handleOnMintLabLaunchBtnClicked}>
                                    <span className="px-12 text-lg">Launch</span>
                                </Button>
                            </div>
                        </div>

                        <div className="hidden tablet-2:flex flex-col flex-nowrap z-10">
                            <div className="mb-8 last:mb-0">
                                <MintLabStatusPanel
                                    price={(tokenData as IStatus).price}
                                    apy={(tokenData as IStatus).apy}
                                    liquidity={(tokenData as IStatus).liquidity}
                                    volume={(tokenData as IStatus).dailyVolume}
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
                                "absolute left-0 bottom-0 w-1/2 tablet:w-[40%] h-2/3",
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
                    <MintLabStatusPanel
                        price={(tokenData as IStatus).price}
                        apy={(tokenData as IStatus).apy}
                        liquidity={(tokenData as IStatus).liquidity}
                        volume={(tokenData as IStatus).dailyVolume}
                    />
                </div>
            </Article>

            <div className="tablet-2:hidden w-full">
                <Footer />
            </div>
        </DefaultLayout>
    );
}

export default Home;

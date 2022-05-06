import React, { useCallback, useContext, useEffect } from "react";
import cn from "classnames";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";

import imgTopSecretCol01 from "./../assets/images/top-secret-col-01.png";
import imgTopSecretColBg01 from "./../assets/images/top-secret-col-background-01.png";
import imgTopSecretColMintBg01 from "./../assets/images/top-secret-col-mint-background-01.png";
import DiscordIcon from "../components/icons/DiscordIcon";
import TwitterIcon from "../components/icons/TwitterIcon";
import Panel from "../components/commons/Panel";
import Button from "../components/commons/Button";
import CollectionItem from "../components/CollectionItem";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setWhitelistSpot, toggleEnter } from "../features/collection/collectionSlice";
import CheckIcon from "../components/icons/CheckIcon";
import AppContext from "../contexts/AppContext";
import Modal from "../components/commons/Modal";
import MintConfirmPurchasePanel from "../components/MintConfirmPurchasePanel";
import {
    toggleMintConfirmPurchasePanel,
    turnOffAllPanel,
} from "../features/accessibility/accessibilitySlice";
import { setSuccessMessage } from "../features/mint/mintSlice";
import MintAgentDetailPanel from "../components/MintAgentDetailPanel";
import { SOCIAL_NETWORK_URL } from "../constants/linkSocial";
import { useNavigate } from "react-router-dom";
import { transactionActions } from "../features/transaction/transactionSlice";
import { cryptidsServices } from "../app/commons/cryptidsServices";
import { Footer } from "../components/commons/Footer";

export default function MyCollections(): React.ReactElement {
    const navigate = useNavigate();
    const { state } = useContext(AppContext);
    const collectionState = useAppSelector((state) => state.collection);
    const walletState = useAppSelector((state) => state.wallet);
    const accessibilityState = useAppSelector((state) => state.accessibility);
    const mintState = useAppSelector((state) => state.mint);
    const dispatch = useAppDispatch();

    const handleOnMintAgainBtnClicked = useCallback(() => {
        dispatch(transactionActions.sendTokenFromPlatformToContract({}));
        dispatch(setSuccessMessage(undefined));
        dispatch(turnOffAllPanel());
        dispatch(toggleMintConfirmPurchasePanel(true));
    }, [dispatch]);

    const handleOnMintSuccessfulModalOuterClicked = useCallback(() => {
        dispatch(turnOffAllPanel());
        dispatch(setSuccessMessage(undefined));
    }, [dispatch]);

    const handleOnGetWhitelistSpotBtnClicked = useCallback(() => {
        window.open("https://discord.com/invite/nRFUkj3sxZ", "_blank");
    }, []);

    const handleOnMyCollectionBtnClicked = useCallback(() => {
        navigate("/profile/collected");
    }, [navigate]);

    const handleOnEnterBtnClicked = useCallback(() => {
        dispatch(toggleEnter(true));
    }, [dispatch]);

    const handleOnMintBtnClicked = useCallback(() => {
        dispatch(toggleMintConfirmPurchasePanel(true));
    }, [dispatch]);

    const handleOnMintCloseBtnClicked = useCallback(() => {
        dispatch(toggleMintConfirmPurchasePanel(false));
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            try {
                if (!walletState?.primary?.address) return;
                const res = await cryptidsServices.isWhiteListed(walletState?.primary?.address);
                if (res.status === 200) {
                    dispatch(setWhitelistSpot(res.data.whitelist));
                }
            } catch (error) {
                dispatch(setWhitelistSpot(false));
            }
        })();
    }, [dispatch, walletState?.primary?.address]);

    const renderFollowingCollections = useCallback(() => {
        return (
            <div className="mt-8 tablet-2:mt-24 px-4 tablet-2:px-16 flex flex-col flex-nowrap">
                <div className="mb-4 last:mb-0 font-semibold text-xl text-[#B3BBC9]">
                    Following Collections
                </div>
                <div
                    className={cn(
                        "flex grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6 overflow-x-auto",
                        "tablet-2:grid tablet-2:grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))] tablet-2:gap-10 tablet-2:overflow-x-hidden"
                    )}
                >
                    <CollectionItem
                        coverImgUrl={imgTopSecretColBg01}
                        name="Hall of Legend"
                        description="There is a hall, full of legends that being kept by
                mysteries creatures"
                        startingDate={new Date(2022, 3, 18)}
                        totalItemNum={5555}
                        mintPrice={25}
                    />

                    <CollectionItem
                        coverImgUrl={imgTopSecretColBg01}
                        name="Hall of Legend"
                        description="There is a hall, full of legends that being kept by
                mysteries creatures"
                        startingDate={new Date(2022, 3, 18)}
                        totalItemNum={5555}
                        mintPrice={25}
                    />
                </div>
            </div>
        );
    }, []);

    const renderDomainPanel = useCallback(() => {
        if (!collectionState.bEntered) {
            return (
                <div
                    className="relative w-full max-w-[700px] h-[300px] tablet-2:h-[500px] bg-no-repeat bg-cover container bg-center flex justify-center items-center"
                    style={{ backgroundImage: `url(${imgTopSecretCol01})` }}
                >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/75"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-900/25"></div>
                    <Button bigness="lg" className="z-10" onClick={handleOnEnterBtnClicked}>
                        <span className="px-12">Enter</span>
                    </Button>
                </div>
            );
        }

        return (
            <div
                className={cn(
                    "relative flex justify-center items-center",
                    "w-full max-w-[700px] h-[300px] tablet-2:h-[500px] bg-no-repeat container bg-cover bg-center"
                )}
                style={{ backgroundImage: `url(${imgTopSecretColMintBg01})` }}
            >
                {!mintState.agent && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/70"></div>
                )}
                {!mintState.agent && (
                    <Button
                        bigness="lg"
                        onClick={handleOnMintBtnClicked}
                        className="z-10"
                        bTransparent={!collectionState.whitelistSpot}
                        disabled={!collectionState.whitelistSpot}
                    >
                        <span className="px-12">Mint</span>
                    </Button>
                )}
            </div>
        );
    }, [
        collectionState.bEntered,
        collectionState.whitelistSpot,
        handleOnEnterBtnClicked,
        handleOnMintBtnClicked,
        mintState.agent,
    ]);

    const renderModal = useCallback(() => {
        if (!state.bodyElement) return null;
        if (accessibilityState.bMintConfirmPurchasePanelOn) {
            return (
                <Modal bodyElement={state.bodyElement} onOuterClick={handleOnMintCloseBtnClicked}>
                    <MintConfirmPurchasePanel
                        onCloseBtnClicked={handleOnMintCloseBtnClicked}
                        priceInLGND={25}
                        priceInFiat={70.5}
                        itemCoverUrl={imgTopSecretColMintBg01}
                    />
                </Modal>
            );
        }

        if (accessibilityState.bMintSuccessfulPanelOn) {
            return (
                <Modal
                    bodyElement={state.bodyElement}
                    onOuterClick={handleOnMintSuccessfulModalOuterClicked}
                >
                    <Panel
                        className="text-white"
                        onCloseBtnClicked={handleOnMintSuccessfulModalOuterClicked}
                    >
                        <div className={cn("flex flex-col items-stretch justify-start")}>
                            <h1 className="mb-6 last:mb-0 text-xl font-bold">Mint Successful!</h1>
                            <div className="mb-6 last:mb-0">{mintState.successMessage}</div>
                            <div
                                className={cn(
                                    "mb-6 w-full h-[200px] bg-no-repeat bg-cover bg-center",
                                    "tablet-2:hidden tablet-2:w-[150px] tablet-2:h-[100px] tablet-2:mb-0"
                                )}
                                style={{ backgroundImage: `url(${imgTopSecretColMintBg01})` }}
                            ></div>
                            <div className="flex flex-col items-stretch">
                                <Button onClick={handleOnMintAgainBtnClicked}>Mint Again</Button>
                            </div>
                            <div className="mt-4 w-full text-center opacity-75 tablet-2:hidden">
                                <span onClick={handleOnMintSuccessfulModalOuterClicked}>Back</span>
                            </div>
                        </div>
                    </Panel>
                </Modal>
            );
        }
    }, [
        accessibilityState.bMintConfirmPurchasePanelOn,
        accessibilityState.bMintSuccessfulPanelOn,
        handleOnMintAgainBtnClicked,
        handleOnMintCloseBtnClicked,
        handleOnMintSuccessfulModalOuterClicked,
        mintState.successMessage,
        state.bodyElement,
    ]);

    const renderInfo = useCallback(() => {
        if (mintState.agent) {
            return (
                <div
                    className={cn(
                        "w-full tablet-2:w-1/2 px-4 tablet-2:px-8 pl-4 tablet-2:pl-16 mt-28",
                        "flex flex-col flex-nowrap justify-start items-start"
                    )}
                >
                    <div className="flex flex-col flex-nowrap">
                        <h1 className="mb-8 last:mb-0 font-bold text-3xl tablet-2:text-5xl">
                            Top Secret <span className="tablet-2:hidden">Mobile</span> Collection
                        </h1>
                        <div className="mb-8 last:mb-0">{mintState.agent.name}</div>

                        <div
                            className={cn(
                                "mb-6 w-full h-[200px] bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden",
                                "tablet-2:hidden tablet-2:w-[150px] tablet-2:h-[100px] tablet-2:mb-0"
                            )}
                            style={{ backgroundImage: `url(${imgTopSecretColMintBg01})` }}
                        ></div>

                        <MintAgentDetailPanel mintAgent={mintState.agent} />
                        <div className="mt-8 tablet-2:hidden">
                            <Button className="w-full" onClick={handleOnMintBtnClicked}>
                                Mint
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div
                className={cn(
                    "w-full tablet-2:w-1/2 px-4 tablet-2:px-8 pl-4 tablet-2:pl-16 mt-28",
                    "flex flex-col flex-nowrap justify-start items-start"
                )}
            >
                <div className="flex flex-col flex-nowrap items-stretch w-full max-w-[627px]">
                    <h1 className="mb-4 tablet-2:mb-8 last:mb-0 font-bold text-3xl tablet-2:text-5xl">
                        Top Secret <span className="tablet-2:hidden">Mobile</span> Collection
                    </h1>
                    <div className="mb-4 flex flex-row tablet-2:hidden">
                        <div
                            className="ml-8 first:ml-0 w-icon h-icon grow-0 shrink-0"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.discord, "_blank");
                            }}
                        >
                            <DiscordIcon />
                        </div>
                        <div
                            className="ml-8 first:ml-0 w-icon h-icon grow-0 shrink-0"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.twitter, "_blank");
                            }}
                        >
                            <TwitterIcon />
                        </div>
                    </div>
                    <div className="mb-4 tablet-2:mb-8 last:mb-0 ">
                        <p className="  text-[#AFB7C6]">
                            The top secret collection contains things that should be kept secret.
                            5555 pieces of ancient Egyptian mythology symbols. The top secret
                            collection contains things that should be kept secret. 5555 pieces of
                            ancient Egyptian mythology symbols.
                        </p>
                    </div>

                    <div
                        className={cn(
                            "mb-4 tablet-2:mb-8 last:mb-0 flex flex-row flex-nowrap justify-start items-center shrink-0 self-stretch ",
                            "text-[#B3BBC9]"
                        )}
                    >
                        <div className="ml-8 first:ml-0 font-bold">Creators: XXXX XXXXX XXXX</div>
                        <div
                            className="ml-8 first:ml-0 w-icon h-icon grow-0 shrink-0 hidden tablet-2:block"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.discord, "_blank");
                            }}
                        >
                            <DiscordIcon className="fill-[#B3BBC9]" />
                        </div>
                        <div
                            className="ml-8 first:ml-0 w-icon h-icon grow-0 shrink-0 hidden tablet-2:block"
                            onClick={() => {
                                window.open(SOCIAL_NETWORK_URL.twitter, "_blank");
                            }}
                        >
                            <TwitterIcon className="fill-[#B3BBC9]" />
                        </div>
                    </div>

                    <div className="mb-8 tablet-2:hidden">{renderDomainPanel()}</div>

                    <div className="mb-8 tablet-2:mb-14 last:mb-0 flex flex-col flex-nowrap w-full">
                        <Panel className="py-4">
                            <div className="flex flex-col tablet:flex-row flex-nowrap justify-between items-center">
                                <div className="mb-8 last:mb-0 tablet:mb-0 desktop:ml-20 first:ml-0 flex flex-col items-center tablet:items-start">
                                    <div className="text-blue-300 font-emphasis">Starting Date</div>
                                    <div className="font-bold">4/18/2022</div>
                                </div>
                                <div className="mb-8 last:mb-0 tablet:mb-0 desktop:ml-20 first:ml-0 flex flex-col items-center tablet:items-start">
                                    <div className="text-blue-300 font-emphasis">Total Items</div>
                                    <div className="font-bold">5,555</div>
                                </div>
                                <div className="mb-8 last:mb-0 tablet:mb-0 desktop:ml-20 first:ml-0 flex flex-col items-center tablet:items-start">
                                    <div className="text-blue-300 font-emphasis">Mint Price</div>
                                    <div className="font-bold">25 $LGND</div>
                                </div>
                            </div>
                        </Panel>
                    </div>

                    <div className="mb-4 tablet:mb-8 last:mb-0 flex flex-col tablet:flex-row flex-nowrap">
                        <Button
                            
                            className="w-full tablet:w-auto"
                            bTransparent={Boolean(collectionState.whitelistSpot)}
                            bActivated={Boolean(collectionState.whitelistSpot)}
                            onClick={handleOnGetWhitelistSpotBtnClicked}
                        >
                            <div className="flex flex-row flex-nowrap">
                                {collectionState.whitelistSpot ? (
                                    <span className="w-44">Whitelisted</span>
                                ) : (
                                    <span className="w-44">Get a Whitelist Spot</span>
                                )}

                                {Boolean(collectionState.whitelistSpot) && (
                                    <div
                                        className={cn(
                                            "absolute right-4",
                                            "ml-4 first:ml-0 w-icon h-icon grow-0 shrink-0"
                                        )}
                                    >
                                        <CheckIcon className="fill-purple-700" />
                                    </div>
                                )}
                            </div>
                        </Button>
                        {collectionState.bEntered && (
                            <div className="mt-4 tablet-2:mt-0 tablet-2:ml-8 w-full">
                                <Button
                                    className="w-full tablet:w-auto"
                                    bTransparent
                                    onClick={handleOnMyCollectionBtnClicked}
                                >
                                    <span className="w-44">My Collection</span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }, [
        collectionState.bEntered,
        collectionState.whitelistSpot,
        handleOnGetWhitelistSpotBtnClicked,
        handleOnMintBtnClicked,
        handleOnMyCollectionBtnClicked,
        mintState.agent,
        renderDomainPanel,
    ]);

    const renderWiki = useCallback(() => {
        return (
            <div
                className={cn(
                    "mt-12 grid grid-cols-1 gap-8 px-4 ",
                    "tablet-2:px-16 tablet-2:mt-28 tablet-2:grid-cols-2 tablet-2:gap-16"
                )}
            >
                <div className="flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 font-semibold text-xl text-[#B3BBC9]">
                        About the Collection
                    </div>
                    <p className="max-w-[700px] text-paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Suscipit tellus mauris a
                        diam maecenas sed enim ut sem. Pharetra diam sit amet nisl. Cras ornare arcu
                        dui vivamus arcu felis bibendum. Dapibus ultrices in iaculis nunc sed augue
                        lacus viverra vitae. Duis ut diam quam nulla porttitor massa id neque.
                    </p>
                </div>
                <div className="flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 font-semibold text-xl text-[#B3BBC9]">
                        About the Artist
                    </div>
                    <p className="max-w-[700px] text-paragraph">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Suscipit tellus mauris a
                        diam maecenas sed enim ut sem. Pharetra diam sit amet nisl. Cras ornare arcu
                        dui vivamus arcu felis bibendum. Dapibus ultrices in iaculis nunc sed augue
                        lacus viverra vitae. Duis ut diam quam nulla porttitor massa id neque.
                    </p>
                </div>
            </div>
        );
    }, []);

    return (
        <DefaultLayout headerType="collection" sidebarTab="tab/collections" bHeaderAlwaysOnTop>
            <Article className="grow text-white pb-20">
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgTopSecretColBg01})` }}
                ></div>

                <div className="absolute top-0 left-0 bottom-0 right-0 bg-blue-900/50"></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/75"></div>

                <div className="grow flex flex-col flex-nowrap items-stretch z-10">
                    <div className="flex flex-row flex-nowrap">
                        {renderInfo()}
                        <div
                            className={cn(
                                "w-1/2 z-10 mt-36 pr-16",
                                "hidden flex-col justify-start items-end",
                                "tablet-2:flex"
                            )}
                        >
                            {renderDomainPanel()}
                        </div>
                    </div>

                    {collectionState.bEntered ? renderWiki() : renderFollowingCollections()}
                </div>
            </Article>
            {renderModal()}
            <div className="tablet-2:hidden w-full">
                <Footer />
            </div>
        </DefaultLayout>
    );
}

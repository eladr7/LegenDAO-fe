import React, { useCallback, useContext } from "react";
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

export default function MyCollections(): React.ReactElement {
    const navigate = useNavigate();
    const { state } = useContext(AppContext);
    const collectionState = useAppSelector((state) => state.collection);
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
        dispatch(setWhitelistSpot(true));
    }, [dispatch]);

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

    const renderFollowingCollections = useCallback(() => {
        return (
            <div className="mt-8 px-8 flex flex-col flex-nowrap">
                <div className="mb-4 last:mb-0 font-bold">Following Collections</div>
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))] gap-10">
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
                    className="relative w-full max-w-[700px] h-[500px] bg-no-repeat container bg-center flex justify-center items-center"
                    style={{ backgroundImage: `url(${imgTopSecretCol01})` }}
                >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/75"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-900/25"></div>
                    <Button className="z-10" onClick={handleOnEnterBtnClicked}>
                        <span className="px-12 font-bold">Enter</span>
                    </Button>
                </div>
            );
        }

        return (
            <div
                className={cn(
                    "relative flex justify-center items-center",
                    "w-full max-w-[700px] h-[500px] bg-no-repeat container bg-center"
                )}
                style={{ backgroundImage: `url(${imgTopSecretColMintBg01})` }}
            >
                {!mintState.agent && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/70"></div>
                )}
                {!mintState.agent && (
                    <Button
                        onClick={handleOnMintBtnClicked}
                        className="z-10"
                        bTransparent={!collectionState.whitelistSpot}
                        disabled={!collectionState.whitelistSpot}
                    >
                        <span className="px-12 font-bold">Mint</span>
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
                            <h1 className="mb-6 last:mb-0 text-2xl font-bold">Mint Successful!</h1>
                            <div className="mb-6 last:mb-0 whitespace-nowrap">
                                {mintState.successMessage}
                            </div>
                            <div className="flex flex-col items-stretch">
                                <Button className="font-bold" onClick={handleOnMintAgainBtnClicked}>
                                    Mint Again
                                </Button>
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
                        "w-1/2 px-8 mt-28",
                        "flex flex-col flex-nowrap justify-start items-start"
                    )}
                >
                    <div className="flex flex-col flex-nowrap">
                        <h1 className="mb-8 last:mb-0 font-bold text-5xl">Top Secret Collection</h1>
                        <div className="mb-8 last:mb-0">{mintState.agent.name}</div>
                        <MintAgentDetailPanel mintAgent={mintState.agent} />
                    </div>
                </div>
            );
        }

        return (
            <div
                className={cn(
                    "w-1/2 px-8 mt-28",
                    "flex flex-col flex-nowrap justify-start items-start"
                )}
            >
                <div className="flex flex-col flex-nowrap">
                    <h1 className="mb-8 last:mb-0 font-bold text-5xl">Top Secret Collection</h1>
                    <div className="mb-8 last:mb-0 max-w-xl">
                        <p className=" text-xl text-[#AFB7C6]">
                            The top secret collection contains things that should be kept secret.
                            5555 pieces of ancient Egyptian mythology symbols. The top secret
                            collection contains things that should be kept secret. 5555 pieces of
                            ancient Egyptian mythology symbols.
                        </p>
                    </div>

                    <div className="mb-8 last:mb-0 flex flex-row flex-nowrap justify-start items-center">
                        <div className="ml-8 first:ml-0 font-bold">Creators: XXXX XXXXX XXXX</div>
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

                    <div className="mb-8 last:mb-0 flex flex-row flex-nowrap">
                        <Panel>
                            <div className="flex flex-row flex-nowrap items-center">
                                <div className="ml-20 first:ml-0 flex flex-col">
                                    <div className="text-blue-300">Starting Date</div>
                                    <div className="font-bold">4/18/2022</div>
                                </div>
                                <div className="ml-20 first:ml-0 flex flex-col">
                                    <div className="text-blue-300">Total Items</div>
                                    <div className="font-bold">5,555</div>
                                </div>
                                <div className="ml-20 first:ml-0 flex flex-col">
                                    <div className="text-blue-300">Mint Price</div>
                                    <div className="font-bold">25 $LGND</div>
                                </div>
                            </div>
                        </Panel>
                    </div>

                    <div className="mb-8 last:mb-0 flex flex-row flex-nowrap">
                        <Button
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
                            <Button bTransparent onClick={handleOnMyCollectionBtnClicked}>
                                <span className="w-44">My Collection</span>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }, [
        collectionState.bEntered,
        collectionState.whitelistSpot,
        handleOnGetWhitelistSpotBtnClicked,
        handleOnMyCollectionBtnClicked,
        mintState.agent,
    ]);

    const renderWiki = useCallback(() => {
        return (
            <div className="mt-28 grid grid-cols-2 gap-0">
                <div className="px-8 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 font-semibold text-2xl text-[#B3BBC9]">
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
                <div className="pr-8 flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 font-semibold text-2xl text-[#B3BBC9]">
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
        <DefaultLayout headerType="collection" sidebarTab="tab/collections">
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
                                "w-1/2 z-10 mt-28",
                                "flex flex-col justify-start items-start"
                            )}
                        >
                            {renderDomainPanel()}
                        </div>
                    </div>

                    {collectionState.bEntered ? renderWiki() : renderFollowingCollections()}
                </div>
            </Article>
            {renderModal()}
        </DefaultLayout>
    );
}

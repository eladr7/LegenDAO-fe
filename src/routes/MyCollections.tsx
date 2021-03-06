import React, { useCallback, useContext, useEffect, useState } from "react";
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
import {
    collectionAtions,
    setWhitelistSpot,
    TGeneralCollectionData,
    toggleEnter,
} from "../features/collection/collectionSlice";
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
import { Footer } from "../components/commons/Footer";
import { profileActions } from "../features/profile/profileSlice";
import { NFT_MINTING_ADDRESSES } from "../constants/contractAddress";
import { getBgImageFromBinary } from "../helpers/common";

export default function MyCollections(): React.ReactElement {
    const navigate = useNavigate();
    const { state } = useContext(AppContext);
    const collectionState = useAppSelector((state) => state.collection);
    const transactionState = useAppSelector((state) => state.transaction);
    const walletState = useAppSelector((state) => state.wallet);
    const networkState = useAppSelector((state) => state.network);
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
        // dispatch(setWhitelistSpot(true));
    }, [dispatch]);

    const handleOnMyCollectionBtnClicked = useCallback(() => {
        dispatch(profileActions.setTab("/profile/collected"));
        navigate("/profile/collected");
    }, [dispatch, navigate]);

    const handleOnEnterBtnClicked = (selectedCollectionIndex: number) => {
        dispatch(toggleEnter({ entered: true, collectionIndex: selectedCollectionIndex }));
    };

    const handleOnMintBtnClicked = useCallback(() => {
        dispatch(toggleMintConfirmPurchasePanel(true));
    }, [dispatch]);

    const handleOnMintCloseBtnClicked = useCallback(() => {
        dispatch(toggleMintConfirmPurchasePanel(false));
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            if (!walletState?.primary?.address) return;
            const userAddress = walletState.primary.address;
            NFT_MINTING_ADDRESSES.forEach((minterAddress) => {
                dispatch(
                    transactionActions.isWhitelisted({
                        address: userAddress,
                        nftMintingContract: minterAddress as string,
                    })
                );
            });
        })();
    }, [dispatch, walletState?.primary?.address]);

    useEffect(() => {
        dispatch(
            setWhitelistSpot(
                transactionState.collections[
                    NFT_MINTING_ADDRESSES[collectionState.selectedCollectionIndex] as string
                ]?.is_whitelisted
            )
        );
    }, [dispatch, transactionState.collections, collectionState.selectedCollectionIndex]);

    useEffect(() => {
        if (!networkState.bIsConnected || !walletState.signature) return;
        // TODO: for efficiency: separate this from collectionSlice because each time we'll
        // navigante between the user NFTs and the Collections page, the store will get run over
        dispatch(collectionAtions.getGeneralCollectionsData({}));
    }, [dispatch, networkState.bIsConnected, walletState.signature]);

    const getNftPriceInLgnd = useCallback(() => {
        const selectedCollectionData: TGeneralCollectionData =
            collectionState.generalCollectionsData[collectionState.selectedCollectionIndex];

        const priceInULgnd = collectionState.whitelistSpot
            ? selectedCollectionData.mintPriceWL
            : selectedCollectionData.mintPrice;

        return priceInULgnd / 1_000_000;
    }, [
        collectionState.whitelistSpot,
        collectionState.selectedCollectionIndex,
        collectionState.generalCollectionsData,
    ]);

    const getNftPriceInFiat = useCallback(
        (priceInLGND: number) => {
            const lgndPriceInFiat = walletState.tokenData ? walletState.tokenData.price : -1;
            return lgndPriceInFiat * priceInLGND;
        },
        [walletState.tokenData]
    );

    const renderFollowingCollections = useCallback(() => {
        return (
            <div className="mt-12 tablet-2:mt-24 px-4 tablet-2:px-16 flex flex-col flex-nowrap">
                <div className="mb-6 xs:-mb-2 xs:mt-8 last:mb-0 font-semibold text-xl text-[#B3BBC9]">
                    Following Collections
                </div>
                <div
                    className={cn(
                        "flex xs:flex-col grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6 overflow-x-auto",
                        "tablet-2:grid tablet-2:grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))] tablet-2:gap-10 tablet-2:overflow-x-hidden px-1"
                    )}
                >
                    {collectionState.generalCollectionsData.map((collectionGeneralData, index) => {
                        if (
                            index !== collectionState.selectedCollectionIndex &&
                            collectionGeneralData.onSale === true
                        ) {
                            const getUserPriceToMint = () => {
                                const isWl =
                                    transactionState.collections[
                                        collectionGeneralData.minterContractAddress
                                    ]?.is_whitelisted;
                                const mintPrice = isWl
                                    ? collectionGeneralData.mintPriceWL
                                    : collectionGeneralData.mintPrice;
                                return mintPrice / 1_000_000;
                            };
                            const mintPrice = getUserPriceToMint();
                            return (
                                <CollectionItem
                                    coverImg={getBgImageFromBinary(collectionGeneralData.coverImg)}
                                    name={collectionGeneralData.name}
                                    intro={collectionGeneralData.intro}
                                    startingDate={collectionGeneralData.startingDate}
                                    totalItemNum={collectionGeneralData.totalItemNum}
                                    mintPrice={mintPrice}
                                    handleOnEnterBtnClicked={handleOnEnterBtnClicked}
                                    collectionNftIndex={index}
                                />
                            );
                        }
                    })}
                </div>
            </div>
        );
    }, [
        collectionState.selectedCollectionIndex,
        collectionState.generalCollectionsData,
        transactionState.collections,
    ]);

    const renderDomainPanel = useCallback(() => {
        if (collectionState.generalCollectionsData.length === 0) return <div>nothing yet</div>;
        const selectedCollectionData: TGeneralCollectionData =
            collectionState.generalCollectionsData[collectionState.selectedCollectionIndex];
        if (!collectionState.bEntered) {
            return (
                <div
                    className="relative w-full max-w-[700px] h-[300px] tablet-2:h-[500px] bg-no-repeat bg-cover container bg-center flex justify-center items-center rounded-xl"
                    style={{ backgroundImage: `url(${imgTopSecretCol01})` }}
                >
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/75 rounded-xl"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-900/25 rounded-xl"></div>
                    <div>
                        <Button
                            bigness="lg"
                            className="z-10"
                            onClick={() => handleOnEnterBtnClicked(0)}
                        >
                            <span className="px-12">Enter</span>
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div
                className={cn(
                    "relative flex justify-center rounded-xl items-center",
                    "w-full max-w-[700px] h-[300px] tablet-2:h-[500px] bg-no-repeat container bg-cover bg-center"
                )}
                style={{
                    backgroundImage: getBgImageFromBinary(selectedCollectionData.coverImg),
                }}
            >
                {!mintState.agent && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/70 rounded-xl"></div>
                )}
                {!mintState.agent && (
                    <div>
                        <Button
                            bigness="lg"
                            onClick={handleOnMintBtnClicked}
                            className="z-10"
                            bTransparent={!collectionState.whitelistSpot}
                            disabled={
                                !collectionState.whitelistSpot ||
                                !networkState.bIsConnected ||
                                !selectedCollectionData.onSale
                            }
                        >
                            <span className="px-12">{`${
                                selectedCollectionData.onSale ? "Mint" : "Sold Out"
                            }`}</span>
                        </Button>
                    </div>
                )}
            </div>
        );
    }, [
        collectionState.bEntered,
        collectionState.whitelistSpot,
        handleOnEnterBtnClicked,
        handleOnMintBtnClicked,
        mintState.agent,
        networkState.bIsConnected,
        collectionState.selectedCollectionIndex,
        collectionState.generalCollectionsData,
    ]);

    const renderModal = useCallback(() => {
        const priceInLGND = getNftPriceInLgnd();
        const priceInFiat = getNftPriceInFiat(priceInLGND);
        if (!state.bodyElement) return null;
        const selectedCollectionData: TGeneralCollectionData =
            collectionState.generalCollectionsData[collectionState.selectedCollectionIndex];
        if (accessibilityState.bMintConfirmPurchasePanelOn) {
            return (
                <Modal bodyElement={state.bodyElement} onOuterClick={handleOnMintCloseBtnClicked}>
                    <MintConfirmPurchasePanel
                        onCloseBtnClicked={handleOnMintCloseBtnClicked}
                        priceInLGND={priceInLGND}
                        priceInFiat={priceInFiat}
                        itemCoverUrl={getBgImageFromBinary(selectedCollectionData.coverImg)}
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
                                style={{
                                    backgroundImage: getBgImageFromBinary(
                                        selectedCollectionData.coverImg
                                    ),
                                }}
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
        collectionState.selectedCollectionIndex,
        collectionState.generalCollectionsData,
    ]);

    const renderInfo = useCallback(() => {
        if (collectionState.generalCollectionsData.length === 0) return <div>nothing yet</div>;
        const selectedCollectionData: TGeneralCollectionData =
            collectionState.generalCollectionsData[collectionState.selectedCollectionIndex];
        if (mintState.agent) {
            return (
                <div
                    className={cn(
                        "w-full tablet-2:w-1/2 px-4 tablet-2:px-8 pl-4 tablet-2:pl-16 mt-20 tablet-2:mt-28",
                        "flex flex-col flex-nowrap justify-start items-start"
                    )}
                >
                    <div className="flex flex-col flex-nowrap">
                        <h1 className="mb-8 last:mb-0 font-bold text-2xl tablet-2:text-5xl">
                            {selectedCollectionData.name}
                            {/* Top Secret <span className="tablet-2:hidden">Mobile</span> Collection */}
                        </h1>
                        <div className="mb-8 last:mb-0">{mintState.agent.name}</div>

                        <div
                            className={cn(
                                "mb-6 w-full h-[200px] bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden",
                                "tablet-2:hidden tablet-2:w-[150px] tablet-2:h-[100px] tablet-2:mb-0"
                            )}
                            style={{
                                backgroundImage: getBgImageFromBinary(
                                    selectedCollectionData.coverImg
                                ),
                            }}
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
        const priceInLGND = getNftPriceInLgnd();
        return (
            <div
                className={cn(
                    "w-full tablet-2:w-1/2 px-4 tablet-2:px-8 pl-4 tablet-2:pl-16 mt-20 tablet-2:mt-28",
                    "flex flex-col flex-nowrap justify-start items-start"
                )}
            >
                <div className="flex flex-col flex-nowrap items-stretch w-full max-w-[627px]">
                    <h1 className="mb-6 tablet:mb-8 last:mb-0 font-bold text-3xl tablet-2:text-5xl">
                        {/* Top Secret <span className="tablet-2:hidden">Mobile</span> Collection */}
                        {selectedCollectionData.name}
                    </h1>
                    <div className="mb-6 tablet:mb-8 flex flex-row tablet-2:hidden">
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
                    <div className="mb-6 tablet:mb-8 last:mb-0 ">
                        <p className="  text-[#AFB7C6]">{selectedCollectionData.intro}</p>
                    </div>

                    <div
                        className={cn(
                            "mb-6 tablet-2:mb-8 last:mb-0 flex flex-row flex-nowrap justify-start items-center shrink-0 self-stretch ",
                            "text-[#B3BBC9]"
                        )}
                    >
                        <div className="ml-8 first:ml-0 font-bold">
                            Creators: {selectedCollectionData.artistName}
                        </div>
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

                    {/* <div className="mb-8 tablet-2:hidden">{renderDomainPanel()}</div> */}

                    <div className="mb-8 tablet-2:mb-14 last:mb-0 flex flex-col flex-nowrap w-full">
                        <Panel className="py-4">
                            <div className="flex flex-col tablet:flex-row flex-nowrap justify-between items-center">
                                <div className="mb-8 last:mb-0 tablet:mb-0 desktop:ml-20 first:ml-0 flex flex-col items-center tablet:items-start">
                                    <div className="text-blue-300 font-emphasis">Starting Date</div>
                                    <div className="font-bold">
                                        {selectedCollectionData.startingDate.toString()}
                                    </div>
                                </div>
                                <div className="mb-8 last:mb-0 tablet:mb-0 desktop:ml-20 first:ml-0 flex flex-col items-center tablet:items-start">
                                    <div className="text-blue-300 font-emphasis">Total Items</div>
                                    <div className="font-bold">
                                        {selectedCollectionData.totalItemNum}
                                    </div>
                                </div>
                                <div className="mb-8 last:mb-0 tablet:mb-0 desktop:ml-20 first:ml-0 flex flex-col items-center tablet:items-start">
                                    <div className="text-blue-300 font-emphasis">Mint Price</div>
                                    <div className="font-bold">{priceInLGND} $LGND</div>
                                </div>
                            </div>
                        </Panel>
                    </div>

                    <div className="mb-4 tablet:mb-8 last:mb-0 flex flex-col tablet:flex-row flex-nowrap">
                        <Button
                            className="w-full tablet:w-auto disabled:bg-gradient-to-b disabled:from-[#CAB5E0] disabled:to-[#655BA4] disabled:text-white"
                            disabled={Boolean(collectionState.whitelistSpot)}
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
                                        <CheckIcon className="fill-white" />
                                    </div>
                                )}
                            </div>
                        </Button>
                        {collectionState.bEntered ? (
                            <div className="mt-4 tablet-2:mt-0 tablet-2:ml-8 w-full">
                                <Button
                                    className="w-full tablet:w-auto !border-[#915cd5]"
                                    bTransparent
                                    onClick={handleOnMyCollectionBtnClicked}
                                >
                                    <span className="w-44">My Collection</span>
                                </Button>
                            </div>
                        ) : (
                            <div className="tablet:hidden mt-4 tablet-2:mt-0 tablet-2:ml-8 w-full">
                                <Button
                                    className="w-full tablet:w-auto !border-[#915cd5]"
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
        collectionState.selectedCollectionIndex,
        collectionState.generalCollectionsData,
    ]);

    const renderWiki = useCallback(() => {
        if (collectionState.generalCollectionsData.length === 0) return <div>nothing yet</div>;
        const selectedCollectionData: TGeneralCollectionData =
            collectionState.generalCollectionsData[collectionState.selectedCollectionIndex];
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
                        {selectedCollectionData.description}
                    </p>
                </div>
                <div className="flex flex-col flex-nowrap">
                    <div className="mb-2 last:mb-0 font-semibold text-xl text-[#B3BBC9]">
                        About the Artist
                    </div>
                    <p className="max-w-[700px] text-paragraph">
                        {selectedCollectionData.artistDescription}
                    </p>
                </div>
            </div>
        );
    }, [collectionState.selectedCollectionIndex, collectionState.generalCollectionsData]);
    return (
        <DefaultLayout
            headerType="collection"
            sidebarTab="tab/collections"
            bHeaderAlwaysOnTop={
                !accessibilityState.bMintConfirmPurchasePanelOn &&
                !accessibilityState.bMintSuccessfulPanelOn
            }
        >
            <Article className="grow text-white pb-20">
                <div
                    className={cn(
                        "absolute top-0 bottom-0 right-0 left-0",
                        "bg-no-repeat bg-cover bg-bottom"
                    )}
                    style={{ backgroundImage: `url(${imgTopSecretColBg01})` }}
                ></div>

                <div className="absolute top-0 left-0 bottom-0 right-0 bg-blue-900/75"></div>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-slate-900/80"></div>

                <div className="grow flex flex-col flex-nowrap items-stretch z-10">
                    <div className="flex lg:flex-row md:flex-row xs:flex-col flex-nowrap">
                        {renderInfo()}
                        <div
                            className={cn(
                                "lg:w-1/2 z-10 lg:mt-36 lg:pr-16",
                                "md:w-1/2 z-10 md:mt-36 md:pr-16",
                                "xs:ml-[5%] xs:mt-4 xs:w-[90%]",
                                "flex-col justify-start items-end",
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

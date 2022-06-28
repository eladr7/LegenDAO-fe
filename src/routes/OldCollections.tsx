import React, { useCallback } from "react";
import cn from "classnames";
import Article from "../components/commons/Article";
import { DefaultLayout } from "../components/layouts/DefaultLayout";
import imgTopSecretColBg01 from "./../assets/images/top-secret-col-background-01.png";
import imgTopSecretCol01 from "./../assets/images/top-secret-col-01.png";
import Input from "../components/commons/Input";
import SearchIcon from "../components/icons/SearchIcon";
// import CollectionItem from "../components/CollectionItem";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    collectionAtions,
    collectionAsyncActions,
    toggleEnter,
} from "../features/collection/collectionSlice";
import CollectionItem from "../components/CollectionItem";
import { useNavigate } from "react-router-dom";

export default function OldCollections(): React.ReactElement {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const collectionState = useAppSelector((state) => state.collection);
    const transactionState = useAppSelector((state) => state.transaction);

    const handleOnCollectionSearchInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            // Press enter to search
            dispatch(collectionAtions.setSearchString(e.target.value));
        },
        [dispatch]
    );

    const handleOnSearchIconClick = useCallback(() => {
        // Check validate
        if (collectionState.searchString.trim() === "") return;
        // Press enter to search
        dispatch(collectionAsyncActions.searchOld(collectionState.searchString));
    }, [collectionState.searchString, dispatch]);

    const handleSearch = useCallback(() => {
        if (collectionState.searchString.trim() === "") return;
        // Press enter to search
        dispatch(collectionAsyncActions.searchOld(collectionState.searchString));
    }, [collectionState.searchString, dispatch]);

    const handleOnEnterBtnClicked = (selectedCollectionIndex: number) => {
        dispatch(toggleEnter({ entered: true, collectionIndex: selectedCollectionIndex }));
        navigate("/collections");
    };

    const getBgImageFromBinary = (coverImg: { data: any; contentType: string }) => {
        let image = "";
        if (coverImg.data && coverImg.data.Data) {
            image = `url(data:image/png;base64,${coverImg.data.Data})`;
        }

        return image;
    };

    const renderCollections = useCallback(() => {
        return (
            <div className="mt-4 tablet-2:mt-8 px-4 tablet-2:px-16 flex flex-col flex-nowrap">
                <div
                    className={cn(
                        "flex grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-6 overflow-x-auto",
                        "tablet-2:grid tablet-2:grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))] tablet-2:gap-10 tablet-2:overflow-x-hidden"
                    )}
                >
                    {collectionState.generalCollectionsData.map((collectionGeneralData, index) => {
                        if (
                            !collectionState.searchString ||
                            collectionGeneralData.name
                                .toLowerCase()
                                .includes(collectionState.searchString.toLowerCase())
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
                                    key={index}
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
        collectionState.searchString,
    ]);

    return (
        <DefaultLayout headerType="collection">
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

                <div className="absolute w-full flex flex-col flex-nowrap items-stretch left-0 top-28">
                    <div className="flex flex-row justify-between items-start px-16">
                        <div></div>
                        <div
                            className={cn("w-1/2 z-10", "flex flex-col justify-start items-start")}
                        >
                            <div
                                className="relative w-full max-w-[700px] h-[500px] bg-no-repeat container bg-center flex justify-center items-center"
                                style={{ backgroundImage: `url(${imgTopSecretCol01})` }}
                            >
                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900/75"></div>
                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-blue-900/25"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grow flex flex-col flex-nowrap items-stretch z-10 mt-24 tablet:mt-44">
                    <div className="flex flex-col items-stretch tablet-2:items-start px-4 tablet-2:px-16 mb-8 tablet-2:mb-20 tablet-2:mb-12 last:mb-0">
                        <Input
                            id="input-search/collections"
                            className="w-full tablet-2:w-auto"
                            onChange={handleOnCollectionSearchInputChange}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            value={collectionState.searchString}
                            rightIconNode={
                                <label
                                    onClick={handleOnSearchIconClick}
                                    htmlFor="input-search/collections"
                                >
                                    <SearchIcon />
                                </label>
                            }
                            placeholder="Search collections"
                        />
                    </div>
                    <div className="px-4 tablet-2:px-16 last:mb-0">
                        <h2 className="font-semibold text-lg opacity-75">Legendao Collections</h2>
                    </div>
                    {renderCollections()}

                    {!collectionState.searchResult?.length &&
                        collectionState.searchStage == ("fulfilled" || "rejected") && (
                            <div className="flex justify-center">
                                No collection matches your search
                            </div>
                        )}
                </div>
            </Article>
        </DefaultLayout>
    );
}

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
import { collectionAtions, collectionAsyncActions } from "../features/collection/collectionSlice";

export default function OldCollections(): React.ReactElement {
    const dispatch = useAppDispatch();
    const collectionState = useAppSelector((state) => state.collection);
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

                <div className="grow flex flex-col flex-nowrap items-stretch z-10 mt-28">
                    <div className="flex px-16 mb-12 last:mb-0">
                        <Input
                            id="input-search/collections"
                            onChange={handleOnCollectionSearchInputChange}
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
                    <div className="px-16 mb-8 last:mb-0">
                        <h2 className="font-semibold text-lg opacity-75">Legendao Collections</h2>
                    </div>
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

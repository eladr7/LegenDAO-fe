import cn from "classnames";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { NFT_ADDRESSES } from "../constants/contractAddress";
import { collectionAtions, TListCollection } from "../features/collection/collectionSlice";
import Panel from "./commons/Panel";

export default function ProfileCollectedPanel(): React.ReactElement {
    const dispatch = useDispatch();
    const networkState = useAppSelector((state) => state.network);
    const collectionState = useAppSelector((state) => state.collection);
    const walletState = useAppSelector((state) => state.wallet);

    useEffect(() => {
        if (!networkState.bIsConnected || !walletState.signature) return;
        NFT_ADDRESSES.forEach((nftContractAddress) => {
            dispatch(collectionAtions.getCollection({ nftContract: nftContractAddress as string }));
        }); // TODO: if no further use of getCollection - unify this dispatch to loop internaly
    }, [dispatch, networkState.bIsConnected, walletState.signature]);

    const combineCollections = (listMyCollection: TListCollection): Array<any> => {
        let listItems: Array<any> = [];
        for (const key in listMyCollection) {
            listItems = listItems.concat(listMyCollection[key]);
        }
        return listItems;
    };

    const listItems = useMemo(() => {
        return combineCollections(collectionState.listMyCollection);
    }, [collectionState.listMyCollection]);

    const renderListItem = useCallback(() => {
        const imgBaseUrl = `${process.env.REACT_APP_CRYPTIDS_API_URL}/api/ipfstoimage?uri=`;
        if (listItems?.length) {
            return listItems.map((item, index) => {
                return (
                    <div className="flex flex-col justify-center items-center" key={index}>
                        <div
                            className={cn(
                                "w-[124px] h-[124px] bg-slate-900/75 rounded-lg hover:bg-slate-900 transition-colors",
                                "bg-contain bg-center bg-no-repeat cursor-pointer"
                            )}
                            style={{
                                backgroundImage: `url(${imgBaseUrl}${item.nft_dossier.public_metadata.extension.image})`,
                            }}
                        ></div>
                        <div className="mt-2 text-teal-200 font-normal text-sm">
                            {item.nft_dossier.public_metadata.extension.name}
                        </div>
                    </div>
                );
            });
        }
    }, [collectionState.listMyCollection]);

    return (
        <Panel className="min-h-[300px] lg:h-[700px] w-full lg:min-w-[368px] lg:w-full ">
            <div className="mb-4 last:mb-0 text-teal-200 text-xl">Collected</div>
            <div className="grid grid-cols-2 gap-4">{renderListItem()}</div>
        </Panel>
    );
}

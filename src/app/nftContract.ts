import { Permit, SecretNetworkClient } from "secretjs";
import { NFT_ADDRESSES } from "../constants/contractAddress";

export const getDetailNft = async (
    client: SecretNetworkClient,
    token_id: string,
    permit: Permit,
    nftContractAddress: string,
    codeHash?: string
) => {
    if (!nftContractAddress) return;
    return await client.query.compute.queryContract({
        contractAddress: nftContractAddress,
        codeHash,
        query: {
            with_permit: {
                query: {
                    nft_dossier: {
                        token_id,
                    },
                },
                permit,
            },
        },
    });
};

export const getMintingHistory = async (
    client: SecretNetworkClient,
    permit: Permit,
    nftContractAddress: string,
    codeHash?: string
) => {
    if (!nftContractAddress) return;
    return await client.query.compute.queryContract({
        contractAddress: nftContractAddress,
        codeHash,
        query: {
            with_permit: {
                query: {
                    transaction_history: {
                        address: client.address,
                    },
                },
                permit,
            },
        },
    });
};

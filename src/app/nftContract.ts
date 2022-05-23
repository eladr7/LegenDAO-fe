import { Permit, SecretNetworkClient } from "secretjs";
import { NFT_ADDRESS } from "../constants/contractAddress";

export const getDetailNft = async (
    client: SecretNetworkClient,
    token_id: string,
    permit: Permit,
    codeHash?: string
) => {
    if (!NFT_ADDRESS) return;
    return await client.query.compute.queryContract({
        contractAddress: NFT_ADDRESS,
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
    codeHash?: string
) => {
    if (!NFT_ADDRESS) return;
    return await client.query.compute.queryContract({
        contractAddress: NFT_ADDRESS,
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

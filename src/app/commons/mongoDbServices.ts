import axios from "axios";
import { TGeneralCollectionData } from "../../features/collection/collectionSlice";

export interface ITokenDataMongoDb {
    document: {
        apy: number,
        apr: number,
        liquidity: number,
        priceUsd: number,
        totalLocked: number,
        dailyVolume: number,
    }
}

export type TCollectionDataMongoDb = {
    documents: [
        {
            coverImg: {
                data: any,
                contentType: string
            };
            name: string;
            description: string;
            artistDescription: string;
            artistName: string;
            startingDate: string;
            totalItemNum: string;
            mintPrice: string;
            mintPriceWL: string;
            nftContractAddress: string;
            minterContractAddress: string;
            onSale: string;
        }
    ]
}

class MongoDbServices {
    protected baseURL: string | undefined = process.env.REACT_APP_MONGODB_API_URL;
    protected apiKey: string | undefined = process.env.REACT_APP_MONGODB_API_KEY;
    public async getTokenDataMongoDb() {
        const instance = axios.create({
            baseURL: this.baseURL,
            timeout: 5000,
            headers: {
            "Accept": "application/json",
            "Content-Type": 'application/json',
            "Access-Control-Request-Headers": '*',
            "api-key": this.apiKey,
            },
        });

        return await instance.post<ITokenDataMongoDb>("/action/findOne", {
            "collection":"test1",
            "database":"test",
            "dataSource":"Cluster0",
            "projection": {}
        });
    }

    public async getCollectionsDataMongoDb() {
        const instance = axios.create({
            baseURL: this.baseURL,
            timeout: 5000,
            headers: {
            "Accept": "application/json",
            "Content-Type": 'application/json',
            "Access-Control-Request-Headers": '*',
            "api-key": this.apiKey,
            },
        });

        return await instance.post<TCollectionDataMongoDb>("/action/find", {
            "collection":"nft-collections",
            "database":"legendao",
            "dataSource":"Cluster0",
            "projection": {}
        });
    }
}

// export instance of account service
export const mongoDbServices = new MongoDbServices();

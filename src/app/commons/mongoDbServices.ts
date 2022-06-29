import { HTTPBaseService } from "./HTTPBaseRequest";


export interface ITokenDataMongoDb {
        apy: number,
        apr: number,
        liquidity: number,
        priceUsd: number,
        totalLocked: number,
        dailyVolume: number,
}

export type TCollectionDataMongoDb = {
            coverImg: {
                data: any,
                contentType: string
            };
            name: string;
            description: string;
            intro: string;
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

class MongoDbServices extends HTTPBaseService {
    protected baseURL: string | undefined = process.env.REACT_APP_MONGODB_API_URL;
    protected apiKey: string | undefined = process.env.REACT_APP_MONGODB_API_KEY;


    public async getTokenDataMongoDb() {
        return await this.instance.get<ITokenDataMongoDb>("/token/info", {
            baseURL: this.baseURL,
        });
    }
    public async getCollectionsDataMongoDb() {
        return await this.instance.get<TCollectionDataMongoDb[]>("/collections/data", {
            baseURL: this.baseURL,
        });
    }
}

export const mongoDbServices = new MongoDbServices();
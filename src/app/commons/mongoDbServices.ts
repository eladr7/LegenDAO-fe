import axios from "axios";

export interface ITokenDataMongoDb {
    document: {
        apy: number,
        apr: number,
        liquidity: number,
        price_usd: number,
        total_locked: number,
        daily_volume: number,
    }
}

class MongoDbServices {
    protected baseURL: string | undefined = process.env.REACT_APP_MONGODB_API_URL;
    public async getTokenDataMongoDb() {
        const instance = axios.create({
            baseURL: this.baseURL,
            timeout: 5000,
            headers: {
            "Accept": "application/json",
            "Content-Type": 'application/json',
            "Access-Control-Request-Headers": '*',
            "api-key": 'FuzWIacYXkc3H0RFnHrp9w2keC9j2NjdV2pb11rw7iJLSIEtcPxTfGhORiHvWjpi',
            },
        });

        return await instance.post<ITokenDataMongoDb>("/action/findOne", {
            "collection":"staking",
            "database":"chain-info",
            "dataSource":"Cluster0",
            "projection": {}
        });
    }
}

// export instance of account service
export const mongoDbServices = new MongoDbServices();

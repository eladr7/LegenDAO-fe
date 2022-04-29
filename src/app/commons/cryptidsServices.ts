import { HTTPBaseService, IAttributeStaticsData, IIsWhitelisted } from "./HTTPBaseRequest";

class CryptidsServices extends HTTPBaseService {
    protected baseURL: string | undefined = process.env.REACT_APP_CRYPTIDS_API_URL;

    public async isWhiteListed(address: string) {
        return await this.instance.get<IIsWhitelisted>("/api/IsWhitelisted", {
            baseURL: this.baseURL,
            params: {
                address,
                code: "zia7kDoux1zpLWsflavaXR/mfI9rTJjQRmRiJ9bPvBZOwNlqIaOvmQ==",
            },
        });
    }

    public async attributeStatistics(params?: IAttributeStaticsData) {
        return await this.instance.get<any>("/api/attributestatistics", {
            baseURL: this.baseURL,
            params: {
                ...params,
                code: "p5CbBJPQfYHjNq/PxjAEAsebbVjOgP2h2qkk8zQyvd1KDxhLynQgeg==",
            },
        });
    }
}

// export instance of account service
export const cryptidsServices = new CryptidsServices();

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { Permit } from "secretjs";

export abstract class HTTPBaseService {
    protected instance: AxiosInstance;
    protected readonly baseURL: string | undefined;

    public constructor() {
        this.instance = axios;
        // axios use request interceptor
        this.initializeRequestInterceptor();

        // axios use response interceptor
        this.initializeResponseInterceptor();
    }

    private initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(this.handleRequest);
    };

    private initializeResponseInterceptor = () => {
        this.instance.interceptors.response.use((response) => {
            return response;
        }, this.handleError);
    };

    private handleRequest = (config: AxiosRequestConfig) => {
        config.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        return config;
    };

    private handleError = async (error: AxiosError) => {
        // eslint-disable-next-line no-console
        console.error({ error });

        return Promise.reject(error);
    };
}

export type TClaimStatus = "NotClaimed" | "Claimed" | "Submitted" | "NotWhitelisted";

export interface IClaimResponse {
    status: {
        [address: string]: {
            status: TClaimStatus;
            amount: number;
        }
    }
}

export interface ISubmitClaimData {
    claims: [
        {
            address: string;
            permit: Permit;
        }
    ]
}

export interface IAttributeStaticsData {
    background?: string;
    body?: string;
    hairs?: string;
    eyes?: string;
    rhand?: string;
    lhand?: string;
    wear?: string;
    horns?: string;
}

export interface IIsWhitelisted {
    whitelist: boolean;
}

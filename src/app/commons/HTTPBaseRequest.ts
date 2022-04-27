import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

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
    config.baseURL = process.env.REACT_APP_API_URL;
    return config;
  };

  private handleError = async (error: AxiosError) => {
    // eslint-disable-next-line no-console
    console.error({ error });

    return Promise.reject(error);
  };
}

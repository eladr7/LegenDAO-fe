import { ICreationForms } from "../../components/CreationFormPanel";
import { HTTPBaseService, IClaimResponse, ISubmitClaimData } from "./HTTPBaseRequest";

class LegendServices extends HTTPBaseService {
    protected baseURL: string | undefined = process.env.REACT_APP_LEGEND_API_URL;
    public async creationForm(data: ICreationForms) {
        return await this.instance.post<any>("/api/creationform", data, { baseURL: this.baseURL });
    }

    public async submitClaim(data: ISubmitClaimData) {
        return await this.instance.post<any>("/api/submitclaim", data, {
            baseURL: this.baseURL,
            params: {
                code: "ZoRJruWZzazk9YxmSJUO5Hg2va/Aa0gyM37soFB5eh8VKLBv2dzSjQ==",
            },
        });
    }

    public async checkStatus(addresses: string) {
        return await this.instance.get<IClaimResponse>("/api/checkstatus", {
            baseURL: this.baseURL,
            params: {
                code: "/ebdKLfLEklqdYN0WXHqLapwlKxp8mqP2s2bZBhTMxFd28mnhWsYCQ==",
                addresses,
            },
        });
    }
}

// export instance of account service
export const legendServices = new LegendServices();

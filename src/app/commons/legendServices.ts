import { HTTPBaseService } from "./HTTPBaseRequest";

class LegendServices extends HTTPBaseService {

  public async creationForm(data: any) {
    return await this.instance.post<any>(
      "/api/creationform",
      data
    );
  }

}

// export instance of account service
export const legenServices = new LegendServices();

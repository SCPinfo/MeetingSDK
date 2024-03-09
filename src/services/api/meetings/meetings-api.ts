
import { apiService } from "../api";
import { GeneralResult } from "../api.types";
import Endpoints from "../../../constants/endpoints";
import { getGeneralApiProblem, Kind } from "../api-problem";

export const meetingsApi = {
    async createByToken(token): Promise<GeneralResult> {
        const data ={jwtToken: token};
        const response: any = await apiService.apisauceInstance.post(Endpoints.MeetingByToken, data)
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) {return problem}
        }

        return { kind: Kind.OK, result: response.data }
    },
}

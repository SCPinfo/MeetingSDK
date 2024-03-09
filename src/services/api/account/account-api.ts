import { GeneralResult } from "../api.types";
import { apiService } from "../api";
import { Endpoints } from "../../../enums";
import { getGeneralApiProblem, Kind } from "../api-problem";


export const AccountApi = {
    async getAccountConfigs(): Promise<GeneralResult> {
        const response = await apiService.apisauceInstance.get(Endpoints.config )
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) {return problem}
        }

        return { kind: Kind.OK, result: response.data }
    },
    async getAccountTranslations(): Promise<GeneralResult> {
        const response = await apiService.apisauceInstance.get(Endpoints.translations )
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) {return problem}
        }

        return { kind: Kind.OK, result: response.data }
    },
}

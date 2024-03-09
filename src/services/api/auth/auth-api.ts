import { GeneralResult } from "../api.types";
import Endpoints from "../../../constants/endpoints";
import { apiService } from "../api";
import { getGeneralApiProblem, Kind } from "../api-problem";

export const AuthApi = {
  async JwtTokenAuthentication(data): Promise<GeneralResult> {
    const response: any = await apiService.apisauceInstance.post(Endpoints.AuthenticateWithJwtToken, data)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) {return problem}
    }

    return { kind: Kind.OK, result: response.data }
  }
}

import { ApiResponse, ApisauceInstance, create } from "apisauce"
import {SystemErrors} from "../../enums/system-errors";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import AppConfigConstants from "../../constants/app-config"
import Endpoints from "../../constants/endpoints"
import {getGeneralApiProblem, Kind} from "./api-problem"
import {GeneralResult} from "./api.types";


/**
 * Manages all requests to the API.
 */
export class ApiAuth {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  // @ts-ignore
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */

  // TODO remove this added instance and handle the case in the apisauce
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        ClientId: AppConfigConstants.ClientId,
      },
    })

  }


  async generateNewToken(refreshToken: string, terminateOtherSessions = false): Promise<GeneralResult> {
    const data = {
      terminateOtherSessions
    }
    const response: ApiResponse<any> = await this.apisauce.put(Endpoints.UserToken, data, {
      headers: {
        "Authorization": refreshToken,
      },
    })

    if (!response.ok) {
      // we handle the invalid token here because not all apis will be requested through the interceptor
      if (response.data?.message === SystemErrors.InvalidToken) {
        //await rootStore.clearAppData()
      }
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    return { kind: Kind.OK, result: response.data }
  }
}

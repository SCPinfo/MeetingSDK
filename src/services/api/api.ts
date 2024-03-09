import { ApisauceInstance, create } from "apisauce"
import Common from "../../constants/common"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import i18n from "i18n-js"
import { LanguageEnum } from "../../enums/language-enum"
import AppConfigConstants from "../../constants/app-config"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "../redux/store";
import { userTokenSelector } from "../redux/auth/auth-selectors";

/**
 * Manages all requests to the API.
 */
export class ApiService {

  private static _instance: ApiService | null = null;
  public  apisauceInstance: ApisauceInstance;

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
    this.setup()
  }

  static get instance(): ApiService {
    return ApiService._instance ?? (ApiService._instance = new ApiService());
  }
  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauceInstance = create({
      baseURL: this.config.url,
      timeout: this.config.timeout
    })

    this.apisauceInstance.axiosInstance.interceptors.request.use(
      async (config) => {
        const headers = await this.getHeaders()
        config.headers = { ...headers, ...config.headers }
        if (!config.headers.hideDefaultSpinner) {
          // ToDo: Show spinner
        }

        __DEV__ && console.log("url =>", config.url)
        return config
      },
      error => {
        // ToDo: Hide spinner
        __DEV__ && console.log("Error in REQUEST interceptor", error)
        Promise.reject(error)
      },
    )


    // Response interceptor for API calls
    this.apisauceInstance.axiosInstance.interceptors.response.use((response) => {
      // ToDo: Hide Spinner
      return response
    }, async (error) => {
      __DEV__ && console.log("Error in RESPONSE interceptor =>", error.code, error)
      // ToDo: Hide Spinner


      return Promise.reject(error)
    })
  }

  async getHeaders() {
    const token = userTokenSelector(store.getState())
    const headers: any = {
      Accept: "application/json",
      ClientId: AppConfigConstants.ClientId,
      "Accept-Language": i18n.locale === LanguageEnum.English ? LanguageEnum.English : LanguageEnum.Arabic,
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    return headers
  };


}

export const apiService = ApiService.instance;

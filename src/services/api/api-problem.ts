import { ApiResponse } from "apisauce"
import i18n from "i18n-js"

export enum Kind {
  OK = "OK",
  Timeout = "TIMEOUT",
  BadConnection = "BAD_CONNECTION",
  BadNetwork = "BAD_NETWORK",
  ServerError = "SERVER_ERROR",
  UnAuthorized = "UNAUTHORIZED",
  Forbidden = "FORBIDDEN",
  NotFound = "NOT_FOUND",
  TooManyRequests = "TOO_MANY_REQUESTS",
  BadData = "BAD_DATA",
  Rejected = "REJECTED",
}

export type GeneralApiProblem = { kind: Kind ; result: any ; handled?: boolean }


/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void | null {
  switch (response.problem) {
    case "CONNECTION_ERROR": // Server not available, bad dns.
      return { kind: Kind.BadConnection, result: i18n.translate("common.generalError") }
    case "NETWORK_ERROR": // Network not available.
      return { kind: Kind.BadNetwork, handled:true, result: i18n.translate("common.generalError") }
    case "TIMEOUT_ERROR": // Server didn't respond in time.
      return { kind: Kind.Timeout, result: i18n.translate("common.generalError") }
    case "SERVER_ERROR": // Any 500 series error.
      return { kind: Kind.ServerError, result: i18n.translate("common.generalError") }
    case "UNKNOWN_ERROR": // when unhandled exception in the interceptors
      return { kind: Kind.Rejected, handled:true, result: i18n.translate('common.generalError') }
    case "CLIENT_ERROR": // Any non-specific 400 series error.
      return clientApiProblem(response.status, response.data)
    case "CANCEL_ERROR": // Request has been cancelled. Only possible if `cancelToken` is provided in config, see axios `Cancellation`.
      return null
  }

}

export function clientApiProblem(status?: number, data?: any): GeneralApiProblem {
  switch (status) {
    case 400:
      return { kind: Kind.BadData, result: data ?? i18n.translate("common.generalError") }
    case 401:
      return { kind: Kind.UnAuthorized, result: data ?? i18n.translate("common.generalError") }
    case 403:
      return { kind: Kind.Forbidden, result: data ?? i18n.translate("common.generalError") }
    case 404:
      return { kind: Kind.NotFound, result: data ?? i18n.translate("common.generalError") }
    case 429:
      return { kind: Kind.TooManyRequests, handled:true, result: i18n.translate("common.tooManyRequests") }
    default:
      return { kind: Kind.Rejected, result: data ?? i18n.translate("common.generalError") }
  }
}

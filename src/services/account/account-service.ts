import { AppThunk } from "../redux/store";
import { accountActions } from "../redux/account/account-slice";
import { GeneralResult } from "../api";
import { ClientIdsEnum, Kind } from "../../enums";
import { AccountConfig } from "../../models/account-config";
import { AccountApi } from "../api/account/account-api";


export const accountService = {
    init: (accountClientId : string): AppThunk<Promise<void>> => async (dispatch, getState): Promise<void> => {
        // const accountClientId = getClientIdFromCurrentLocation();
        const isValidClientId = accountService.isValidAccount(accountClientId)
        if (isValidClientId) {
            const clientId =  accountClientId
            dispatch(accountActions.setClientId(clientId))
            await dispatch(accountService.setAccountConfigs())
        }

    },
    initServerTranslations: async (): Promise<{en:any , ar:any}> => {
        const response = await AccountApi.getAccountTranslations()
        if (response.kind === Kind.OK) {
            return response.result.data.translations
        }
        return null
    },
    setAccountConfigs: (): AppThunk<Promise<GeneralResult>> => async (dispatch, getState): Promise<GeneralResult> => {
        const response = await AccountApi.getAccountConfigs()
        if (response.kind === Kind.OK) {
            dispatch(accountActions.setAccountConfigs(response.result.data as AccountConfig))
        }

        return response;
    },
    isValidAccount : (clientId :string ) =>{
        if (!clientId || !ClientIdsEnum[clientId]) {
            //NotificationHelper.error(translate("general.wrongClientId"))
            return false ;
        }
        return true;
    },

}

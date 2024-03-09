import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountConfig } from "../../../models/account-config";


export interface IAccountState {
    clientId: string,
    configs: AccountConfig
}

const initialState: IAccountState = {
    clientId: null,
    configs: null,
};


const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        setClientId: ((state, action: PayloadAction<string>) => {
            state.clientId = action.payload
        }),
        setAccountConfigs : ((state, action: PayloadAction<AccountConfig>) => {
            state.configs = action.payload
        }),
        resetAccountState: () => {
            return { ...initialState };
        },
    },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;

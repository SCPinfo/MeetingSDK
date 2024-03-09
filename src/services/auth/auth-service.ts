import { AppThunk } from "../redux/store";
import { authActions } from "../redux/auth/auth-slice";
import { AuthApi } from "../api/auth/auth-api";


interface IAuthData{
    token :string ;
    refreshToken  :string ;

}
export const authService = {
    completeLogin: (authData :IAuthData): AppThunk<Promise<void>> => async (dispatch, getState): Promise<void> => {
       dispatch(authActions.setLoggedInUser({ token: authData.token, refreshToken: authData.refreshToken}))
       dispatch(authActions.setIsLoggedIn(true))
    },
    loginByJwtToken: async (data) => {
       const response =await AuthApi.JwtTokenAuthentication(data);
       return  response;
    },
}

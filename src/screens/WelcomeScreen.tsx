import React, { useCallback } from "react";
import { TextInput,  View, ViewStyle } from "react-native";
import {
  Button,
  Text
} from "../components";
import { color } from "../theme";
import { Kind } from "../services/api/api-problem";
import { authService } from "../services/auth/auth-service";
import { useAppDispatch } from "../services/redux/hooks";
import { navigate } from "../navigators";
import { meetingsService } from "../services/meetings/meetings-service";
import { ScreensEnum } from "../enums/screens-enum";
import { appService } from "../services/app/app-service";

export function WelcomeScreen() {

  const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZXh0Ijp7InVzZXJOYW1lIjoic2FpZm9zQG1lc3Nlbmdlci5jb20iLCJpc0FkbWluIjpmYWxzZX0sIm1lZXRpbmciOnsiZXh0ZXJuYWxNZWV0aW5nUmVmIjoicmVmMTI3MTEiLCJ0aXRsZSI6Ik1lZXRpbmcgdGVzdCAiLCJkZXNjcmlwdGlvbiI6InRlc3QgIiwicGFydGljaXBhbnRzIjpbeyJ1c2VybmFtZSI6InNhaWZvc0BtZXNzZW5nZXIuY29tIiwiaXNBZG1pbiI6dHJ1ZSwicGVybWlzc2lvbnMiOltdfSx7InVzZXJuYW1lIjoic2FpZkBtZXNzZW5nZXIuY29tIiwiaXNBZG1pbiI6ZmFsc2UsInBlcm1pc3Npb25zIjpbIkJZUEFTU19ST09NX0xPQ0siLCJQUk9NT1RFX1BFRVIiLCJNT0RJRllfUk9MRSIsIlNFTkRfQ0hBVCIsIlNIQVJFX0FVRElPIiwiU0hBUkVfVklERU8iLCJTSEFSRV9TQ1JFRU4iLCJDQVBUVVJFX1NDUkVFTlNIT1QiLCJNT0RFUkFURV9GSUxFUyIsIk1PREVSQVRFX1JPT00iLCJDSEFOR0VfUk9PTV9MT0NLIl19XSwiaXNQdWJsaWMiOnRydWUsInNldHRpbmdzIjp7ImxvY2tlZCI6ZmFsc2UsImNoYXRFbmFibGVkIjp0cnVlLCJyYWlzZUhhbmRFbmFibGVkIjp0cnVlLCJtdXRlUGFydGljaXBhbnRzIjpmYWxzZX19LCJpYXQiOjE3MDg0MTYxMzksImV4cCI6MTcxMTAwODEzOX0.NlG71xdwCCGPTTZPP-L0cZQUaIjBFGKOtZQDI8CYzURqr4-57LfyGgKpxbA_dqTe40GCoW-rTi-JBK7TY0V1ZNDA7mXOvALmaQkiIsKl5QJpfhpqNSPEvhZEBm5z8KSlk-lnk1N7USEWY-_zTCO3wikngDiCGHpdLSAQlUP_EZUfn13RXv2fMpk2Whia1x7xXcNi_Q9hPPpC10jtC5nIdPBGhJAawYhpObMNEEc8KGXMty7Q13oYDkik3-DjmcrAEMz_VzH73_chH5oVCQE4RStah7dpdY9ER7G_PtQZ5-mpmhH0OlTSWbJF6wLBDQc1sZrKZEAAlsjqyaab6Bl4HCCtl4nQvi_boNZX2frcqwzLax3jtHMA2icSZXEGQvIhtFJNM3zGiaBoXyofah-ipYakTfqOv3SrweOCp4ij2ic5LdOPPAA4ts2SMEYUBnmPnAO8Gal9MShVXWoKcRJqZs2mKw9GgnClmpdgxjlMOnvOdiW8MGK85GcXRrsG1JyoUIdu5O39ZfImiNI37me0gfg8KyzIzqkEg-V9DxcRCJ0l8gKgeoE3PcH8JvE3d24yyTOEoLpMpNeSwN3iF5ohnyMt2gPKQRb8d7jvDZJyndKe6rsAs2P5jzxPTkm3-jJ-gvHEUbqbA4lUfrDXomET-5RX5o8PFHa_5TPyaLcbdm8";
  const dispatch = useAppDispatch();
  const [inputValue,setInputValue] = React.useState('');

  const authenticateByJwtToken = useCallback(async () => {
    const data = { jwtToken: inputValue };
    const response = await authService.loginByJwtToken(data);
    if (response.kind == Kind.OK) {
      const loginData = {
        token: response.result.token,
        refreshToken: response.result.refreshToken,
        registerStatus: response.result.user.registerStatus
      };
      await dispatch(authService.completeLogin(loginData));
      await appService.initializeServices()
      await handleCreateMeeting()
    } else if (!response.handled) {
      console.log("error");
    }
  }, [dispatch, inputValue]);

  const handleCreateMeeting = async () => {
    const response = await meetingsService.createByToken(inputValue);
    if (response.kind === Kind.OK) {
      const meetingId = response.result.meetingId;
      navigate(ScreensEnum.Meeting,{meetingId:meetingId});

    } else {
      console.log("error creating meeting")
    }
  }


  return (
    <View style={$container}>
      <Text preset={"bold"} style={{marginBottom:30}} text={"Enter your JWT token that was generated via the test api ( test/token/generate ), then it will be used to authentication"}/>
      <Text preset={"fieldLabel"} text={"JWT Token"}/>
      <TextInput
        style={{width:'100%',height:40,backgroundColor:'white', borderWidth:1, borderColor:"grey",borderRadius:5,marginVertical:10}}
        onChangeText={value => {setInputValue(value)}}
        value={inputValue}
      />
      <Button text={"Submit"} onPress={authenticateByJwtToken}/>
    </View>
  );
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  justifyContent:'center',
  paddingHorizontal:20
};


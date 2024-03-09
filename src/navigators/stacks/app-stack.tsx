import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AppStackParamList } from "../app-navigator";
import * as Screens from "../../screens"
import { ScreensEnum } from "../../enums/screens-enum";


// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: "black" }}
      initialRouteName={"Welcome"}
    >
      <Stack.Screen name={ScreensEnum.Welcome} component={Screens.WelcomeScreen} />
      <Stack.Screen name={ScreensEnum.Meeting} component={Screens.Meeting} />
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
}

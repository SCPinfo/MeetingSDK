/**
 * Sample React Native MeetingSDK
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import { AppNavigator, useNavigationPersistence } from "./navigators";
import { ErrorBoundary } from "./screens";
import { ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as storage from "./utils/storage"
import { persistor, store } from "./services/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { decode } from "base-64";
import { registerGlobals } from "react-native-webrtc";
global.atob = decode;
registerGlobals()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

export function MeetingSDK(){

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  if (!isNavigationStateRestored) {return null}

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary catchErrors={"dev"}>
            <GestureHandlerRootView style={$container}>
              <AppNavigator
                initialState={initialNavigationState}
                onStateChange={onNavigationStateChange}
              />
            </GestureHandlerRootView>
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default MeetingSDK;

const $container: ViewStyle = {
  flex: 1,
}

import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE} from 'redux-persist';
import authReducer from "./auth/auth-slice";
import peersReducer from "./peers/peers-slice";
import roomReducer from "./room/room-slice";
import producersReducer from "./producers/producers-slice";
import consumersReducer from "./consumers/consumers-slice";
import meReducer from "./me/me-slice";
import roomSettingsReducer from "./room/room-settings-slice";
import uiReducer from "./ui/ui-slice";
import accountReducer from "./account/account-slice";
import permissionsReducer from "./permissions/permissions-slice";
import lobbyPeersReducer from "./lobby-peers/lobby-peers-slice";
import peerPermissionsReducer from "./peer-permissions/peer-permissions-slice";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ["roomSettings"],
}

const rootReducer = combineReducers({
  room: roomReducer,
  peers: peersReducer,
  producers: producersReducer,
  consumers: consumersReducer,
  me: meReducer,
  auth: authReducer,
  roomSettings: roomSettingsReducer,
  //chat: chatReducer,
  ui: uiReducer ,
  account :accountReducer,
  permissions : permissionsReducer,
  lobbyPeers : lobbyPeersReducer,
  peerPermissions : peerPermissionsReducer
})


const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk: {
        extraArgument: {},
      },
    }),
})

export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  any,
  Action<string>>;
export type Selector<S> = (state: RootState) => S;

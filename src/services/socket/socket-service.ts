import {io, Socket as SocketIo} from 'socket.io-client';
import { isLoggedInSelector, userTokenSelector } from "../redux/auth/auth-selectors";
import AppConfigConstants from "../../constants/app-config";
import SocketEvents from "../../constants/socket-events";
import { store } from "../redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Manages all requests to the Socket.
 */
class SocketService {
  private static _instance: SocketService | null = null;
  public socketInstance: SocketIo | null = null;
  private pendingActions:any[] = []

  private constructor() {
    // Private constructor to prevent instantiation.
  }

  static get instance(): SocketService {
    if (!SocketService._instance) {
      SocketService._instance = new SocketService();
    }
    return SocketService._instance;
  }

  setup() {
    const isLoggedIn = isLoggedInSelector(store.getState())
    if (!this.socketInstance && isLoggedIn) {
      const token = userTokenSelector(store.getState())
      this.socketInstance = io(AppConfigConstants.SocketUrl, {
        path: "",
        ackTimeout: 20000,
        retries: 0,
        reconnection: true,
        autoConnect: true,
        query: {token: token},
        auth: {
          token: token,
        },
      });
    }
  }

  async disconnect() {
    if (this.socketInstance) {
      this.socketInstance.disconnect();
      this.socketInstance.close();
      this.socketInstance = null
    }
  }

  connect() {
    if (this.socketInstance) {
      this.socketInstance.connect();
    }
  }

  getSocketId() {
    return this.socketInstance ? this.socketInstance.id : null;
  }

  isConnected() {
    return this.socketInstance ? this.socketInstance.connected : false;
  }

  emit(ioEvent: string, action: string, data: any): void {
    if (this.socketInstance) {
      this.socketInstance.emit(ioEvent, {msg: {action: action, data: data}});
    }
  }

  request(ioEvent: string, action: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isConnected()) {
        this.socketInstance?.emit(ioEvent, {msg: {action: action, data: data}}, (error: any, response: { isError: any; error: any; data: any; }) => {
          if (error) {
            console.error(error)

            return reject(error)
          }
          if (response.isError) {
              return reject(response.error );
          }
          return resolve(response?.data);
        });
      } else {
        console.error('Socket not initialized');

      }
    });
  }

  onIceServersReceived(data: any) {
    AsyncStorage.setItem("IceServers", JSON.stringify(data));
  }

  async onConnected() {
    console.log('onConnected');
    //store.dispatch(meetingService.rejoin());
    await this.processPendingActions()
  }

  onDisconnected(data: any) {
    console.log('onDisconnected',data);
    //store.dispatch(meetingService.reconnect())
  }

  onConnectError(data: any) {
    console.log('onConnectError',data);
  }

   reconnectSocket() {
    if (!this.socketInstance) return
    this.socketInstance.disconnect()
    //appService.initializeServices()
  }

  onTokenExpired(data: any) {
    console.log('onTokenExpired');
    //onTokenExpired()
  }

  onActiveSessionExist(data: any) {
    console.log('onActiveSessionExist');
  }

  onLogoutUser(data: any) {
    console.log('onLogoutUser');
/*    if (store.getState().room.state === RoomConnectionStateEnum.Connected) {
      store.dispatch(meetingService.hangup());
    }

    store.dispatch(authService.logout(true))*/
  }

  initializeListeners() {
      if (this.socketInstance) {
        this.socketInstance.on(SocketEvents.Connect, () => this.onConnected());
        this.socketInstance.on(SocketEvents.Disconnect, (data: any) => this.onDisconnected(data));
        this.socketInstance.on(SocketEvents.ConnectError, (data: any) => this.onConnectError(data));
        this.socketInstance.on(SocketEvents.IceServersReceived, (data) =>this.onIceServersReceived(data));
        this.socketInstance.on(SocketEvents.TokenExpired, (data: any) => this.onTokenExpired(data));
        this.socketInstance.on(SocketEvents.ActiveSessionExist, (data: any) => this.onActiveSessionExist(data));
        this.socketInstance.on(SocketEvents.LogoutUser,(data: any) => this.onLogoutUser(data));
      }
  }

  async initialize() {
      this.setup();
      this.initializeListeners()
  }

  addPendingAction(action: any) {
    this.pendingActions.push(action)
  }

  async processPendingActions() {
    for (const action of this.pendingActions) {
      await action()
    }
    this.pendingActions = []
  }
}

export const socketService = SocketService.instance

/*
import {RoomConnectionStateEnum, socketService, store} from "@messenger/services";
import { PendingNotificationTypes} from "./enums";
import {IMemberActionDto, IPendingNotification} from "./types";
import {MessageStatus} from "../messaging/enums";
import {groupService} from "../group/group-service";
import {queue, QueueObject} from "async"
import {messagingService} from "../messaging/messaging-service";
import { SocketEvents } from "@messenger/shared";

export const EventService = {
  eventsQueue: undefined as QueueObject<IPendingNotification> ,

  async onPendingNotification(pendingNotification: IPendingNotification) {
    try {
      // To handle the date being always date not string
      if (typeof pendingNotification.creationDate === "string") {
        pendingNotification.creationDate = new Date(pendingNotification.creationDate)
      }
      switch (pendingNotification.dataType) {
        case PendingNotificationTypes.NewMessage:
          if (groupService.isChannelGroup(pendingNotification?.data?.groupType)) {
            //await this.rootStore.messageStore.newChannelMessageReceived(pendingNotification?.data?.message);
          } else {
            console.log(pendingNotification?.data?.message)
            if(store.getState().room.state === RoomConnectionStateEnum.Connected)
              await store.dispatch(messagingService.newMessageReceived(pendingNotification?.data?.message));
          }
          socketService.emit(SocketEvents.Pending, SocketEvents.DeletePendingNotification, {id: pendingNotification._id});
          break;
                case PendingNotificationTypes.MessageAcknowledgement:
                  if(store.getState().room.state === RoomConnectionStateEnum.Connected)
                  await store.dispatch( messagingService.messageAcknowledged(pendingNotification.data.messageId, MessageStatus.Sent));
                  socketService.emit(SocketEvents.Pending, SocketEvents.DeletePendingNotification, {id: pendingNotification._id});
                  break;
                case PendingNotificationTypes.MessageReceived:
                  if(store.getState().room.state === RoomConnectionStateEnum.Connected)
                  await store.dispatch( messagingService.messageAcknowledged(pendingNotification.data.messageId, MessageStatus.Received));
                  socketService.emit(SocketEvents.Pending, SocketEvents.DeletePendingNotification, {id: pendingNotification._id});
                  break;
                case PendingNotificationTypes.MessageRead:
                  if(store.getState().room.state === RoomConnectionStateEnum.Connected)
                  await store.dispatch( messagingService.messageAcknowledged(pendingNotification.data.messageId, MessageStatus.Seen));
                  socketService.emit(SocketEvents.Pending, SocketEvents.DeletePendingNotification, {id: pendingNotification._id});
                  break;
                case PendingNotificationTypes.GroupRead:
                  if(store.getState().room.state === RoomConnectionStateEnum.Connected)
                    await store.dispatch(messagingService.groupMessagesRead(pendingNotification.data.groupId));
                  socketService.emit(SocketEvents.Pending, SocketEvents.DeletePendingNotification, {id: pendingNotification._id});
                  break;
        default:
          socketService.emit(SocketEvents.Pending, SocketEvents.DeletePendingNotification, {id: pendingNotification._id});
          break;
      }
    } catch (error: any) {
      console.log('ERROR WHILE PROCESSING ', pendingNotification.dataType, " AND THE ERROR IS : ", error.message);
      socketService.emit(SocketEvents.Pending, SocketEvents.DeletePendingNotification, {id: pendingNotification._id});
    }
  },
  async onMemberAction(data: IMemberActionDto) {
    /!*    try {
          switch (data.actionType) {
            case MemberActionType.Recording:
            case MemberActionType.Typing:
            case MemberActionType.Sending:
              await this.rootStore.groupStore.onMemberAction(data)
              break;
            case MemberActionType.FinishRecording:
            case MemberActionType.FinishTyping:
            case MemberActionType.FinishSending:
              await this.rootStore.groupStore.onFinishMemberAction(data)
              break;
          }
        } catch (error:any) {
           console.log('ERROR WHILE PROCESSING ', data.actionType, " AND THE ERROR IS : ", error.message);
        }*!/
  },
  async onPendingNotifications(pendingNotifications: IPendingNotification[]) {
    EventService.eventsQueue?.pause()
    for (let index = 0; index < pendingNotifications.length; index++) {
      const pendingNotification = pendingNotifications[index];
      await EventService.onPendingNotification(pendingNotification)
    }
    EventService.eventsQueue?.resume()
//  SyncUnsentMessages here after finish the fetching the pending
    //await this.rootStore.messageStore.syncUnsentMessages()
  },
  async onQueueEvent(pendingNotification: IPendingNotification) {
    EventService.eventsQueue?.push(pendingNotification)
  },
  listenToPendingNotificationsEvents() {
    if(!socketService.socketInstance) return
    console.log("listenToPendingNotificationsEvents")
    socketService.socketInstance.on(SocketEvents.PendingNotifications, EventService.onPendingNotifications)
    socketService.socketInstance.on(SocketEvents.PendingNotification, (data)=>EventService.onQueueEvent(data))
    socketService.socketInstance.on(SocketEvents.MemberAction, (data)=>EventService.onMemberAction(data))
  },
  initialize() {
    if(EventService.eventsQueue) {
        EventService.eventsQueue.kill()
    }
    EventService.eventsQueue = queue(async (pendingNotification, callback) => {
      await EventService.onPendingNotification(pendingNotification)
      callback();
    });
    EventService.listenToPendingNotificationsEvents();
  }
}
*/

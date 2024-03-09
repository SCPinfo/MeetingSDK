import {MemberActionType} from "./enums";

export interface IPendingNotification {
  _id : string
  accountId : string,
  dataType : string,
  userId : string,
  creationDate : Date,
  data: any
  senderUsername:string,
  senderUserId:string
}


export interface IMemberActionDto {
  groupId: string;
  userId:string;
  actionType: MemberActionType;
}

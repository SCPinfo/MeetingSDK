import { DeviceInfo } from "./device-info";
import {UserTypeEnum} from "../enums";

export interface User {
    _id: string
    name: string,
    registerStatus: string ,
    numberCode: string,
    countryCode: string,
    createdDate: string,
    picture: string,
    accountId: string,
    createdBy: string,
    username: string,
    salt: string,
    hash: string,
    modifiedBy: string,
    modifiedDate: string,
    aboutContent: string,
    pictureUrl: string,
    avatarColor: string,
    devices:DeviceInfo[]
    deviceInfo:DeviceInfo,
    clientId :string
    userType : UserTypeEnum
}

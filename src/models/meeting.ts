import { MeetingSettingsOptions } from "./meeting-settings"

export interface Meeting {
    _id: string;
    isPublic: boolean;
    accountId: string;
    name: string;
    groupId: string;
    fromTime: Date;
    toTime: Date;
    creationDate: Date;
    createdBy: string;
    modifiedBy: string;
    modifiedDate: Date;
    title: string;
    description: string;
    startDate: Date;
    timezone: string;
    participantsIds: string[];
    isDeleted: boolean;
    participants: any[];
    settings: MeetingSettingsOptions;
    endCallRedirectionUrl: string ;
    expireOn : Date
}
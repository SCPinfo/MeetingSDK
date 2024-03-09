export interface Group {
    name: string;
    description: string;
    members: any[];
    isActive: boolean;
    accountId: string;
    authId: string;
    userId: string;
    createdBy: string;
    createdByUsername: string;
    createdDate: Date;
    refId: string;
    modifiedBy: string;
    modifiedDate: Date;
    deletedBy: string;
    senderKeyVersion: number;
    messagesCount: number;
    messagesDuration: number;
    deletionDate: Date;
    membersOnMute: any[];
    isGhost: boolean;
    _id: string;
    actionType: string;
    originalGroupId: string;
    receiverUsername: string;
    receiverId: string;
    unReadCount: number;
}
export interface MessagesConfig {
    starringMessageEnabled: boolean
    deleteMessageEnabled: boolean
    blockMessageDeletingTime: number
    maximumChannelSizeMessages: number
    safePorts: number
    timeFormat: string
    dateFormat: string
    timeAndDateFormat: string
    hideSystemMessages: boolean
    fileUploadFormat: string[] 
    blockedFileFormatMimeType : string[]
    maxFileUploadSize: number
}
/* eslint-disable no-unused-vars,no-shadow */


export enum Permission {
  // The role(s) will gain access to the room even if it is locked (!)
  BYPASS_ROOM_LOCK = 'BYPASS_ROOM_LOCK',
  // The role(s) have permission to lock/unlock a room
  CHANGE_ROOM_LOCK = 'CHANGE_ROOM_LOCK',
  // The role(s) have permission to promote a peer from the lobby
  PROMOTE_PEER = 'PROMOTE_PEER',
  // The role(s) have permission to give/remove other peers roles
  MODIFY_ROLE = 'MODIFY_ROLE',
  // The role(s) have permission to send chat messages
  SEND_CHAT = 'SEND_CHAT',
  // The role(s) have permission to moderate chat
  MODERATE_CHAT = 'MODERATE_CHAT',
  // The role(s) have permission to share audio
  SHARE_AUDIO = 'SHARE_AUDIO',
  // The role(s) have permission to share video
  SHARE_VIDEO = 'SHARE_VIDEO',
  // The role(s) have permission to share screen
  SHARE_SCREEN = 'SHARE_SCREEN',
  // The role(s) have permission to share files
  SHARE_FILE = 'SHARE_FILE',
  // The role(s) have permission to moderate files
  MODERATE_FILES = 'MODERATE_FILES',
  // The role(s) have permission to moderate room (e.g. kick user)
  MODERATE_ROOM = 'MODERATE_ROOM',
  // The role(s) have permission to start room recording
  RECORD_ROOM = 'RECORD_ROOM',
  // The role(s) have permission to create rooms
  CREATE_ROOM = 'CREATE_ROOM',
  // The role(s) have permission to join/leave rooms
  CHANGE_ROOM = 'CHANGE_ROOM',
  // The role(s) have permission to Capture a screenshot
  CAPTURE_SCREENSHOT = 'CAPTURE_SCREENSHOT',
}

export const permissions = Object.values(Permission);
import { GeneralApiProblem, Kind } from "./api-problem"

/*export type LoginResult = { kind: Kind; result: LoginDto; handled?: boolean } | GeneralApiProblem
export type registrationApprovalResult = { kind: Kind; result: string; handled?: boolean } | GeneralApiProblem
export type CheckingInvitationCodeResult = { kind: Kind; result: string; handled?: boolean } | GeneralApiProblem
export type configResult = { kind: Kind; result: any } | GeneralApiProblem
export type SendOTPResult = { kind: Kind; result: { passToken: string }; handled?: boolean } | GeneralApiProblem
export type VerifyOTPResult = { kind: Kind; result: { userData: any; passToken: string }; handled?: boolean } | GeneralApiProblem
export type VerifyEmailResult = { kind: Kind; result: { userData: any; passToken: string }; handled?: boolean } | GeneralApiProblem
export type UsersResult = { kind: Kind; result: User[]; handled?: boolean } | GeneralApiProblem
export type GroupResult = { kind: Kind; result: any; handled?: boolean } | GeneralApiProblem
export type SearchUsersResult = { kind: Kind; result: ContactDto[]; handled?: boolean } | GeneralApiProblem
export type UserProfileResult = { kind: Kind; result: Contact; handled?: boolean } | GeneralApiProblem
export type SendFileMessageResult = { kind: Kind; result: any; handled?: boolean }
export type RegisterDeviceNotificationResult = { kind: Kind; result: any } | GeneralApiProblem
export type DeleteAccountResult = { kind: Kind; result: any; handled?: boolean } | GeneralApiProblem*/
export type GeneralResult = { kind: Kind; result: any; handled?: boolean } | GeneralApiProblem

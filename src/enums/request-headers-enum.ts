export enum RequestHeadersEnum {
  Accept = 'Accept',
  ContentLength = 'Content-Length',
  ContentType = 'Content-Type',
  UserAgent = 'User-Agent',
  ContentEncoding = 'Content-Encoding',
  Authorization = 'Authorization',
  AccessControlAllowOrigin = 'Access-Control-Allow-Origin',
  ClientId = 'ClientId',
  Language = "accept-language"
}

export enum RequestContentTypeEnum {
  TextHTML = 'text/html',
  TextPlain = 'text/plain',
  MultipartFormData = 'multipart/form-data',
  ApplicationJson = 'application/json',
  ApplicationFormUrlEncoded = 'application/x-www-form-urlencoded',
  ApplicationOctetStream = 'application/octet-stream',
}

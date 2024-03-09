import Config from "react-native-config";
import { TargetsEnum } from "../enums/target-enum";
import { PingMeConfigs } from "./pingme-configs";
import { SecureConfigs } from "./secure-configs";
import { WhatsonConfigs } from "./whatson-configs"

interface Config {
    images:any,
    palette:any,
    animations:any,
    [name: string]: string
}

const configs = new Map<string, any>([
    [TargetsEnum.PingMe, PingMeConfigs],
    [TargetsEnum.Secure, SecureConfigs],
    [TargetsEnum.Whatson, WhatsonConfigs],
    [TargetsEnum.SecureDev, SecureConfigs],
])

__DEV__ && console.log("Config.TARGET_NAME", Config.TARGET_NAME);

//const AppConfig:Config = {...Config,...configs.get(<string>Config.TARGET_NAME)};

const AppConfig:Config = {
    "API_URL":"https://chat-dev.scriptechn.com:3001/api/",
    "SOCKET_URL":"https://chat-dev.scriptechn.com:3001",
    "CLIENT_ID":"secure",
    ...configs.get(<string>TargetsEnum.SecureDev),
}

export default AppConfig;

import { Alert } from "react-native"
import {
  Permission,
  request,
  RESULTS,
  openSettings, requestMultiple, checkMultiple,
  check
} from "react-native-permissions"
import { translate } from "../i18n"

const requestPermission = (
  permissionTitle: string,
  permissionBody: string,
  permissionType: Permission,
  keepAsking?: boolean,
) => {
  return new Promise<boolean>((resolve, reject) => {
      request(permissionType).then( async (result) => {
        switch (result) {
          case RESULTS.GRANTED:
            return resolve(true)
          case RESULTS.LIMITED:
            return resolve(true)
          case RESULTS.BLOCKED:
            Alert.alert(
              permissionTitle,
              permissionBody,
              [
                {
                  text: translate("general.cancel"),
                  onPress: () => {
                    return resolve(false)
                  },
                },
                {
                  text: translate("general.settings"),
                  onPress: () => openSettings(),
                },
              ],
              { cancelable: false },
            )
            return resolve(false)
          case RESULTS.DENIED:
            if (!keepAsking) {
              resolve(false)
              break;
            }
            resolve(await requestPermission(
                permissionTitle,
                permissionBody,
                permissionType,
                keepAsking,
            ))
            break
          case RESULTS.UNAVAILABLE:
            return resolve(false)
          default:
            return resolve(false)
        }
      })
  })
}

const checkPermission = (
  permissionType: Permission,
) => {
  return new Promise<boolean>((resolve, reject) => {
      check(permissionType).then((result) => {
        switch (result) {
          case RESULTS.GRANTED:
            return resolve(true)
          case RESULTS.LIMITED:
            return resolve(true)
          case RESULTS.BLOCKED:
            return resolve(false)
          case RESULTS.DENIED:
            return resolve(false)
          case RESULTS.UNAVAILABLE:
            return resolve(false)
        }
      })
  })
}


const requestMultiplePermissions = (permissions) => {
  return new Promise<boolean>((resolve, reject) => {
      requestMultiple(permissions).then((grants) => {
        let allGranted = true
        for (const grantsKey in grants) {
          if (grants[grantsKey] !== RESULTS.GRANTED)
            allGranted = false
        }
        if (allGranted) {
          // Permissions granted
          return resolve(true)
        } else {
          // All required permissions not granted
          return resolve(false)
        }
      })
  })
}

const checkMultiplePermissions = (permissions) => {
  return new Promise<boolean>((resolve, reject) => {
   // try {
      checkMultiple(permissions).then((grants) => {
        let allGranted = true
        for (const grantsKey in grants) {
          if (grants[grantsKey] !== RESULTS.GRANTED)
            allGranted = false
        }
        if (allGranted) {
          // Permissions granted
          return resolve(true)
        } else {
          // All required permissions not granted
          return resolve(false)
        }
      })
  //  } catch (err) {
    //  console.warn(err)
   // }
  })
}

export {checkPermission, requestPermission, requestMultiplePermissions, checkMultiplePermissions }

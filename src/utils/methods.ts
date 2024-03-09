import i18n from "i18n-js"
import { LanguageEnum } from "../enums/language-enum"

import { Linking, Platform } from "react-native"

export const convertPlusToZerosInPhoneNumber = (phoneNumber: string) => "00" + phoneNumber.substring(1)

export const replacer = (_key: any, value: undefined) => value === undefined ? null : value;

export const convertZerosToPlusInPhoneNumber = (phoneNumber: string) =>
  i18n.locale === LanguageEnum.English
    ? "+" + phoneNumber.substring(2)
    : phoneNumber.substring(2) + "+"

export const formatBigNumbers = (n: number) => {
  if (n < 1e3) {return n}
  if (n >= 1e3 && n < 1e6) {return +(n / 1e3).toFixed(1) + "K"}
  if (n >= 1e6 && n < 1e9) {return +(n / 1e6).toFixed(1) + "M"}
  if (n >= 1e9 && n < 1e12) {return +(n / 1e9).toFixed(1) + "B"}
  if (n >= 1e12) {return +(n / 1e12).toFixed(1) + "T"}
  return null
}

export const getRandomColor = (char1:string, char2 = "") => {
  // Example array of colors
  const colors = ["#008080","#FF6F61","#f2cc8f","#708090","#9932CC","#A0522D","#4682B4","#81b29a","#757bc8"]

  // Ensure both characters are lowercase for case-insensitive comparison
  const key = char1.toLowerCase() + char2.toLowerCase();

  // Generate a hash based on the combination of characters
  const hash = hashString(key);

  // Convert the hash to a positive index
  const index = Math.abs(hash) % colors.length;

  // Use the index to pick a color from the provided array
  return colors[index];
}

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
  }
  return hash;
}

const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

export const formatBytes=(x: string)=>{
  let l = 0;
  let n = parseInt(x, 10) || 0;

  while (n >= 1024 && ++l){
    n = n/1024;
  }

  return (n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

export const openLocationSettings = () => {
  try {
    Platform.OS === 'ios'
      ? Linking.openURL('App-Prefs:Privacy&path=LOCATION')
      : Linking.sendIntent("android.settings.LOCATION_SOURCE_SETTINGS");
  }catch (e) {
    Platform.OS === 'ios'
      ? Linking.openURL('App-Prefs://')
      : Linking.sendIntent("android.settings.SETTINGS");
  }
}

// Fix for a bug => https://github.com/react-native-modal/react-native-modal/issues/30#issuecomment-304179412
export const doActionOnDialogClosed=(action:any,duration=0)=>{
  setTimeout(()=>{
    action()
  },duration)
}


export function isTextArabic(text: string | undefined) {
  if (!text) {return undefined}
  const arabic = /[\u0600-\u06FF]/
  return arabic.test(text[0]);
}


export const If = ({ condition, children } : { condition:boolean, children:any }) => {
  return condition ? children : null;
};

export const Choose = ({ children }  : {  children:any }) => {
  return children.find(({ condition } : any) => condition) || null;
};

export const When = ({ condition, children } : { condition:boolean, children:any }) => {
  return condition ? children : null;
};

export const Otherwise = ({ children } : {  children:any }) => {
  return children;
};

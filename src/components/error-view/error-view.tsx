import { View } from "react-native";
import { translate } from "../../i18n";
import { Text } from "../text/text";
import FontIcon from "../font-icon/font-icons";
import React from "react";
import { useCommonStyles } from "../../use-common-styles";


export const ErrorView = ({ error }: { error?: any }) => {
  const { centeredFlex } = useCommonStyles();

  return (
    <View
      style={{ ...centeredFlex, paddingHorizontal: 16 }}
    >
      <FontIcon type={"material"} name={"error"} color={"red"} size={150} />
      {error && error.data &&
        <>
          {/*@ts-ignore*/}
          <Text text={translate(`error.${error.message}`, error.data)} style={{textAlign:'center',marginTop:30}}/>
        </>
      }
      {error && !error.data &&
        <>
          {/*@ts-ignore*/}
          <Text text={translate(`error.${error}`)} style={{textAlign:'center',marginTop:30}}/>
        </>
      }
      {!error &&
        <Text preset={"header"} text={translate(`meetings.somethingWentWrong`)} />
      }
      {!error &&
        <Text tx={`meetings.somethingWentWrongSubHeader`} style={{textAlign:'center',marginTop:30}}/>
      }
    </View>
  );
};

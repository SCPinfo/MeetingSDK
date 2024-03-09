import { useTheme } from "../../hooks/use-theme";
import { Text } from "../text/text";

import { ActivityIndicator, View } from "react-native";
import { translate } from "../../i18n";
import { useCommonStyles } from "../../use-common-styles";


export const LoadingView = () => {
  const theme = useTheme()
  const {centeredFlex} = useCommonStyles()

  return (
    <View
      style={centeredFlex}
    >
      <Text text={translate('general.loading') + "..."} preset={"header"}/>
      <View style={{marginTop:20}}>
        <ActivityIndicator color={theme.colors.signatureColor} size={60} />
      </View>
    </View>
  );
};

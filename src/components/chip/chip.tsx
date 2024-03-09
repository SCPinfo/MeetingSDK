import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { useChipStyle } from "./use-chip-style";
import { Text } from "../text/text";
import { TxKeyPath } from "../../i18n";
import { If } from "../../utils/methods";

interface ChipProps {
  label: TxKeyPath;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Chip = ({ label, textStyle, style, icon }: ChipProps) => {

  const { container, label: labelStyle } = useChipStyle();

  return (
    <View style={[container,style]}>
      <If condition={!!icon}>
        {icon}
      </If>
      <Text
        style={[labelStyle, textStyle]}
        tx={label}
        preset={"fieldLabel"}
      />
    </View>
  );
};


export default Chip;

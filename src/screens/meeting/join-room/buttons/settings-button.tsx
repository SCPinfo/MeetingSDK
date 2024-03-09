import { Pressable, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../services/redux/hooks";
import { useRoomActionsStyles } from "../../../../components/room-actions/use-room-actions-styles";
import FontIcon from "../../../../components/font-icon/font-icons";
import { uiActions } from "../../../../services/redux/ui/ui-slice";

const SettingsButton = () => {
    const settingsDialogOpen = useAppSelector((state) => state.ui.settingsDialogOpen);
    const dispatch = useAppDispatch();
    const {buttonContainer,activeButtonStyle,blackColor} = useRoomActionsStyles()

    const toggleSettings = async () => {
        dispatch(uiActions.setUi({ settingsDialogOpen: !settingsDialogOpen }));
    }

    return (
      <Pressable
        style={buttonContainer}
        onPress={toggleSettings}>
        <View style={activeButtonStyle}>
          <FontIcon type={"materialCommunity"} name={"cog"} color={blackColor} size={22} />
        </View>
      </Pressable>
    );
};

export default SettingsButton;

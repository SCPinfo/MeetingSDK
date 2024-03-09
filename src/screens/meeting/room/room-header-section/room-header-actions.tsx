import { View } from 'react-native';
import { useRoomHeaderStyle } from './use-room-header-styles';
import { Space } from "../../../../components/space/space"
import FontIcon from '.././../../../components/font-icon/font-icons';
const RoomHeaderActions = () => {
    const { actionsContainer, whiteColor , textShadowStyle} = useRoomHeaderStyle();

    return (
        <View style={actionsContainer}>
            <FontIcon type={"ant"} name={'message1'} style={textShadowStyle} color={whiteColor} size={23} />
            <Space spaceAmount={20} direction="horizontal" />
            <FontIcon type={"octicon"} name={'people'} style={textShadowStyle} color={whiteColor} size={23} />
        </View>
    );
};
export default RoomHeaderActions;

import { View } from 'react-native';
import { useAppSelector } from '../../../../services/redux/hooks';
import { Text } from "../../../../components";
import { useRoomHeaderStyle } from './use-room-header-styles';
import { RecordingStatusEnum } from '../../../../services/redux/room/room-slice';
import Timer from './timer';
import FontIcon from '.././../../../components/font-icon/font-icons';
import { If } from '../../../../utils/methods';

const RoomHeaderContent = () => {
    const { meetingTitleStyle } = useRoomHeaderStyle();
    const { roomData, recordingStatus } = useAppSelector((state) => state.room);
    const isRecordingActive = recordingStatus === RecordingStatusEnum.Active;

    return (
        <View>
            <Text style={meetingTitleStyle} numberOfLines={1}>
                {roomData.title}
            </Text>
                <If condition={isRecordingActive}>
                    <FontIcon
                        type={"materialCommunity"}
                        name={"record-circle-outline"}
                        color={"red"}
                        size={16}
                    />
                </If>
            <Timer />
        </View>
    );
};

export default RoomHeaderContent;

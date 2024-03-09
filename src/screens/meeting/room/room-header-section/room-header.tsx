import { View } from 'react-native';
import { useRoomHeaderStyle } from './use-room-header-styles';
import RoomHeaderActions from './room-header-actions';
import RoomHeaderContent from './room-header-content';
import { useAppDispatch, useAppSelector } from '../../../../services/redux/hooks';
import { useEffect, useRef } from 'react';
import { uiActions } from '../../../../services/redux/ui/ui-slice';
import * as Animatable from 'react-native-animatable';

const RoomHeader = () => {
    const { headerContainer } = useRoomHeaderStyle();
    const showHeaderSection = useAppSelector(state => state.ui.showHeaderSection)
    const dispatch = useAppDispatch()
    const timerRef = useRef<any | null>(null);

    useEffect(() => {
        startTimer();
        return () => {
            clearTimeout(timerRef.current);
        };
    }, [showHeaderSection]);

    const startTimer = () => {
        if (showHeaderSection) {
            timerRef.current = setTimeout(() => {
                dispatch(uiActions.setUi({ showHeaderSection: !showHeaderSection }));
            }, 10000);
        }
    };


    return (
        <Animatable.View animation={showHeaderSection ? "slideInDown" : "slideOutUp"} duration={500} style={{ zIndex: 100 }}>
            <View style={headerContainer}>
                <RoomHeaderContent />
                <RoomHeaderActions />
            </View>
        </Animatable.View>

    );
};

export default RoomHeader;

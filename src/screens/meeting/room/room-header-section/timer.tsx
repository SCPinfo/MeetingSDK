import  { useState, useEffect } from 'react';
import { Text } from '../../../../components';
import { useRoomHeaderStyle } from './use-room-header-styles';
import { useAppSelector } from '../../../../services/redux/hooks';
import { toHHMMSS } from '../../../../utils/date-time';

const Timer = () => {
    const { timerStyle } = useRoomHeaderStyle()
    const startedAt = useAppSelector(state => state.room.startedAt)
    const [timer, setTimer] = useState(Math.floor((Date.now() - startedAt) / 1000))

    useEffect(() => {
        const callTimerRef = setInterval(() => {
            setTimer(Math.floor((Date.now() - startedAt) / 1000))
        }, 1000)

        return () => {
            clearInterval(callTimerRef)
        }
    }, [])

    return (
        <Text style={timerStyle} numberOfLines={1}>{toHHMMSS(timer)}</Text>
    )
}
export default Timer

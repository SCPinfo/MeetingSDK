/*
import {styled} from "@mui/material";
import {useHark} from "../../hooks/use-hark";
import {ConsumerState, ProducerState} from "@messenger/services";
import { If } from "@messenger/shared";

const StyledHark = styled('div')(({theme})=>({
  position:'absolute',
  top:0,
  bottom:0,
  left:0,
  right:0,
  border:`2px solid ${theme.palette.secondaryColor}`,
  borderRadius:10,
  zIndex:1
}))

interface HarkProps {
  consumer?: ConsumerState;
  producer?: ProducerState;
  trackId?: string;
}

const VideoBoxHark = (props:HarkProps) => {

  const {volume} = useHark(props)

  return (
    <If condition={!!volume}>
      <StyledHark/>
    </If>
  );
};

export default VideoBoxHark;
*/

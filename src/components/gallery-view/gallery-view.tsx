import { useAppSelector } from "../../services/redux/hooks";
import { View } from "react-native";
import { Me } from "../me/me";
import { Peer } from "../peer/peer";
import { spotlightPeersSelector } from "../../services/redux/peers/peers-selectors";
import { useVideoBoxStyles } from "../peer/use-video-box-styles";
import { useMainContentStyle } from "../main-content/use-main-content-style";


const GalleryView = (): JSX.Element => {
  const spotlightPeers = useAppSelector(spotlightPeersSelector);
  const {itemStyle} = useVideoBoxStyles()
  const {galleryViewContainer} = useMainContentStyle()

  const style = itemStyle(spotlightPeers.length);

  return (
    <View style={galleryViewContainer}>
      <Me style={style}/>
{/*      <ScreenSharing style={style}/>*/}
      {spotlightPeers.length > 0 && spotlightPeers.map((peerId: any) => (
          <Peer
            id={peerId}
            key={peerId}
            style={style}
          />
        )
      )}

    </View>
  );
};

export default GalleryView;

import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from "../../services/redux/hooks";
import { DisplayLayoutEnum } from "../../enums/display-layout-enum";
import { If } from "../../utils/methods";
import GalleryView from "../gallery-view/gallery-view";
import { Pressable, View } from "react-native";
import { useMainContentStyle } from "./use-main-content-style";
import { uiActions } from '../../services/redux/ui/ui-slice';


const MainContent = (): JSX.Element => {
  const displayLayout = useAppSelector(state => state.room.displayLayout)
  const { container } = useMainContentStyle()
  const ui = useAppSelector(state => state.ui)
  const dispatch = useAppDispatch()

  const toggleHeaderSection = () => {
    dispatch(uiActions.setUi({ showHeaderSection: !ui.showHeaderSection }))
  }
  return (
    <View style={container}>
      <Pressable onPress={toggleHeaderSection}>
        {/*      <If condition={displayLayout === DisplayLayoutEnum.Filmstrip}>
        <FilmstripView/>
      </If>*/}
        <If condition={displayLayout === DisplayLayoutEnum.Gallery}>
          <GalleryView />
        </If>
      </Pressable>

      {/*      <SideSection/>*/}
    </View>
  );
};

export default memo(MainContent);

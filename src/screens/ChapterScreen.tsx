import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';
import ChapterContainer from '../containers/ChapterContainer';

import { NavigationParamsChapter } from '../types/navigation.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsChapter>;
}

const ChapterScreen = ({ navigation }: IProps) => (
  <Screen>
    <ChapterContainer
      chapterId={navigation.getParam('chapterId')}
      navigation={navigation}
    />
  </Screen>
);

ChapterScreen.navigationOptions = {
  title: 'Chapter',
};

export default ChapterScreen;

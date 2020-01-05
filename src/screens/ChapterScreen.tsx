import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';
import ChapterContainer from '../containers/ChapterContainer';

import { NavigationParamsChapter } from '../types/navigation.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsChapter>;
}

class ChapterScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: 'Chapter',
  };

  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <ChapterContainer
          chapterId={navigation.getParam('chapterId')}
          navigation={navigation}
        />
      </Screen>
    );
  }
}

export default ChapterScreen;

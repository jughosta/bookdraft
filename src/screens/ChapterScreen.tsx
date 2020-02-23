import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';
import ChapterContainer from '../containers/ChapterContainer';

import { fetchChapters } from '../reducers/chaptersSlice';

import { NavigationParamsChapter } from '../types/navigation.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsChapter>;
}

const ChapterScreen = ({ navigation }: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(fetchChapters(navigation.getParam('chapterBookId')));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen>
      <ChapterContainer
        chapterId={navigation.getParam('chapterId')}
        navigation={navigation}
      />
    </Screen>
  );
};

ChapterScreen.navigationOptions = {
  title: 'Chapter',
};

export default ChapterScreen;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Screen from '../components/Screen';
import ChapterContainer from '../containers/ChapterContainer';

import { fetchChapters } from '../reducers/chaptersSlice';

import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChapterScreen'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'ChapterScreen'>;

interface IProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const ChapterScreen = ({ navigation, route }: IProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(fetchChapters(route.params.chapterBookId));
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen>
      <ChapterContainer
        chapterId={route.params.chapterId}
        navigation={navigation}
      />
    </Screen>
  );
};

export default ChapterScreen;

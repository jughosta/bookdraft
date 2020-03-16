import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import CenterView from '../components/CenterView';
import ChapterList from '../components/ChapterList/ChapterList';

import { LoadingStatus } from '../utils/redux';

import { fetchChapters, resetChapters } from '../reducers/chaptersSlice';

import {
  NavigationParamsChapterForm,
  NavigationParamsChapter,
} from '../types/navigation.type';
import { RootState } from '../types/redux.type';
import { IChapter } from '../types/chapter.type';
import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookScreen'
>;

interface IProps {
  bookId: number;
  navigation: ScreenNavigationProp;
}

function navigateToViewScreen(
  navigation: ScreenNavigationProp,
  chapter: IChapter,
) {
  const params: NavigationParamsChapter = {
    chapterId: chapter.id,
    chapterBookId: chapter.bookId,
  };

  navigation.navigate('ChapterScreen', params);
}

function navigateToCreateScreen(
  navigation: ScreenNavigationProp,
  bookId: number,
) {
  const params: NavigationParamsChapterForm = {
    bookId,
  };

  navigation.navigate('ChapterFormScreen', params);
}

const ChaptersContainer = React.memo<IProps>(({ bookId, navigation }) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state: RootState) => state.chapters.loadingStatus,
  );
  const chapters = useSelector((state: RootState) => state.chapters.list);

  useEffect(() => {
    dispatch(fetchChapters(bookId));

    return () => {
      dispatch(resetChapters());
    };
  }, [bookId, dispatch]);

  return (
    <React.Fragment>
      {loadingStatus === LoadingStatus.initial ? (
        <CenterView>
          <ActivityIndicator />
        </CenterView>
      ) : (
        <ChapterList
          chapters={chapters}
          onCreate={() => navigateToCreateScreen(navigation, bookId)}
          onPress={chapter => navigateToViewScreen(navigation, chapter)}
        />
      )}
    </React.Fragment>
  );
});

export default ChaptersContainer;

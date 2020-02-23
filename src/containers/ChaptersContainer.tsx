import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import CenterView from '../components/CenterView';
import ChapterList from '../components/ChapterList/ChapterList';

import { Screens } from '../utils/navigation';
import { LoadingStatus } from '../utils/redux';

import { fetchChapters, resetChapters } from '../reducers/chaptersSlice';

import {
  NavigationParamsChapterForm,
  NavigationParamsChapter,
  NavigationParamsBook,
} from '../types/navigation.type';
import { RootState } from '../types/redux.type';
import { IChapter } from '../types/chapter.type';

interface IProps {
  bookId: number;
  navigation: NavigationStackProp<NavigationParamsBook>;
}

function navigateToViewScreen(
  navigation: NavigationStackProp<NavigationParamsBook>,
  chapter: IChapter,
) {
  const params: NavigationParamsChapter = {
    chapterId: chapter.id,
  };

  navigation.navigate(Screens.Chapter, params);
}

function navigateToCreateScreen(
  navigation: NavigationStackProp<NavigationParamsBook>,
  bookId: number,
) {
  const params: NavigationParamsChapterForm = {
    bookId,
  };

  navigation.navigate(Screens.ChapterForm, params);
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

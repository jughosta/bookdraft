import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';

import Blank from '../components/Blank/Blank';
import CenterView from '../components/CenterView';
import ChapterHeader from '../components/ChapterHeader/ChapterHeader';
import ChapterItemsContainer from '../containers/ChapterItemsContainer';

import { fetchChapter, resetChapter } from '../reducers/chapterSlice';

import { LoadingStatus } from '../utils/redux';
import { Screens } from '../utils/navigation';

import {
  NavigationParamsChapter,
  NavigationParamsChapterForm,
} from '../types/navigation.type';
import { RootState } from '../types/redux.type';
import { IChapter } from '../types/chapter.type';

interface IProps {
  chapterId: number;
  navigation: NavigationStackProp<NavigationParamsChapter>;
}

function navigateToEditScreen(
  navigation: NavigationStackProp<NavigationParamsChapter>,
  chapter: IChapter,
) {
  if (!chapter) {
    return;
  }

  const params: NavigationParamsChapterForm = {
    bookId: chapter.bookId,
    chapter,
  };

  navigation.navigate(Screens.ChapterForm, params);
}

const ChapterContainer = React.memo<IProps>(({ chapterId, navigation }) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state: RootState) => state.chapter.loadingStatus,
  );
  const chapter = useSelector((state: RootState) => state.chapter.chapter);

  useEffect(() => {
    dispatch(fetchChapter(chapterId));

    return () => {
      dispatch(resetChapter());
    };
  }, [chapterId, dispatch]);

  if (loadingStatus === LoadingStatus.failed) {
    return (
      <CenterView>
        <Blank message="Chapter not found" />
      </CenterView>
    );
  }

  if (loadingStatus === LoadingStatus.loaded && chapter) {
    return (
      <React.Fragment>
        <ChapterHeader
          chapter={chapter}
          onEdit={() => navigateToEditScreen(navigation, chapter)}
        />
        <ChapterItemsContainer chapterId={chapter.id} navigation={navigation} />
      </React.Fragment>
    );
  }

  return (
    <CenterView>
      <ActivityIndicator />
    </CenterView>
  );
});

export default ChapterContainer;

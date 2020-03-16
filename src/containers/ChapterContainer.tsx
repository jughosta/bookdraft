import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import Blank from '../components/Blank/Blank';
import CenterView from '../components/CenterView';
import ChapterHeader from '../components/ChapterHeader/ChapterHeader';
import ChapterItemsContainer from '../containers/ChapterItemsContainer';

import { fetchChapter, resetChapter } from '../reducers/chapterSlice';

import { LoadingStatus } from '../utils/redux';

import { NavigationParamsChapterForm } from '../types/navigation.type';
import { RootState } from '../types/redux.type';
import { IChapter } from '../types/chapter.type';
import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChapterScreen'
>;

interface IProps {
  chapterId: number;
  navigation: ScreenNavigationProp;
}

function navigateToEditScreen(
  navigation: ScreenNavigationProp,
  chapter: IChapter,
) {
  if (!chapter) {
    return;
  }

  const params: NavigationParamsChapterForm = {
    bookId: chapter.bookId,
    chapter,
  };

  navigation.navigate('ChapterFormScreen', params);
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

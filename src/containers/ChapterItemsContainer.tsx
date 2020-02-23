import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { useSelector, useDispatch } from 'react-redux';

import CenterView from '../components/CenterView';
import ChapterItemList from '../components/ChapterItemList/ChapterItemList';

import { Screens } from '../utils/navigation';
import { LoadingStatus } from '../utils/redux';

import {
  fetchChapterItems,
  resetChapterItems,
} from '../reducers/chapterItemsSlice';

import {
  NavigationParamsChapterItemForm,
  NavigationParamsChapter,
} from '../types/navigation.type';
import { RootState } from '../types/redux.type';
import { IChapterItem } from '../types/chapterItem.type';

interface IProps {
  chapterId: number;
  navigation: NavigationStackProp<NavigationParamsChapter>;
}

function navigateToCreateScreen(
  navigation: NavigationStackProp<NavigationParamsChapter>,
  chapterId: number,
) {
  const params: NavigationParamsChapterItemForm = {
    chapterId,
  };

  navigation.navigate(Screens.ChapterItemForm, params);
}

function navigateToEditScreen(
  navigation: NavigationStackProp<NavigationParamsChapter>,
  chapterItem: IChapterItem,
) {
  const params: NavigationParamsChapterItemForm = {
    chapterId: chapterItem.chapterId,
    chapterItem,
  };

  navigation.navigate(Screens.ChapterItemForm, params);
}

const ChaptersItemsContainer = React.memo<IProps>(
  ({ chapterId, navigation }) => {
    const dispatch = useDispatch();
    const loadingStatus = useSelector(
      (state: RootState) => state.chapterItems.loadingStatus,
    );
    const chapterItems = useSelector(
      (state: RootState) => state.chapterItems.list,
    );

    useEffect(() => {
      dispatch(fetchChapterItems(chapterId));

      return () => {
        dispatch(resetChapterItems());
      };
    }, [chapterId, dispatch]);

    return (
      <React.Fragment>
        {loadingStatus === LoadingStatus.initial ? (
          <CenterView>
            <ActivityIndicator />
          </CenterView>
        ) : (
          <ChapterItemList
            chapterItems={chapterItems}
            onCreate={() => navigateToCreateScreen(navigation, chapterId)}
            onPress={chapterItem =>
              navigateToEditScreen(navigation, chapterItem)
            }
          />
        )}
      </React.Fragment>
    );
  },
);

export default ChaptersItemsContainer;

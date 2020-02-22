import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

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
import { RootState, ThunkDispatch } from '../types/redux.type';
import { IChapterItem } from '../types/chapterItem.type';

interface IProps {
  chapterId: number;
  chapterItems: IChapterItem[];
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsChapter>;
  dispatch: ThunkDispatch;
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
  ({ chapterId, chapterItems, loadingStatus, navigation, dispatch }) => {
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

const mapStateToProps = ({ chapterItems }: RootState) => ({
  chapterItems: chapterItems.list,
  loadingStatus: chapterItems.loadingStatus,
});

export default connect(mapStateToProps)(ChaptersItemsContainer);

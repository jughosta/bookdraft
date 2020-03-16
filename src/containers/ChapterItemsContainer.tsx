import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import CenterView from '../components/CenterView';
import ChapterItemList from '../components/ChapterItemList/ChapterItemList';

import { LoadingStatus } from '../utils/redux';

import {
  fetchChapterItems,
  resetChapterItems,
} from '../reducers/chapterItemsSlice';

import { NavigationParamsChapterItemForm } from '../types/navigation.type';
import { RootState } from '../types/redux.type';
import { IChapterItem } from '../types/chapterItem.type';
import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChapterScreen'
>;

interface IProps {
  chapterId: number;
  navigation: ScreenNavigationProp;
}

function navigateToCreateScreen(
  navigation: ScreenNavigationProp,
  chapterId: number,
) {
  const params: NavigationParamsChapterItemForm = {
    chapterId,
  };

  navigation.navigate('ChapterItemFormScreen', params);
}

function navigateToEditScreen(
  navigation: ScreenNavigationProp,
  chapterItem: IChapterItem,
) {
  const params: NavigationParamsChapterItemForm = {
    chapterId: chapterItem.chapterId,
    chapterItem,
  };

  navigation.navigate('ChapterItemFormScreen', params);
}

const ChapterItemsContainer = React.memo<IProps>(
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

export default ChapterItemsContainer;

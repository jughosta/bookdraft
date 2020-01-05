import React from 'react';
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
  NavigationParamsChapterItem,
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

class ChaptersItemsContainer extends React.Component<IProps> {
  componentDidMount(): void {
    const { chapterId, dispatch } = this.props;

    dispatch(fetchChapterItems(chapterId));
  }

  componentWillUnmount(): void {
    const { dispatch } = this.props;

    dispatch(resetChapterItems());
  }

  handleOpen = (chapterItem: IChapterItem) => {
    const { navigation } = this.props;

    const params: NavigationParamsChapterItem = {
      chapterItemId: chapterItem.id,
    };

    navigation.navigate(Screens.ChapterItem, params);
  };

  handleCreate = () => {
    const { chapterId, navigation } = this.props;
    const params: NavigationParamsChapterItemForm = {
      chapterId,
    };

    navigation.navigate(Screens.ChapterItemForm, params);
  };

  render() {
    const { chapterItems, loadingStatus } = this.props;

    return (
      <React.Fragment>
        {loadingStatus === LoadingStatus.initial ? (
          <CenterView>
            <ActivityIndicator />
          </CenterView>
        ) : (
          <ChapterItemList
            chapterItems={chapterItems}
            onCreate={this.handleCreate}
            onPress={this.handleOpen}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ chapterItems }: RootState) => ({
  chapterItems: chapterItems.list,
  loadingStatus: chapterItems.loadingStatus,
});

export default connect(mapStateToProps)(ChaptersItemsContainer);

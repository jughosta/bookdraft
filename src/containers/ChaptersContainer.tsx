import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

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
import { RootState, ThunkDispatch } from '../types/redux.type';
import { IChapter } from '../types/chapter.type';

interface IProps {
  bookId: number;
  chapters: IChapter[];
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsBook>;
  dispatch: ThunkDispatch;
}

class ChaptersContainer extends React.Component<IProps> {
  componentDidMount(): void {
    const { bookId, dispatch } = this.props;

    dispatch(fetchChapters(bookId));
  }

  componentWillUnmount(): void {
    const { dispatch } = this.props;

    dispatch(resetChapters());
  }

  handleOpen = (chapter: IChapter) => {
    const { navigation } = this.props;

    const params: NavigationParamsChapter = {
      chapterId: chapter.id,
    };

    navigation.navigate(Screens.Chapter, params);
  };

  handleCreate = () => {
    const { bookId, navigation } = this.props;
    const params: NavigationParamsChapterForm = {
      bookId,
    };

    navigation.navigate(Screens.ChapterForm, params);
  };

  render() {
    const { chapters, loadingStatus } = this.props;

    return (
      <React.Fragment>
        {loadingStatus === LoadingStatus.initial ? (
          <CenterView>
            <ActivityIndicator />
          </CenterView>
        ) : (
          <ChapterList
            chapters={chapters}
            onCreate={this.handleCreate}
            onPress={this.handleOpen}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ chapters }: RootState) => ({
  chapters: chapters.list,
  loadingStatus: chapters.loadingStatus,
});

export default connect(mapStateToProps)(ChaptersContainer);

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';

import Blank from '../components/Blank/Blank';
import CenterView from '../components/CenterView';
import ChapterItemsContainer from '../containers/ChapterItemsContainer';
import Button from '../components/Button/Button';

import { fetchChapter, resetChapter } from '../reducers/chapterSlice';

import { Palette } from '../utils/theme';
import { LoadingStatus } from '../utils/redux';
import { Screens } from '../utils/navigation';

import {
  NavigationParamsChapter,
  NavigationParamsChapterForm,
} from '../types/navigation.type';
import { RootState, ThunkDispatch } from '../types/redux.type';
import { INullableChapter } from '../types/chapter.type';

interface IProps {
  chapterId: number;
  chapter: INullableChapter;
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsChapter>;
  dispatch: ThunkDispatch;
}

class ChapterContainer extends React.Component<IProps> {
  componentDidMount(): void {
    const { chapterId, dispatch } = this.props;

    dispatch(fetchChapter(chapterId));
  }

  componentWillUnmount(): void {
    const { dispatch } = this.props;

    dispatch(resetChapter());
  }

  handleEdit = () => {
    const { chapter, navigation } = this.props;

    if (!chapter) {
      return;
    }

    const params: NavigationParamsChapterForm = {
      bookId: chapter.bookId,
      chapter,
    };

    navigation.navigate(Screens.ChapterForm, params);
  };

  renderHeader() {
    const { chapter } = this.props;

    if (!chapter) {
      return null;
    }

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{chapter.title}</Text>
        <Button title="Edit details" onPress={this.handleEdit} />
      </View>
    );
  }

  render() {
    const { chapter, loadingStatus, navigation } = this.props;

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
          {this.renderHeader()}
          <ChapterItemsContainer
            chapterId={chapter.id}
            navigation={navigation}
          />
        </React.Fragment>
      );
    }

    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    paddingHorizontal: 48,
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Palette.gray.v900,
  },
});

const mapStateToProps = ({ chapter }: RootState) => ({
  chapter: chapter.chapter,
  loadingStatus: chapter.loadingStatus,
});

export default connect(mapStateToProps)(ChapterContainer);

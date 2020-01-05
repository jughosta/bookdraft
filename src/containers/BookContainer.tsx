import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';

import Blank from '../components/Blank/Blank';
import CenterView from '../components/CenterView';
import ChaptersContainer from '../containers/ChaptersContainer';
import Button from '../components/Button/Button';

import { fetchBook, resetBook } from '../reducers/bookSlice';

import { Palette } from '../utils/theme';
import { LoadingStatus } from '../utils/redux';
import { Screens } from '../utils/navigation';

import {
  NavigationParamsBook,
  NavigationParamsBookForm,
} from '../types/navigation.type';
import { RootState, ThunkDispatch } from '../types/redux.type';
import { INullableBook } from '../types/book.type';

interface IProps {
  bookId: number;
  book: INullableBook;
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsBook>;
  dispatch: ThunkDispatch;
}

class BookContainer extends React.Component<IProps> {
  componentDidMount(): void {
    const { bookId, dispatch } = this.props;

    dispatch(fetchBook(bookId));
  }

  componentWillUnmount(): void {
    const { dispatch } = this.props;

    dispatch(resetBook());
  }

  handleEdit = () => {
    const { book, navigation } = this.props;

    if (!book) {
      return;
    }

    const params: NavigationParamsBookForm = {
      book,
    };

    navigation.navigate(Screens.BookForm, params);
  };

  renderHeader() {
    const { book } = this.props;

    if (!book) {
      return null;
    }

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{book.title}</Text>
        <Button title="Edit details" onPress={this.handleEdit} />
      </View>
    );
  }

  render() {
    const { book, loadingStatus, navigation } = this.props;

    if (loadingStatus === LoadingStatus.failed) {
      return (
        <CenterView>
          <Blank message="Book not found" />
        </CenterView>
      );
    }

    if (loadingStatus === LoadingStatus.loaded && book) {
      return (
        <React.Fragment>
          {this.renderHeader()}
          <ChaptersContainer bookId={book.id} navigation={navigation} />
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

const mapStateToProps = ({ book }: RootState) => ({
  book: book.book,
  loadingStatus: book.loadingStatus,
});

export default connect(mapStateToProps)(BookContainer);

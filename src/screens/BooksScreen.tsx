import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import Screen from '../components/Screen';
import CenterView from '../components/CenterView';
import BookList from '../components/BookList/BookList';

import { Screens } from '../utils/navigation';
import { LoadingStatus } from '../utils/redux';

import { fetchBooks } from '../reducers/booksSlice';

import {
  NavigationParamsBook,
  NavigationParamsBooks,
  NavigationParamsForm,
} from '../types/navigation.type';
import { RootState, ThunkDispatch } from '../types/redux.type';
import { IBook } from '../types/book.type';

interface IProps {
  books: IBook[];
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsBooks>;
  dispatch: ThunkDispatch;
}

class BooksScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: 'Books',
  };

  componentDidMount(): void {
    const { dispatch } = this.props;

    dispatch(fetchBooks());
  }

  handleOpenBook = (book: IBook) => {
    const { navigation } = this.props;

    const params: NavigationParamsBook = {
      bookId: book.id,
    };

    navigation.navigate(Screens.Book, params);
  };

  handleCreateBook = () => {
    const { navigation } = this.props;
    const params: NavigationParamsForm = {};

    navigation.navigate(Screens.BookForm, params);
  };

  render() {
    const { books, loadingStatus } = this.props;
    return (
      <Screen>
        {loadingStatus === LoadingStatus.initial ? (
          <CenterView>
            <ActivityIndicator />
          </CenterView>
        ) : (
          <BookList
            books={books}
            onCreate={this.handleCreateBook}
            onPress={this.handleOpenBook}
          />
        )}
      </Screen>
    );
  }
}

const mapStateToProps = ({ books }: RootState) => ({
  books: books.list,
  loadingStatus: books.loadingStatus,
});

export default connect(mapStateToProps)(BooksScreen);

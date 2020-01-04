import React from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import Screen from '../components/Screen';
import BookList from '../components/BookList/BookList';

import { Screens } from '../utils/navigation';
import { LoadingStatus } from '../utils/redux';

import { addBook, fetchBooks } from '../reducers/booksSlice';

import {
  NavigationParamsBook,
  NavigationParamsBooks,
} from '../types/navigation.type';
import { RootState, ThunkDispatch } from '../types/redux.type';
import { Book, BookData } from '../types/book.type';

interface IProps {
  books: Book[];
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

  handleOpenBook = (book: Book) => {
    const { navigation } = this.props;
    const params: NavigationParamsBook = {
      bookId: book.id,
    };

    navigation.navigate(Screens.Book, params);
  };

  handleAddBook = () => {
    const { dispatch } = this.props;
    const bookPayload: BookData = {
      title: 'Text',
    };

    dispatch(addBook(bookPayload));
  };

  render() {
    const { books, loadingStatus } = this.props;
    return (
      <Screen>
        {loadingStatus === LoadingStatus.initial ? (
          <ActivityIndicator />
        ) : (
          <BookList
            books={books}
            onCreate={this.handleAddBook}
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

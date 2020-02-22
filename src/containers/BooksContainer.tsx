import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import CenterView from '../components/CenterView';
import BookList from '../components/BookList/BookList';

import { Screens } from '../utils/navigation';
import { LoadingStatus } from '../utils/redux';

import { fetchBooks, resetBooks } from '../reducers/booksSlice';

import {
  NavigationParamsBook,
  NavigationParamsBooks,
  NavigationParamsBookForm,
} from '../types/navigation.type';
import { RootState, ThunkDispatch } from '../types/redux.type';
import { IBook } from '../types/book.type';

interface IProps {
  books: IBook[];
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsBooks>;
  dispatch: ThunkDispatch;
}

function navigateToViewScreen(
  navigation: NavigationStackProp<NavigationParamsBooks>,
  book: IBook,
) {
  const params: NavigationParamsBook = {
    bookId: book.id,
  };

  navigation.navigate(Screens.Book, params);
}

function navigateToCreateScreen(
  navigation: NavigationStackProp<NavigationParamsBooks>,
) {
  const params: NavigationParamsBookForm = {};

  navigation.navigate(Screens.BookForm, params);
}

const BooksContainer = React.memo<IProps>(
  ({ books, loadingStatus, navigation, dispatch }) => {
    useEffect(() => {
      dispatch(fetchBooks());

      return () => {
        dispatch(resetBooks());
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <React.Fragment>
        {loadingStatus === LoadingStatus.initial ? (
          <CenterView>
            <ActivityIndicator />
          </CenterView>
        ) : (
          <BookList
            books={books}
            onCreate={() => navigateToCreateScreen(navigation)}
            onPress={book => navigateToViewScreen(navigation, book)}
          />
        )}
      </React.Fragment>
    );
  },
);

const mapStateToProps = ({ books }: RootState) => ({
  books: books.list,
  loadingStatus: books.loadingStatus,
});

export default connect(mapStateToProps)(BooksContainer);

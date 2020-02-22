import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { NavigationStackProp } from 'react-navigation-stack';

import Blank from '../components/Blank/Blank';
import BookHeader from '../components/BookHeader/BookHeader';
import CenterView from '../components/CenterView';
import ChaptersContainer from '../containers/ChaptersContainer';

import { fetchBook, resetBook } from '../reducers/bookSlice';

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

function navigateToEditScreen(
  book: INullableBook,
  navigation: NavigationStackProp<NavigationParamsBook>,
) {
  if (!book) {
    return;
  }

  const params: NavigationParamsBookForm = {
    book,
  };

  navigation.navigate(Screens.BookForm, params);
}

const BookContainer = React.memo<IProps>(
  ({ bookId, book, loadingStatus, navigation, dispatch }) => {
    useEffect(() => {
      dispatch(fetchBook(bookId));

      return () => {
        dispatch(resetBook());
      };
    }, [bookId, dispatch]);

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
          <BookHeader
            book={book}
            onEdit={() => navigateToEditScreen(book, navigation)}
          />
          <ChaptersContainer bookId={book.id} navigation={navigation} />
        </React.Fragment>
      );
    }

    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  },
);

const mapStateToProps = ({ book }: RootState) => ({
  book: book.book,
  loadingStatus: book.loadingStatus,
});

export default connect(mapStateToProps)(BookContainer);

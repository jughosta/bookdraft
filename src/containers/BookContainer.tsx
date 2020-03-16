import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import Blank from '../components/Blank/Blank';
import BookHeader from '../components/BookHeader/BookHeader';
import CenterView from '../components/CenterView';
import ChaptersContainer from '../containers/ChaptersContainer';

import { fetchBook, resetBook } from '../reducers/bookSlice';

import { LoadingStatus } from '../utils/redux';

import { NavigationParamsBookForm } from '../types/navigation.type';
import { RootState } from '../types/redux.type';
import { INullableBook } from '../types/book.type';
import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookScreen'
>;

interface IProps {
  bookId: number;
  navigation: ScreenNavigationProp;
}

function navigateToEditScreen(
  navigation: ScreenNavigationProp,
  book: INullableBook,
) {
  if (!book) {
    return;
  }

  const params: NavigationParamsBookForm = {
    book,
  };

  navigation.navigate('BookFormScreen', params);
}

const BookContainer = React.memo<IProps>(({ bookId, navigation }) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state: RootState) => state.book.loadingStatus,
  );
  const book = useSelector((state: RootState) => state.book.book);

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
          onEdit={() => navigateToEditScreen(navigation, book)}
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
});

export default BookContainer;

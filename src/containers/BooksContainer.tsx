import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import CenterView from '../components/CenterView';
import BookList from '../components/BookList/BookList';

import { LoadingStatus } from '../utils/redux';

import { fetchBooks, resetBooks } from '../reducers/booksSlice';

import {
  NavigationParamsBook,
  NavigationParamsBookForm,
} from '../types/navigation.type';
import { RootState } from '../types/redux.type';
import { IBook } from '../types/book.type';
import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BooksScreen'
>;

interface IProps {
  navigation: ScreenNavigationProp;
}

function navigateToViewScreen(navigation: ScreenNavigationProp, book: IBook) {
  const params: NavigationParamsBook = {
    bookId: book.id,
  };

  navigation.navigate('BookScreen', params);
}

function navigateToCreateScreen(navigation: ScreenNavigationProp) {
  const params: NavigationParamsBookForm = {};

  navigation.navigate('BookFormScreen', params);
}

const BooksContainer = React.memo<IProps>(({ navigation }) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(
    (state: RootState) => state.books.loadingStatus,
  );
  const books = useSelector((state: RootState) => state.books.list);

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
});

export default BooksContainer;

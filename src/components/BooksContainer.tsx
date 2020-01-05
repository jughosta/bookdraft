import React from 'react';
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

class BooksContainer extends React.Component<IProps> {
  componentDidMount(): void {
    const { dispatch } = this.props;

    dispatch(fetchBooks());
  }

  componentWillUnmount(): void {
    const { dispatch } = this.props;

    dispatch(resetBooks());
  }

  handleOpen = (book: IBook) => {
    const { navigation } = this.props;

    const params: NavigationParamsBook = {
      bookId: book.id,
    };

    navigation.navigate(Screens.Book, params);
  };

  handleCreate = () => {
    const { navigation } = this.props;
    const params: NavigationParamsBookForm = {};

    navigation.navigate(Screens.BookForm, params);
  };

  render() {
    const { books, loadingStatus } = this.props;
    return (
      <React.Fragment>
        {loadingStatus === LoadingStatus.initial ? (
          <CenterView>
            <ActivityIndicator />
          </CenterView>
        ) : (
          <BookList
            books={books}
            onCreate={this.handleCreate}
            onPress={this.handleOpen}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ books }: RootState) => ({
  books: books.list,
  loadingStatus: books.loadingStatus,
});

export default connect(mapStateToProps)(BooksContainer);

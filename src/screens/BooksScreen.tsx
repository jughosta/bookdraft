import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import Screen from '../components/Screen';
import BookList from '../components/BookList/BookList';

import { Screens } from '../utils/navigation';

import { addBook, fetchBooks } from '../reducers/booksSlice';

import {
  NavigationParamsBook,
  NavigationParamsBooks,
} from '../types/navigation.type';
import { RootState, ThunkDispatch } from '../types/redux.type';
import { Book, BookData } from '../types/book.type';

interface IProps {
  books: Book[];
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
    const { books } = this.props;
    return (
      <Screen>
        <BookList
          books={books}
          onAdd={this.handleAddBook}
          onPress={this.handleOpenBook}
        />
      </Screen>
    );
  }
}

const mapStateToProps = ({ books }: RootState) => ({
  books: books.list,
});

export default connect(mapStateToProps)(BooksScreen);

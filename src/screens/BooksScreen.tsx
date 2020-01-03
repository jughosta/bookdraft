import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import Button from '../components/Button/Button';
import Screen from '../components/Screen';

import { Screens } from '../utils/navigation';

import { addBook, fetchBooks } from '../reducers/booksSlice';

import {
  NavigationParamsBook,
  NavigationParamsBooks,
} from '../types/navigation.type';
import { RootState, ThunkDispatch } from '../types/redux.type';
import { Book, BookData } from '../types/book.type';

type Props = {
  books: Book[];
  navigation: NavigationStackProp<NavigationParamsBooks>;
  dispatch: ThunkDispatch;
};

class BooksScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Books',
  };

  componentDidMount(): void {
    const { dispatch } = this.props;

    dispatch(fetchBooks());
  }

  handleOpenBook = () => {
    const { navigation } = this.props;
    const params: NavigationParamsBook = {
      bookId: 1,
    };

    navigation.navigate(Screens.Book, params);
  };

  handleAddBook = () => {
    const { dispatch } = this.props;
    const bookPayload: BookData = {
      title: 'Text',
      description: 'Example description',
    };

    dispatch(addBook(bookPayload));
  };

  render() {
    const { books } = this.props;
    return (
      <Screen>
        <View style={styles.container}>
          <Button title="Open book" onPress={this.handleOpenBook} />
          <Text>{JSON.stringify(books)}</Text>
          <Button icon="+" title="Add book" onPress={this.handleAddBook} />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({ books }: RootState) => ({
  books: books.list,
});

export default connect(mapStateToProps)(BooksScreen);

import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';

import Screen from '../components/Screen';

import { Screens } from '../utils/navigation';

import { addBook } from '../reducers/booksSlice';

import {
  NavigationParamsBook,
  NavigationParamsBooks,
} from '../types/navigation.type';
import { RootState } from '../types/rootState.type';
import { Book } from '../types/book.type';

type Props = {
  books: Book[];
  navigation: NavigationStackProp<NavigationParamsBooks>;
  addBook: typeof addBook;
};

class BooksScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Books',
  };

  handleOpenBook = () => {
    const { navigation } = this.props;
    const params: NavigationParamsBook = {
      bookId: 1,
    };

    navigation.navigate(Screens.Book, params);
  };

  handleAddBook = () => {
    this.props.addBook({
      title: 'Text',
      description: 'Example description',
    });
  };

  render() {
    const { books } = this.props;
    return (
      <Screen>
        <View style={styles.container}>
          <Button title="Open book" onPress={this.handleOpenBook} />
          <Text>{JSON.stringify(books)}</Text>
          <Button title="Add book" onPress={this.handleAddBook} />
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
  books,
});

const mapDispatchToProps = { addBook };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BooksScreen);

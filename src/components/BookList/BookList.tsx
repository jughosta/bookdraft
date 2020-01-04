import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import BookCard from '../BookCard/BookCard';
import Button from '../Button/Button';
import Blank from '../Blank/Blank';

import { Book } from '../../types/book.type';

interface IProps {
  books: Book[];
  onCreate: () => void;
  onPress: (book: Book) => void;
}

interface IListItem {
  item: Book;
}

class BookList extends React.Component<IProps> {
  getKeyExtractor = (book: Book) => `book-${book.id}`;

  renderItem = ({ item }: IListItem) => {
    const { onPress } = this.props;

    return <BookCard book={item} onPress={onPress} />;
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  renderFooter = () => {
    const { onCreate } = this.props;

    return <Button icon="+" title="Create book" onPress={onCreate} />;
  };

  renderEmpty = () => (
    <Blank message="Hi! Welcome to BookDraft app - a place to write a book on the go! Start by creating your first book via the button below." />
  );

  render() {
    const { books } = this.props;

    return (
      <FlatList
        style={styles.container}
        data={books}
        keyExtractor={this.getKeyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        ListFooterComponentStyle={styles.footer}
        ListEmptyComponent={this.renderEmpty}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  separator: {
    marginBottom: 16,
  },
  footer: {
    marginTop: 24,
    marginBottom: 48,
    alignItems: 'flex-start',
  },
});

export default BookList;

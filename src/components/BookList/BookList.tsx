import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import BookCard from '../BookCard/BookCard';
import Button from '../Button/Button';
import Blank from '../Blank/Blank';

import { IBook } from '../../types/book.type';

interface IProps {
  books: IBook[];
  onCreate: () => void;
  onPress: (book: IBook) => void;
}

interface IListItem {
  item: IBook;
}

const BookList = React.memo<IProps>(({ books, onCreate, onPress }) => (
  <FlatList
    style={styles.container}
    data={books}
    keyExtractor={(book: IBook) => `book-${book.id}`}
    renderItem={({ item }: IListItem) => (
      <BookCard book={item} onPress={onPress} />
    )}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    ListFooterComponent={() => (
      <Button icon="+" title="Create book" onPress={onCreate} />
    )}
    ListFooterComponentStyle={styles.footer}
    ListEmptyComponent={() => (
      <Blank message="Hi! Welcome to BookDraft app - a place to write a book on the go! Start by creating your first book via the button below." />
    )}
  />
));

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

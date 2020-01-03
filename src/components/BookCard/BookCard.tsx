import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Touchable from '../Touchable';

import { Colors } from '../../utils/theme';

import { Book } from '../../types/book.type';

interface IProps {
  book: Book;
  onPress: (book: Book) => void;
}

class BookCard extends React.Component<IProps> {
  handlePress = () => {
    const { book, onPress } = this.props;

    onPress(book);
  };

  render() {
    const { book } = this.props;

    return (
      <Touchable onPress={this.handlePress}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>
              {book.title}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 4,
    backgroundColor: Colors.white,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    color: Colors.black,
  },
});

export default BookCard;

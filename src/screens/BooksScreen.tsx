import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';

import { Screens } from '../utils/navigation';

import {
  NavigationParamsBook,
  NavigationParamsBooks,
} from '../types/navigation.type';

interface Props {
  navigation: NavigationStackProp<NavigationParamsBooks>;
}

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

  render() {
    return (
      <Screen>
        <View style={styles.container}>
          <Text>BookDraft app</Text>
          <Button title="Open book" onPress={this.handleOpenBook} />
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

export default BooksScreen;

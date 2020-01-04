import React from 'react';
import { Text } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';

import { NavigationParamsBook } from '../types/navigation.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsBook>;
}

class BookScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: 'Book',
  };

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        <Text>Book screen</Text>
        <Text>#{navigation.getParam('bookId')}</Text>
      </Screen>
    );
  }
}

export default BookScreen;

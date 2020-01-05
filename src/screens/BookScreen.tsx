import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';
import BookContainer from '../containers/BookContainer';

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
        <BookContainer
          bookId={navigation.getParam('bookId')}
          navigation={navigation}
        />
      </Screen>
    );
  }
}

export default BookScreen;

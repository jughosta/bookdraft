import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';
import BookContainer from '../containers/BookContainer';

import { NavigationParamsBook } from '../types/navigation.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsBook>;
}

const BookScreen = ({ navigation }: IProps) => (
  <Screen>
    <BookContainer
      bookId={navigation.getParam('bookId')}
      navigation={navigation}
    />
  </Screen>
);

BookScreen.navigationOptions = {
  title: 'Book',
};

export default BookScreen;

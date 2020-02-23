import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';
import BooksContainer from '../containers/BooksContainer';

import { NavigationParamsBooks } from '../types/navigation.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsBooks>;
}

const BooksScreen = ({ navigation }: IProps) => (
  <Screen>
    <BooksContainer navigation={navigation} />
  </Screen>
);

BooksScreen.navigationOptions = {
  title: 'Books',
};

export default BooksScreen;

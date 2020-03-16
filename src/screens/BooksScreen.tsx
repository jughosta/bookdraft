import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen from '../components/Screen';
import BooksContainer from '../containers/BooksContainer';

import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BooksScreen'
>;

interface IProps {
  navigation: ScreenNavigationProp;
}

const BooksScreen = ({ navigation }: IProps) => (
  <Screen>
    <BooksContainer navigation={navigation} />
  </Screen>
);

export default BooksScreen;

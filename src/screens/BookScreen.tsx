import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Screen from '../components/Screen';
import BookContainer from '../containers/BookContainer';

import { RootStackParamList } from '../types/navigation.type';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookScreen'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'BookScreen'>;

interface IProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

const BookScreen = ({ navigation, route }: IProps) => (
  <Screen>
    <BookContainer bookId={route.params.bookId} navigation={navigation} />
  </Screen>
);

export default BookScreen;

import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import BooksScreen from './screens/BooksScreen';
import BookScreen from './screens/BookScreen';

import { Screens } from './utils/navigation';

const AppNavigator = createStackNavigator(
  {
    [Screens.Books]: BooksScreen,
    [Screens.Book]: BookScreen,
  },
  {
    initialRouteName: Screens.Books,
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <AppContainer />
  </>
);

export default App;

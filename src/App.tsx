import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import BooksScreen from './screens/BooksScreen';
import BookScreen from './screens/BookScreen';

import { Screens } from './utils/navigation';
import { Colors } from './utils/theme';

const AppNavigator = createStackNavigator(
  {
    [Screens.Books]: BooksScreen,
    [Screens.Book]: BookScreen,
  },
  {
    initialRouteName: Screens.Books,
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTintColor: Colors.dark,
      headerStyle: {
        backgroundColor: Colors.lighter,
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />
    <AppContainer />
  </>
);

export default App;

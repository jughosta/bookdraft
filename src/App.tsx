import React from 'react';
import { StatusBar } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import BooksScreen from './screens/BooksScreen';
import BookScreen from './screens/BookScreen';
import StorageProvider from './components/StorageProvider';

import { Screens } from './utils/navigation';
import { Palette } from './utils/theme';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

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
      headerTintColor: Palette.gray.v900,
      headerStyle: {
        backgroundColor: Palette.gray.v300,
        borderBottomWidth: 0,
        elevation: 0,
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="dark-content" backgroundColor={Palette.gray.v300} />
    <StorageProvider />
    <AppContainer />
  </Provider>
);

export default App;

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
import BookFormScreen from './screens/BookFormScreen';
import ChapterFormScreen from './screens/ChapterFormScreen';

const store = configureStore({
  reducer: rootReducer,
});

const AppNavigator = createStackNavigator(
  {
    [Screens.Books]: BooksScreen,
    [Screens.Book]: BookScreen,
    [Screens.BookForm]: BookFormScreen,
    [Screens.ChapterForm]: ChapterFormScreen,
  },
  {
    initialRouteName: Screens.Books,
    headerBackTitleVisible: false,
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTintColor: Palette.gray.v900,
      headerRightContainerStyle: {
        marginRight: 9,
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="dark-content" backgroundColor={Palette.white} />
    <StorageProvider>
      <AppContainer />
    </StorageProvider>
  </Provider>
);

export default App;

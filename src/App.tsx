import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import BooksScreen from './screens/BooksScreen';
import BookScreen from './screens/BookScreen';
import BookFormScreen from './screens/BookFormScreen';
import ChapterScreen from './screens/ChapterScreen';
import ChapterFormScreen from './screens/ChapterFormScreen';
import ChapterItemFormScreen from './screens/ChapterItemFormScreen';

import Touchable from './components/Touchable';
import IconTrash from './icons/IconTrash';

import StorageProvider from './containers/StorageProvider';

import { Palette } from './utils/theme';

import rootReducer from './reducers';

import { RootStackParamList } from './types/navigation.type';

const store = configureStore({
  reducer: rootReducer,
});

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Stack.Navigator
    initialRouteName="BooksScreen"
    screenOptions={{
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTintColor: Palette.gray.v900,
      headerRightContainerStyle: {
        marginRight: 9,
      },
    }}>
    <Stack.Screen
      name="BooksScreen"
      component={BooksScreen}
      options={{
        title: 'Books',
      }}
    />
    <Stack.Screen
      name="BookScreen"
      component={BookScreen}
      options={{ title: 'Book' }}
    />
    <Stack.Screen
      name="BookFormScreen"
      component={BookFormScreen}
      options={({ route }) => ({
        title: route.params.book ? 'Book details' : 'New book',
        headerRight: () =>
          route.params.book ? (
            <Touchable onPress={route.params.onConfirmDeletion}>
              <IconTrash fillColor={Palette.gray.v900} size={20} />
            </Touchable>
          ) : null,
      })}
    />
    <Stack.Screen
      name="ChapterScreen"
      component={ChapterScreen}
      options={{
        title: 'Chapter',
      }}
    />
    <Stack.Screen
      name="ChapterFormScreen"
      component={ChapterFormScreen}
      options={({ route }) => ({
        title: route.params.chapter ? 'Chapter details' : 'New chapter',
        headerRight: () =>
          route.params.chapter ? (
            <Touchable onPress={route.params.onConfirmDeletion}>
              <IconTrash fillColor={Palette.gray.v900} size={20} />
            </Touchable>
          ) : null,
      })}
    />
    <Stack.Screen
      name="ChapterItemFormScreen"
      component={ChapterItemFormScreen}
      options={({ route }) => ({
        title: route.params.chapterItem ? 'Scene' : 'New scene',
        headerRight: () =>
          route.params.chapterItem ? (
            <Touchable onPress={route.params.onConfirmDeletion}>
              <IconTrash fillColor={Palette.gray.v900} size={20} />
            </Touchable>
          ) : null,
      })}
    />
  </Stack.Navigator>
);

const App = () => (
  <Provider store={store}>
    <StatusBar barStyle="dark-content" backgroundColor={Palette.white} />
    <StorageProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </StorageProvider>
  </Provider>
);

export default App;

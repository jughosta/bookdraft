import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import Screen from '../components/Screen';
import Form from '../components/Form/Form';

import { createBook, deleteBook, editBook } from '../reducers/bookSlice';

import { getBookFormFields } from '../utils/form';
import { confirmDeletion } from '../utils/alerts';

import { RootStackParamList } from '../types/navigation.type';
import { FormValues } from '../types/form.type';
import { IBookData } from 'src/types/book.type';
import { ThunkDispatch } from '../types/redux.type';
import { RouteProp } from '@react-navigation/native';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BookFormScreen'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'BookFormScreen'>;

interface IProps {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

async function handleSubmit(
  values: FormValues,
  navigation: ScreenNavigationProp,
  route: ScreenRouteProp,
  dispatch: ThunkDispatch,
) {
  const bookId = (route.params.book || {}).id;
  const bookData: IBookData = {
    title: values.title,
  };

  try {
    if (bookId) {
      await dispatch(editBook(bookId, bookData));
    } else {
      await dispatch(createBook(bookData));
    }
    navigation.goBack();
  } catch (error) {
    console.warn(error);
  }
}

async function handleDelete(
  navigation: ScreenNavigationProp,
  route: ScreenRouteProp,
  dispatch: ThunkDispatch,
) {
  try {
    const bookId = (route.params.book || {}).id;
    if (bookId) {
      await dispatch(deleteBook(bookId));
    }
    navigation.pop(2);
  } catch (error) {
    console.warn(error);
  }
}

const BookFormScreen = ({ navigation, route }: IProps) => {
  const dispatch = useDispatch();
  const book = route.params.book;

  useEffect(() => {
    if (book) {
      navigation.setParams({
        onConfirmDeletion: confirmDeletion('book and its content', () =>
          handleDelete(navigation, route, dispatch),
        ),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Screen scrollable>
      <Form
        fields={getBookFormFields(book)}
        onSubmit={values => handleSubmit(values, navigation, route, dispatch)}
      />
    </Screen>
  );
};

export default BookFormScreen;

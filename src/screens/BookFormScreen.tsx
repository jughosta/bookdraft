import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack';

import Screen from '../components/Screen';
import Form from '../components/Form/Form';
import Touchable from '../components/Touchable';
import IconTrash from '../icons/IconTrash';

import { createBook, deleteBook, editBook } from '../reducers/bookSlice';

import { getBookFormFields } from '../utils/form';
import { Palette } from '../utils/theme';
import { confirmDeletion } from '../utils/alerts';

import { NavigationParamsBookForm } from '../types/navigation.type';
import { FormValues } from '../types/form.type';
import { IBookData } from 'src/types/book.type';
import { ThunkDispatch } from '../types/redux.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsBookForm>;
  dispatch: ThunkDispatch;
}

async function handleSubmit(
  values: FormValues,
  navigation: NavigationStackProp<NavigationParamsBookForm>,
  dispatch: ThunkDispatch,
) {
  const bookId = navigation.getParam('book', {}).id;
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
  navigation: NavigationStackProp<NavigationParamsBookForm>,
  dispatch: ThunkDispatch,
) {
  try {
    await dispatch(deleteBook(navigation.getParam('book').id));
    navigation.pop(2);
  } catch (error) {
    console.warn(error);
  }
}

const BookFormScreen = ({ navigation, dispatch }: IProps) => {
  useEffect(() => {
    const book = navigation.getParam('book');

    if (book) {
      navigation.setParams({
        onConfirmDeletion: confirmDeletion('book and its content', () =>
          handleDelete(navigation, dispatch),
        ),
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const book = navigation.getParam('book');

  return (
    <Screen scrollable>
      <Form
        fields={getBookFormFields(book)}
        onSubmit={values => handleSubmit(values, navigation, dispatch)}
      />
    </Screen>
  );
};

BookFormScreen.navigationOptions = ({
  navigation,
}: NavigationStackScreenProps<NavigationParamsBookForm>) => {
  return {
    title: navigation.getParam('book') ? 'Book details' : 'New book',
    headerRight: () =>
      navigation.getParam('book') ? (
        <Touchable onPress={navigation.getParam('onConfirmDeletion')}>
          <IconTrash fillColor={Palette.gray.v900} size={20} />
        </Touchable>
      ) : null,
  };
};

export default connect()(BookFormScreen);

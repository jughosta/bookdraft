import React from 'react';
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

class BookFormScreen extends React.Component<IProps> {
  static navigationOptions = ({
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

  componentDidMount(): void {
    const { navigation } = this.props;
    const book = navigation.getParam('book');

    if (book) {
      navigation.setParams({
        onConfirmDeletion: confirmDeletion(
          'book and its content',
          this.handleDelete,
        ),
      });
    }
  }

  handleDelete = async () => {
    const { navigation, dispatch } = this.props;

    try {
      await dispatch(deleteBook(navigation.getParam('book').id));
      navigation.pop(2);
    } catch (error) {
      console.warn(error);
    }
  };

  handleSubmit = async (values: FormValues) => {
    const { navigation, dispatch } = this.props;
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
  };

  renderContent() {
    const { navigation } = this.props;
    const book = navigation.getParam('book');

    return (
      <Form fields={getBookFormFields(book)} onSubmit={this.handleSubmit} />
    );
  }

  render() {
    return <Screen scrollable>{this.renderContent()}</Screen>;
  }
}

export default connect()(BookFormScreen);

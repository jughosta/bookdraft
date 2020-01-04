import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import Screen from '../components/Screen';
import Form from '../components/Form/Form';

import { getBookFormFields } from '../utils/form';

import { NavigationParamsForm } from '../types/navigation.type';
import { FormMode, FormValues } from '../types/form.type';
import { Book } from 'src/types/book.type';

interface IState {
  book?: Book;
}

class BookFormScreen extends React.Component<
  NavigationStackScreenProps<NavigationParamsForm>,
  IState
> {
  static navigationOptions = ({
    navigation,
  }: NavigationStackScreenProps<NavigationParamsForm>) => {
    return {
      title:
        navigation.getParam('mode', FormMode.edit) === FormMode.edit
          ? 'Book details'
          : 'New book',
    };
  };

  state = {
    book: undefined,
  };

  handleSubmit = async (values: FormValues) => {
    console.warn(values);
  };

  render() {
    const { book } = this.state;

    return (
      <Screen scrollable>
        <Form fields={getBookFormFields(book)} onSubmit={this.handleSubmit} />
      </Screen>
    );
  }
}

export default BookFormScreen;

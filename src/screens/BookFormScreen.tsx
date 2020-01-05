import React from 'react';
import { connect } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { ActivityIndicator } from 'react-native';

import Screen from '../components/Screen';
import Form from '../components/Form/Form';
import CenterView from '../components/CenterView';
import Blank from '../components/Blank/Blank';

import {
  createBook,
  editBook,
  fetchBook,
  resetBook,
} from '../reducers/bookSlice';

import { getBookFormFields } from '../utils/form';
import { LoadingStatus } from '../utils/redux';

import {
  NavigationParamsBooks,
  NavigationParamsForm,
} from '../types/navigation.type';
import { FormValues } from '../types/form.type';
import { BookData, NullableBook } from 'src/types/book.type';
import { RootState, ThunkDispatch } from '../types/redux.type';

interface IProps {
  book: NullableBook;
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsBooks>;
  dispatch: ThunkDispatch;
}

class BookFormScreen extends React.Component<IProps> {
  static navigationOptions = ({
    navigation,
  }: NavigationStackScreenProps<NavigationParamsForm>) => {
    return {
      title: navigation.getParam('id') ? 'Book details' : 'New book',
    };
  };

  componentDidMount(): void {
    const { navigation, dispatch } = this.props;
    const bookId = navigation.getParam('id');

    if (bookId) {
      dispatch(fetchBook(bookId));
    }
  }

  componentWillUnmount(): void {
    const { dispatch } = this.props;

    dispatch(resetBook);
  }

  handleSubmit = async (values: FormValues) => {
    const { navigation, dispatch } = this.props;
    const bookId = navigation.getParam('id');
    const bookData: BookData = {
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
    const { book, loadingStatus, navigation } = this.props;

    if (!navigation.getParam('id')) {
      return (
        <Form fields={getBookFormFields(null)} onSubmit={this.handleSubmit} />
      );
    }

    if (loadingStatus === LoadingStatus.failed) {
      return <Blank message="Book not found" />;
    }

    if (loadingStatus === LoadingStatus.loaded && book) {
      return (
        <Form fields={getBookFormFields(book)} onSubmit={this.handleSubmit} />
      );
    }

    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }

  render() {
    return <Screen scrollable>{this.renderContent()}</Screen>;
  }
}

const mapStateToProps = ({ book }: RootState) => ({
  book: book.book,
  loadingStatus: book.loadingStatus,
});

export default connect(mapStateToProps)(BookFormScreen);

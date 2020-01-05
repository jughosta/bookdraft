import React from 'react';
import { connect } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack';
import { ActivityIndicator, Alert } from 'react-native';

import Screen from '../components/Screen';
import Form from '../components/Form/Form';
import CenterView from '../components/CenterView';
import Blank from '../components/Blank/Blank';
import Touchable from '../components/Touchable';
import IconTrash from '../icons/IconTrash';

import {
  createBook,
  deleteBook,
  editBook,
  fetchBook,
  resetBook,
} from '../reducers/bookSlice';

import { getBookFormFields } from '../utils/form';
import { LoadingStatus } from '../utils/redux';
import { Palette } from '../utils/theme';

import { NavigationParamsForm } from '../types/navigation.type';
import { FormValues } from '../types/form.type';
import { IBookData, INullableBook } from 'src/types/book.type';
import { RootState, ThunkDispatch } from '../types/redux.type';

interface IProps {
  book: INullableBook;
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsForm>;
  dispatch: ThunkDispatch;
}

class BookFormScreen extends React.Component<IProps> {
  static navigationOptions = ({
    navigation,
  }: NavigationStackScreenProps<NavigationParamsForm>) => {
    return {
      title: navigation.getParam('id') ? 'Book details' : 'New book',
      headerRight: () =>
        navigation.getParam('id') ? (
          <Touchable onPress={navigation.getParam('onHeaderRightPressed')}>
            <IconTrash fillColor={Palette.gray.v900} size={20} />
          </Touchable>
        ) : null,
    };
  };

  componentDidMount(): void {
    const { navigation, dispatch } = this.props;
    const bookId = navigation.getParam('id');

    if (bookId) {
      navigation.setParams({
        onHeaderRightPressed: this.handleConfirmDeletion,
      });

      dispatch(fetchBook(bookId));
    }
  }

  componentWillUnmount(): void {
    const { dispatch } = this.props;

    dispatch(resetBook);
  }

  handleDelete = async () => {
    const { navigation, dispatch } = this.props;

    try {
      await dispatch(deleteBook(navigation.getParam('id')));
      navigation.pop(2);
    } catch (error) {
      console.warn(error);
    }
  };

  handleConfirmDeletion = () => {
    Alert.alert(
      'Heads up!',
      'Are you sure you want to delete this book and its content?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes, delete',
          onPress: this.handleDelete,
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  handleSubmit = async (values: FormValues) => {
    const { navigation, dispatch } = this.props;
    const bookId = navigation.getParam('id');
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

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackScreenProps,
} from 'react-navigation-stack';

import Screen from '../components/Screen';
import Touchable from '../components/Touchable';
import IconPencil from '../icons/IconPencil';
import Blank from '../components/Blank/Blank';
import CenterView from '../components/CenterView';

import { fetchBook, resetBook } from '../reducers/bookSlice';

import { Palette } from '../utils/theme';
import { Screens } from '../utils/navigation';
import { LoadingStatus } from '../utils/redux';

import {
  NavigationParamsBook,
  NavigationParamsForm,
} from '../types/navigation.type';
import { RootState, ThunkDispatch } from '../types/redux.type';
import { NullableBook } from '../types/book.type';

interface IProps {
  book: NullableBook;
  loadingStatus: LoadingStatus;
  navigation: NavigationStackProp<NavigationParamsBook>;
  dispatch: ThunkDispatch;
}

class BookScreen extends React.Component<IProps> {
  static navigationOptions = ({
    navigation,
  }: NavigationStackScreenProps<NavigationParamsBook>) => ({
    title: 'Book',
    headerRight: () => (
      <Touchable onPress={navigation.getParam('onHeaderRightPressed')}>
        <IconPencil fillColor={Palette.gray.v900} size={20} />
      </Touchable>
    ),
  });

  componentDidMount(): void {
    const { navigation, dispatch } = this.props;
    const bookId = navigation.getParam('bookId');

    navigation.setParams({
      onHeaderRightPressed: this.handleEditBook,
    });

    dispatch(fetchBook(bookId));
  }

  componentWillUnmount(): void {
    const { dispatch } = this.props;

    dispatch(resetBook);
  }

  handleEditBook = () => {
    const { navigation } = this.props;

    const params: NavigationParamsForm = {
      id: navigation.getParam('bookId'),
    };

    navigation.navigate(Screens.BookForm, params);
  };

  renderHeader() {
    const { book } = this.props;

    if (!book) {
      return null;
    }

    return (
      <View style={styles.header}>
        <Text style={styles.title}>{book.title}</Text>
      </View>
    );
  }

  renderContent() {
    const { loadingStatus } = this.props;

    if (loadingStatus === LoadingStatus.failed) {
      return <Blank message="Book not found" />;
    }

    if (loadingStatus === LoadingStatus.loaded) {
      return this.renderHeader();
    }

    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }

  render() {
    return <Screen>{this.renderContent()}</Screen>;
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    paddingHorizontal: 48,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Palette.gray.v900,
  },
});

const mapStateToProps = ({ book }: RootState) => ({
  book: book.book,
  loadingStatus: book.loadingStatus,
});

export default connect(mapStateToProps)(BookScreen);

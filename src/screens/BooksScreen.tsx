import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

import Screen from '../components/Screen';
import BooksContainer from '../components/BooksContainer';

import { NavigationParamsBooks } from '../types/navigation.type';

interface IProps {
  navigation: NavigationStackProp<NavigationParamsBooks>;
}

class BooksScreen extends React.Component<IProps> {
  static navigationOptions = {
    title: 'Books',
  };

  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <BooksContainer navigation={navigation} />
      </Screen>
    );
  }
}

export default BooksScreen;

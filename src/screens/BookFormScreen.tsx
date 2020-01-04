import React from 'react';
import { Text } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';

import Screen from '../components/Screen';

import { NavigationParamsForm } from '../types/navigation.type';
import { FormMode } from '../types/form.type';

class BookFormScreen extends React.Component<
  NavigationStackScreenProps<NavigationParamsForm>
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

  render() {
    const { navigation } = this.props;

    return (
      <Screen>
        <Text>Book form screen</Text>
        <Text>#{navigation.getParam('id')}</Text>
      </Screen>
    );
  }
}

export default BookFormScreen;

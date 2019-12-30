import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import { Colors } from '../utils/theme';

import { NavigationParamsBook } from '../types/navigation.type';

type Props = {
  navigation: NavigationStackProp<NavigationParamsBook>;
};

class BookScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Book',
  };

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body as StyleProp<ViewStyle>}>
          <Text>Book screen</Text>
          <Text>#{navigation.getParam('bookId')}</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    color: Colors.dark,
  },
});

export default BookScreen;

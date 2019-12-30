import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StyleProp,
  ViewStyle,
  Button,
} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import { Colors } from '../utils/theme';
import { Screens } from '../utils/navigation';

import {
  NavigationParamsBook,
  NavigationParamsBooks,
} from '../types/navigation.type';

type Props = {
  navigation: NavigationStackProp<NavigationParamsBooks>;
};

class BooksScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'BookDraft',
  };

  handleOpenBook = () => {
    const { navigation } = this.props;
    const params: NavigationParamsBook = {
      bookId: 1,
    };

    navigation.navigate(Screens.Book, params);
  };

  render() {
    return (
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body as StyleProp<ViewStyle>}>
          <Text>BookDraft app</Text>
          <Button title="Open book" onPress={this.handleOpenBook} />
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

export default BooksScreen;

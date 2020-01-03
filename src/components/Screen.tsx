import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Colors } from '../utils/theme';

interface IProps {
  children: JSX.Element[] | JSX.Element;
}

const Screen = ({ children }: IProps) => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    bounces={false}
    style={styles.scrollView}>
    {children}
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    color: Colors.dark,
    backgroundColor: Colors.lighter,
  },
});

export default Screen;

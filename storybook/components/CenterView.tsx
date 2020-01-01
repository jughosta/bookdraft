import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../src/utils/theme';

type Props = {
  children: JSX.Element[] | JSX.Element;
};

const CenterView = ({ children }: Props) => (
  <View style={styles.main}>{children}</View>
);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lighter,
  },
});

export default CenterView;

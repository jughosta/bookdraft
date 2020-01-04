import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '../../utils/theme';

interface IProps {
  message: string;
}

const Blank = ({ message }: IProps) => (
  <View style={styles.container}>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 24,
  },
  message: {
    color: Palette.gray.v700,
  },
});

export default Blank;

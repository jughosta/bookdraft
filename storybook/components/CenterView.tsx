import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '../../src/utils/theme';

interface IProps {
  usesFullWidth?: boolean;
  children: JSX.Element[] | JSX.Element;
}

const CenterView = ({ usesFullWidth, children }: IProps) => (
  <View style={usesFullWidth ? styles.stretched : styles.normal}>
    {children}
  </View>
);

const commonStyles: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: Colors.lighter,
};

const styles = StyleSheet.create({
  normal: {
    ...commonStyles,
    alignItems: 'center',
  },
  stretched: {
    ...commonStyles,
    alignItems: 'stretch',
    paddingHorizontal: 24,
  },
});

export default CenterView;

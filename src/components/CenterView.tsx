import React from 'react';
import { StyleSheet, SafeAreaView, ViewStyle } from 'react-native';

import { Palette } from '../utils/theme';

interface IProps {
  usesFullWidth?: boolean;
  children: JSX.Element[] | JSX.Element;
}

const CenterView = ({ usesFullWidth, children }: IProps) => (
  <SafeAreaView style={usesFullWidth ? styles.stretched : styles.normal}>
    {children}
  </SafeAreaView>
);

const commonStyles: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  backgroundColor: Palette.gray.v300,
};

const styles = StyleSheet.create({
  normal: {
    ...commonStyles,
    alignItems: 'center',
  },
  stretched: {
    ...commonStyles,
    alignItems: 'stretch',
  },
});

export default CenterView;

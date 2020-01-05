import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import Touchable from '../Touchable';

import { Palette } from '../../utils/theme';

interface IProps {
  icon?: '+';
  disabled?: boolean;
  title: string;
  onPress: () => void;
}

const Button = ({ icon, disabled, title, onPress }: IProps) => (
  <Touchable onPress={onPress} disabled={disabled}>
    <View style={disabled ? styles.buttonDisabled : styles.button}>
      {Boolean(icon) && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
    </View>
  </Touchable>
);

const textStyle: TextStyle = {
  fontWeight: '600',
  color: Palette.white,
};

const buttonStyle: ViewStyle = {
  minWidth: 120,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  button: {
    ...buttonStyle,
    backgroundColor: Palette.gray.v800,
  },
  buttonDisabled: {
    ...buttonStyle,
    backgroundColor: Palette.gray.v500,
  },
  title: {
    ...textStyle,
  },
  icon: {
    ...textStyle,
    marginRight: 8,
  },
});

export default Button;

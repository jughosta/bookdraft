import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

import Touchable from '../Touchable';

import { Colors } from '../../utils/theme';

interface IProps {
  icon?: '+';
  title: string;
  onPress: () => void;
}

const Button = ({ icon, title, onPress }: IProps) => (
  <Touchable onPress={onPress}>
    <View style={styles.content}>
      {Boolean(icon) && <Text style={styles.icon}>{icon}</Text>}
      <Text style={styles.title}>{title}</Text>
    </View>
  </Touchable>
);

const textStyle: TextStyle = {
  fontWeight: '600',
  color: Colors.white,
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
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

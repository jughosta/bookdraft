import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Palette } from '../../utils/theme';

interface IProps {
  counter: number;
  backgroundColor: string;
}

const Badge = ({ counter, backgroundColor }: IProps) => {
  if (!counter) {
    return null;
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.counter}>{counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  counter: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.white,
  },
});

export default Badge;

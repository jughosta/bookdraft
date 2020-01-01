import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

import { Colors } from '../utils/theme';

type Props = {
  icon?: '+';
  title: string;
  onPress: () => void;
};

const Button = ({ icon, title, onPress }: Props) => {
  const Touchable =
    Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

  return (
    // @ts-ignore
    <Touchable onPress={onPress}>
      <View style={styles.content}>
        {Boolean(icon) && <Text style={styles.icon}>{icon}</Text>}
        <Text style={styles.title}>{title}</Text>
      </View>
    </Touchable>
  );
};

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

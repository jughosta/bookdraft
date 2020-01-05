import React from 'react';
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

interface IProps {
  disabled?: boolean;
  children: JSX.Element;
  onPress?: () => void;
}

const Touchable = ({ disabled, children, onPress }: IProps) => {
  if (disabled || !onPress) {
    return <View>{children}</View>;
  }

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback onPress={onPress}>
        {children}
      </TouchableNativeFeedback>
    );
  }

  return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
};

export default Touchable;

import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

interface IProps {
  children: JSX.Element;
  onPress: () => void;
}

const Touchable = ({ children, onPress }: IProps) => {
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

import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

type Props = {
  children: JSX.Element;
  onPress: () => void;
};

const Touchable = ({ children, onPress }: Props) => {
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

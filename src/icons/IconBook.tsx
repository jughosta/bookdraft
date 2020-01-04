import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface IProps {
  fillColor: string;
  size: number;
}

const IconBook = ({ fillColor, size }: IProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20">
    <Path
      fill={fillColor}
      d="M6 4H5a1 1 0 110-2h11V1a1 1 0 00-1-1H4a2 2 0 00-2 2v16c0 1.1.9 2 2 2h12a2 2 0 002-2V5a1 1 0 00-1-1h-7v8l-2-2-2 2V4z"
    />
  </Svg>
);

export default IconBook;

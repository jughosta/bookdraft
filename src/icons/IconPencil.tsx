import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface IProps {
  fillColor: string;
  size: number;
}

const IconPencil = ({ fillColor, size }: IProps) => (
  <Svg width={size} height={size} viewBox="0 0 20 20">
    <Path
      fill={fillColor}
      d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"
    />
  </Svg>
);

export default IconPencil;

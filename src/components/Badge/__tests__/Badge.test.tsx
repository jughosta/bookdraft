import React from 'react';
import { Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Badge from '../Badge';

import { Palette } from '../../../utils/theme';

describe('<Badge />', () => {
  it('renders correctly', () => {
    const instance = renderer.create(
      <Badge counter={1} backgroundColor={Palette.green.v400} />,
    );
    expect(instance.root.findByType(Text).props.children).toBe('1');
  });
});

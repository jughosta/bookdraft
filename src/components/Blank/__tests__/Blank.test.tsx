import React from 'react';
import { Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import Blank from '../Blank';

describe('<Blank />', () => {
  it('renders correctly', () => {
    const instance = renderer.create(<Blank message="Test" />);
    expect(instance.root.findByType(Text).props.children).toBe('Test');
  });
});

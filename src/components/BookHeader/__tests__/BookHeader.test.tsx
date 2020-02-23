import React from 'react';
import { Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import BookHeader from '../BookHeader';

describe('<BookHeader />', () => {
  it('renders correctly', () => {
    const instance = renderer.create(
      <BookHeader book={{ id: 1, title: 'Test book' }} onEdit={() => {}} />,
    );
    expect(instance.root.findAllByType(Text)[0].props.children).toBe(
      'Test book',
    );
  });
});

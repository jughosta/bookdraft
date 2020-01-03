import React from 'react';
import { Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import BookCard from '../BookCard';

describe('<BookCard />', () => {
  it('renders correctly', () => {
    const instance = renderer.create(
      <BookCard book={{ id: 1, title: 'Test book' }} onPress={() => {}} />,
    );
    expect(instance.root.findByType(Text).props.children).toBe('Test book');
  });
});

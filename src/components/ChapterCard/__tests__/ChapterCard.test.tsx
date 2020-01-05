import React from 'react';
import { Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ChapterCard from '../ChapterCard';

describe('<ChapterCard />', () => {
  it('renders correctly', () => {
    const instance = renderer.create(
      <ChapterCard
        chapter={{ id: 1, title: 'Test chapter', bookId: 1 }}
        onPress={() => {}}
      />,
    );
    expect(instance.root.findByType(Text).props.children).toBe('Test chapter');
  });
});

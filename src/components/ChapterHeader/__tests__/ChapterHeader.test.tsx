import React from 'react';
import { Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ChapterHeader from '../ChapterHeader';

describe('<ChapterHeader />', () => {
  it('renders correctly', () => {
    const instance = renderer.create(
      <ChapterHeader
        chapter={{ id: 1, title: 'Test chapter', bookId: 1 }}
        onEdit={() => {}}
      />,
    );
    expect(instance.root.findAllByType(Text)[0].props.children).toBe(
      'Test chapter',
    );
  });
});

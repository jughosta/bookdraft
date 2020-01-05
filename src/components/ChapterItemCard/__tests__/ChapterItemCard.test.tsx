import React from 'react';
import { Text } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ChapterItemCard from '../ChapterItemCard';

import { ChapterItemState } from '../../../types/chapterItem.type';

describe('<ChapterItemCard />', () => {
  it('renders correctly', () => {
    const instance = renderer.create(
      <ChapterItemCard
        chapterItem={{
          id: 1,
          content: 'Test content',
          chapterId: 1,
          state: ChapterItemState.done,
        }}
        onPress={() => {}}
      />,
    );
    expect(instance.root.findByType(Text).props.children).toBe('Test content');
  });
});

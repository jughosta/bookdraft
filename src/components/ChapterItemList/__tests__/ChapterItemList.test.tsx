import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ChapterItemCard from '../../ChapterItemCard/ChapterItemCard';
import ChapterItemList from '../ChapterItemList';

import { ChapterItemState } from '../../../types/chapterItem.type';

describe('<ChapterItemList />', () => {
  it('renders books correctly', () => {
    const instance = renderer.create(
      <ChapterItemList
        chapterItems={[
          {
            id: 1,
            content: 'First',
            chapterId: 1,
            state: ChapterItemState.done,
          },
          {
            id: 2,
            content: 'Second',
            chapterId: 1,
            state: ChapterItemState.done,
          },
        ]}
        onCreate={() => {}}
        onPress={() => {}}
      />,
    );
    const cards = instance.root.findAllByType(ChapterItemCard);
    expect(cards.length).toBe(2);
  });

  it('renders an empty list correctly', () => {
    const instance = renderer.create(
      <ChapterItemList
        chapterItems={[]}
        onCreate={() => {}}
        onPress={() => {}}
      />,
    );
    const cards = instance.root.findAllByType(ChapterItemCard);
    expect(cards.length).toBe(0);
  });
});

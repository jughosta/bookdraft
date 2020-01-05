import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import ChapterCard from '../../ChapterCard/ChapterCard';
import ChapterList from '../ChapterList';

describe('<BookList />', () => {
  it('renders books correctly', () => {
    const instance = renderer.create(
      <ChapterList
        chapters={[
          { id: 1, title: 'First', bookId: 1 },
          { id: 2, title: 'Second', bookId: 1 },
        ]}
        onCreate={() => {}}
        onPress={() => {}}
      />,
    );
    const cards = instance.root.findAllByType(ChapterCard);
    expect(cards.length).toBe(2);
  });

  it('renders an empty list correctly', () => {
    const instance = renderer.create(
      <ChapterList chapters={[]} onCreate={() => {}} onPress={() => {}} />,
    );
    const cards = instance.root.findAllByType(ChapterCard);
    expect(cards.length).toBe(0);
  });
});

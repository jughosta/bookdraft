import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import BookCard from '../../BookCard/BookCard';
import BookList from '../BookList';

describe('<BookList />', () => {
  it('renders books correctly', () => {
    const instance = renderer.create(
      <BookList
        books={[{ id: 1, title: 'First' }, { id: 2, title: 'Second' }]}
        onCreate={() => {}}
        onPress={() => {}}
      />,
    );
    const cards = instance.root.findAllByType(BookCard);
    expect(cards.length).toBe(2);
  });

  it('renders an empty list correctly', () => {
    const instance = renderer.create(
      <BookList books={[]} onCreate={() => {}} onPress={() => {}} />,
    );
    const cards = instance.root.findAllByType(BookCard);
    expect(cards.length).toBe(0);
  });
});

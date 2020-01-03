import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BookList from '../BookList/BookList';
import CenterView from '../../../storybook/components/CenterView';

import { StoryDecorator } from '../../../storybook/types';
import { Book } from '../../types/book.type';

const book1: Book = {
  id: 1,
  title: 'Demo book',
};

const book2: Book = {
  id: 2,
  title:
    'Demo book with very very very long title here. Demo book with very very very long title here. Demo book with very very very long title here.',
};

storiesOf('BookList', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('with books', () => (
    <BookList
      books={[book1, book2]}
      onCreate={action('create')}
      onPress={action('pressed')}
    />
  ))
  .add('empty', () => (
    <BookList
      books={[]}
      onCreate={action('create')}
      onPress={action('pressed')}
    />
  ));

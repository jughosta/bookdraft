import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BookCard from '../BookCard/BookCard';
import CenterView from '../../../storybook/components/CenterView';

import { StoryDecorator } from '../../../storybook/types';
import { Book } from '../../types/book.type';

const book1: Book = {
  id: 1,
  title: 'Demo book',
};

const book2: Book = {
  id: 1,
  title:
    'Demo book with very very very long title here. Demo book with very very very long title here. Demo book with very very very long title here.',
};

storiesOf('BookCard', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('default', () => <BookCard book={book1} onPress={action('pressed')} />)
  .add('long title', () => (
    <BookCard book={book2} onPress={action('pressed')} />
  ));

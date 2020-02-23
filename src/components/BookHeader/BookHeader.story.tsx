import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import BookHeader from './BookHeader';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';
import { IBook } from '../../types/book.type';

const book1: IBook = {
  id: 1,
  title: 'Demo book',
};

const book2: IBook = {
  id: 1,
  title:
    'Demo book with very very very long title here. Demo book with very very very long title here. Demo book with very very very long title here.',
};

storiesOf('BookHeader', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('default', () => <BookHeader book={book1} onEdit={action('pressed')} />)
  .add('long title', () => (
    <BookHeader book={book2} onEdit={action('pressed')} />
  ));

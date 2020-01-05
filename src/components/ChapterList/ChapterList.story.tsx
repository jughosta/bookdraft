import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ChapterList from '../ChapterList/ChapterList';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';
import { IChapter } from '../../types/chapter.type';

const chapter1: IChapter = {
  id: 1,
  title: 'Introduction',
  bookId: 1,
};

const chapter2: IChapter = {
  id: 2,
  title: '1. Get started',
  bookId: 1,
};

const chapter3: IChapter = {
  id: 3,
  title: '2. Get to know your characters',
  bookId: 1,
};

storiesOf('ChapterList', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('with chapters', () => (
    <ChapterList
      chapters={[chapter1, chapter2, chapter3]}
      onCreate={action('create')}
      onPress={action('pressed')}
    />
  ))
  .add('empty', () => (
    <ChapterList
      chapters={[]}
      onCreate={action('create')}
      onPress={action('pressed')}
    />
  ));

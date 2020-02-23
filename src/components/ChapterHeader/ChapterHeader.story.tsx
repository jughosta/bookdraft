import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ChapterHeader from './ChapterHeader';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';
import { IChapter } from '../../types/chapter.type';

const chapter1: IChapter = {
  id: 1,
  title: 'Demo chapter',
  bookId: 1,
};

const chapter2: IChapter = {
  id: 1,
  title:
    'Demo chapter with very very very long title here. Demo chapter with very very very long title here. Demo chapter with very very very long title here.',
  bookId: 1,
};

storiesOf('ChapterHeader', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('default', () => (
    <ChapterHeader chapter={chapter1} onEdit={action('pressed')} />
  ))
  .add('long title', () => (
    <ChapterHeader chapter={chapter2} onEdit={action('pressed')} />
  ));

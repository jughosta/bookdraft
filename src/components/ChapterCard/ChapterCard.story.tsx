import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ChapterCard from '../ChapterCard/ChapterCard';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';
import { IChapter } from '../../types/chapter.type';

const chapter: IChapter = {
  id: 1,
  title: 'Demo chapter',
  bookId: 1,
};

storiesOf('ChapterCard', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('default', () => (
    <ChapterCard chapter={chapter} onPress={action('pressed')} />
  ));

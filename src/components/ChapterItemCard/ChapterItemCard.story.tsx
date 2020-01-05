import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ChapterItemCard from '../ChapterItemCard/ChapterItemCard';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';
import { ChapterItemState } from '../../types/chapterItem.type';

storiesOf('ChapterItemCard', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('in progress', () => (
    <ChapterItemCard
      chapterItem={{
        id: 1,
        content: 'Work in progress',
        chapterId: 1,
        state: ChapterItemState.inProgress,
      }}
      onPress={action('pressed')}
    />
  ))
  .add('done', () => (
    <ChapterItemCard
      chapterItem={{
        id: 1,
        content: 'Finished this scene!',
        chapterId: 1,
        state: ChapterItemState.done,
      }}
      onPress={action('pressed')}
    />
  ))
  .add('idea', () => (
    <ChapterItemCard
      chapterItem={{
        id: 1,
        content: 'I have an idea!',
        chapterId: 1,
        state: ChapterItemState.idea,
      }}
      onPress={action('pressed')}
    />
  ));

import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import ChapterItemList from '../ChapterItemList/ChapterItemList';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';
import { ChapterItemState, IChapterItem } from '../../types/chapterItem.type';

const chapterItem1: IChapterItem = {
  id: 1,
  content: 'First scene',
  chapterId: 1,
  state: ChapterItemState.idea,
};

const chapterItem2: IChapterItem = {
  id: 2,
  content: 'Second scene',
  chapterId: 1,
  state: ChapterItemState.inProgress,
};

const chapterItem3: IChapterItem = {
  id: 3,
  content: 'Third scene',
  chapterId: 1,
  state: ChapterItemState.done,
};

storiesOf('ChapterItemList', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('with chapters', () => (
    <ChapterItemList
      chapterItems={[chapterItem1, chapterItem2, chapterItem3]}
      onCreate={action('create')}
      onPress={action('pressed')}
    />
  ))
  .add('empty', () => (
    <ChapterItemList
      chapterItems={[]}
      onCreate={action('create')}
      onPress={action('pressed')}
    />
  ));

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Badge from '../Badge/Badge';
import Touchable from '../Touchable';

import { Palette } from '../../utils/theme';

import { IChapter, IChapterWithCounters } from '../../types/chapter.type';
import { ChapterItemState } from '../../types/chapterItem.type';

interface IProps {
  chapter: IChapterWithCounters;
  onPress: (chapter: IChapter) => void;
}

const STATES = [
  ChapterItemState.idea,
  ChapterItemState.inProgress,
  ChapterItemState.done,
];

type PropNames = {
  [ChapterItemState.idea]: 'countIdea';
  [ChapterItemState.inProgress]: 'countInProgress';
  [ChapterItemState.done]: 'countDone';
};

const STATE_TO_COUNT_MAP: PropNames = {
  [ChapterItemState.idea]: 'countIdea',
  [ChapterItemState.inProgress]: 'countInProgress',
  [ChapterItemState.done]: 'countDone',
};

const STATE_TO_COLOR_MAP = {
  [ChapterItemState.idea]: Palette.blue.v400,
  [ChapterItemState.inProgress]: Palette.orange.v400,
  [ChapterItemState.done]: Palette.green.v400,
};

const ChapterCard = ({ chapter, onPress }: IProps) => (
  <Touchable onPress={() => onPress(chapter)}>
    <View style={styles.container}>
      <Text style={styles.title}>{chapter.title}</Text>
      <View style={styles.badges}>
        {STATES.map(state => (
          <Badge
            key={state}
            counter={chapter[STATE_TO_COUNT_MAP[state]]}
            backgroundColor={STATE_TO_COLOR_MAP[state]}
          />
        ))}
      </View>
    </View>
  </Touchable>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Palette.white,
  },
  title: {
    flexShrink: 1,
    color: Palette.gray.v800,
  },
  badges: {
    flexDirection: 'row',
  },
});

export default ChapterCard;

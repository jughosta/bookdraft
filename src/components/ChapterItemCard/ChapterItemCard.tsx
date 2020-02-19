import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Touchable from '../Touchable';

import { Palette } from '../../utils/theme';

import { ChapterItemState, IChapterItem } from '../../types/chapterItem.type';

interface IProps {
  chapterItem: IChapterItem;
  onPress: (chapterItem: IChapterItem) => void;
}

const ChapterItemCard = ({ chapterItem, onPress }: IProps) => (
  <Touchable onPress={() => onPress(chapterItem)}>
    <View style={[styles.container, styles[chapterItem.state]]}>
      <Text style={styles.content}>{chapterItem.content}</Text>
    </View>
  </Touchable>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Palette.white,
    borderLeftWidth: 6,
  },
  [ChapterItemState.idea]: {
    borderLeftColor: Palette.blue.v400,
  },
  [ChapterItemState.inProgress]: {
    borderLeftColor: Palette.orange.v400,
  },
  [ChapterItemState.done]: {
    borderLeftColor: Palette.green.v400,
  },
  content: {
    color: Palette.gray.v800,
  },
});

export default ChapterItemCard;

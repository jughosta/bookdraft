import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Touchable from '../Touchable';

import { Palette } from '../../utils/theme';

import { IChapter } from '../../types/chapter.type';

interface IProps {
  chapter: IChapter;
  onPress: (chapter: IChapter) => void;
}

const ChapterCard = React.memo<IProps>(({ chapter, onPress }) => (
  <Touchable onPress={() => onPress(chapter)}>
    <View style={styles.container}>
      <Text style={styles.title}>{chapter.title}</Text>
    </View>
  </Touchable>
));

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Palette.white,
  },
  title: {
    color: Palette.gray.v800,
  },
});

export default ChapterCard;

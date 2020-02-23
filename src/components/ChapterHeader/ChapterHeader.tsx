import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Button from '../Button/Button';

import { Palette } from '../../utils/theme';

import { INullableChapter } from '../../types/chapter.type';

interface IProps {
  chapter: INullableChapter;
  onEdit: () => void;
}

const ChapterHeader = ({ chapter, onEdit }: IProps) => {
  if (!chapter) {
    return null;
  }

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{chapter.title}</Text>
      <Button title="Edit details" onPress={onEdit} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    paddingHorizontal: 48,
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Palette.gray.v900,
  },
});

export default ChapterHeader;

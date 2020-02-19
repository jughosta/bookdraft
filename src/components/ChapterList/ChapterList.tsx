import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ChapterCard from '../ChapterCard/ChapterCard';
import Button from '../Button/Button';
import Blank from '../Blank/Blank';

import { Palette } from '../../utils/theme';

import { IChapter } from '../../types/chapter.type';

interface IProps {
  chapters: IChapter[];
  onCreate: () => void;
  onPress: (chapter: IChapter) => void;
}

interface IListItem {
  item: IChapter;
}

const ChapterList = React.memo<IProps>(({ chapters, onCreate, onPress }) => (
  <FlatList
    data={chapters}
    keyExtractor={(chapter: IChapter) => `chapter-${chapter.id}`}
    renderItem={({ item }: IListItem) => (
      <ChapterCard chapter={item} onPress={onPress} />
    )}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    ListFooterComponent={() => (
      <Button icon="+" title="Create chapter" onPress={onCreate} />
    )}
    ListFooterComponentStyle={styles.footer}
    ListEmptyComponent={() => (
      <View style={styles.empty}>
        <Blank message="No chapters here yet." />
      </View>
    )}
  />
));

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: Palette.gray.v300,
    borderBottomWidth: 1,
  },
  empty: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Palette.white,
  },
  footer: {
    paddingTop: 24,
    marginBottom: 48,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },
});

export default ChapterList;

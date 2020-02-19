import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ChapterItemCard from '../ChapterItemCard/ChapterItemCard';
import Button from '../Button/Button';
import Blank from '../Blank/Blank';

import { Palette } from '../../utils/theme';

import { IChapterItem } from '../../types/chapterItem.type';

interface IProps {
  chapterItems: IChapterItem[];
  onCreate: () => void;
  onPress: (chapter: IChapterItem) => void;
}

interface IListItem {
  item: IChapterItem;
}

const ChapterItemList = React.memo<IProps>(
  ({ chapterItems, onCreate, onPress }) => (
    <FlatList
      data={chapterItems}
      keyExtractor={(chapter: IChapterItem) => `chapter-${chapter.id}`}
      renderItem={({ item }: IListItem) => (
        <ChapterItemCard chapterItem={item} onPress={onPress} />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListFooterComponent={() => (
        <Button icon="+" title="Create scene" onPress={onCreate} />
      )}
      ListFooterComponentStyle={styles.footer}
      ListEmptyComponent={() => (
        <View style={styles.empty}>
          <Blank message="No scenes here yet. Create a first one. Keep it short, you can always add more scenes later." />
        </View>
      )}
    />
  ),
);

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

export default ChapterItemList;

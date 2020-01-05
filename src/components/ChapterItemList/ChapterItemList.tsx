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

class ChapterItemList extends React.Component<IProps> {
  getKeyExtractor = (chapter: IChapterItem) => `chapter-${chapter.id}`;

  renderItem = ({ item }: IListItem) => {
    const { onPress } = this.props;

    return <ChapterItemCard chapterItem={item} onPress={onPress} />;
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  renderFooter = () => {
    const { onCreate } = this.props;

    return <Button icon="+" title="Create scene" onPress={onCreate} />;
  };

  renderEmpty = () => (
    <View style={styles.empty}>
      <Blank message="No scenes here yet. Create a first one. Keep it short, you can always add more scenes later." />
    </View>
  );

  render() {
    const { chapterItems } = this.props;

    return (
      <FlatList
        data={chapterItems}
        keyExtractor={this.getKeyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={this.renderFooter}
        ListFooterComponentStyle={styles.footer}
        ListEmptyComponent={this.renderEmpty}
      />
    );
  }
}

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

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

class ChapterList extends React.Component<IProps> {
  getKeyExtractor = (chapter: IChapter) => `chapter-${chapter.id}`;

  renderItem = ({ item }: IListItem) => {
    const { onPress } = this.props;

    return <ChapterCard chapter={item} onPress={onPress} />;
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  renderFooter = () => {
    const { onCreate } = this.props;

    return <Button icon="+" title="Create chapter" onPress={onCreate} />;
  };

  renderEmpty = () => (
    <View style={styles.empty}>
      <Blank message="No chapters here yet." />
    </View>
  );

  render() {
    const { chapters } = this.props;

    return (
      <FlatList
        data={chapters}
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

export default ChapterList;

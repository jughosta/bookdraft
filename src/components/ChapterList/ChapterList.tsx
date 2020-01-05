import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import ChapterCard from '../ChapterCard/ChapterCard';
import Button from '../Button/Button';
import Blank from '../Blank/Blank';

import { IChapter } from '../../types/chapter.type';
import { Palette } from '../../utils/theme';

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

    return (
      <View style={styles.content}>
        <Button icon="+" title="Create chapter" onPress={onCreate} />
      </View>
    );
  };

  renderEmpty = () => (
    <View style={styles.content}>
      <Blank message="No chapters here yet." />
    </View>
  );

  render() {
    const { chapters } = this.props;

    return (
      <FlatList
        style={styles.container}
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
  container: {
    paddingTop: 16,
    backgroundColor: Palette.white,
  },
  separator: {
    borderColor: Palette.gray.v400,
    borderWidth: 2,
  },
  footer: {
    marginTop: 24,
    marginBottom: 48,
    alignItems: 'flex-start',
  },
  content: {
    paddingHorizontal: 24,
  },
});

export default ChapterList;

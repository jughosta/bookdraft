import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Touchable from '../Touchable';

import { Palette } from '../../utils/theme';

import { IChapterItem } from '../../types/chapterItem.type';

interface IProps {
  chapterItem: IChapterItem;
  onPress: (chapterItem: IChapterItem) => void;
}

class ChapterItemCard extends React.Component<IProps> {
  handlePress = () => {
    const { chapterItem, onPress } = this.props;

    onPress(chapterItem);
  };

  render() {
    const { chapterItem } = this.props;

    // TODO: render state

    return (
      <Touchable onPress={this.handlePress}>
        <View style={styles.container}>
          <Text style={styles.content}>{chapterItem.content}</Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: Palette.white,
  },
  content: {
    color: Palette.gray.v800,
  },
});

export default ChapterItemCard;

import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Touchable from '../Touchable';

import { Palette } from '../../utils/theme';

import { IChapter } from '../../types/chapter.type';

interface IProps {
  chapter: IChapter;
  onPress: (chapter: IChapter) => void;
}

class ChapterCard extends React.Component<IProps> {
  handlePress = () => {
    const { chapter, onPress } = this.props;

    onPress(chapter);
  };

  render() {
    const { chapter } = this.props;

    return (
      <Touchable onPress={this.handlePress}>
        <View style={styles.container}>
          <Text style={styles.title}>{chapter.title}</Text>
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
  title: {
    color: Palette.gray.v800,
  },
});

export default ChapterCard;

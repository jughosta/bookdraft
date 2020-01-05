import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import IconBook from './IconBook';
import IconPencil from './IconPencil';
import IconTrash from './IconTrash';
import CenterView from '../components/CenterView';

import { Palette } from '../utils/theme';

import { StoryDecorator } from '../../storybook/types';

const FILL_COLOR = Palette.gray.v900;
const SIZE = 24;

storiesOf('Icon', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add('all', () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <IconBook fillColor={FILL_COLOR} size={SIZE} />
      <IconPencil fillColor={FILL_COLOR} size={SIZE} />
      <IconTrash fillColor={FILL_COLOR} size={SIZE} />
    </View>
  ));

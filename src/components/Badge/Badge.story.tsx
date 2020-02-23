import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Badge from '../Badge/Badge';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';

import { Palette } from '../../utils/theme';

storiesOf('Badge', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add('blue', () => <Badge counter={10} backgroundColor={Palette.blue.v400} />)
  .add('green', () => (
    <Badge counter={10} backgroundColor={Palette.green.v400} />
  ))
  .add('orange', () => (
    <Badge counter={8} backgroundColor={Palette.orange.v400} />
  ));

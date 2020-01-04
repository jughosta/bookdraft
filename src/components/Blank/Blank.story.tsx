import React from 'react';
import { storiesOf } from '@storybook/react-native';

import Blank from '../Blank/Blank';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';

storiesOf('Blank', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView usesFullWidth>{getStory()}</CenterView>
  ))
  .add('with a message', () => (
    <Blank message="I am a message for a blank screen" />
  ));

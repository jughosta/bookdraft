import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Button from './Button';
import CenterView from '../../../storybook/components/CenterView';

import { StoryDecorator } from '../../../storybook/types';

storiesOf('Button', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add('default', () => <Button title="Button" onPress={action('pressed')} />)
  .add('with "+" icon', () => (
    <Button icon="+" title="Button" onPress={action('pressed')} />
  ));

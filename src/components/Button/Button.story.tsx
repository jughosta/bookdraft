import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Button from './Button';
import CenterView from '../CenterView';

import { StoryDecorator } from '../../../storybook/types';

storiesOf('Button', module)
  .addDecorator((getStory: StoryDecorator) => (
    <CenterView>{getStory()}</CenterView>
  ))
  .add('default', () => (
    <Button title="Demo button" onPress={action('pressed')} />
  ))
  .add('with icon', () => (
    <Button icon="+" title="Demo button" onPress={action('pressed')} />
  ))
  .add('short title', () => <Button title="Add" onPress={action('pressed')} />)
  .add('short title and icon', () => (
    <Button icon="+" title="Add" onPress={action('pressed')} />
  ))
  .add('disabled', () => (
    <Button title="Submitting..." disabled onPress={action('pressed')} />
  ));

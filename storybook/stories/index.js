import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import Button from '../../src/components/Button';
import CenterView from '../components/CenterView';
import Welcome from '../components/Welcome';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />);

storiesOf('Button', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <Button label="Button" onPress={action('clicked-text')} />
  ))
  .add('with "+" icon', () => (
    <Button icon="+" title="Button" onPress={action('clicked-text')} />
  ));

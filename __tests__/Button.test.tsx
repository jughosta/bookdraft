import { Text } from 'react-native';
import React from 'react';

import Button from '../src/components/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<Button />', () => {
  it('renders correctly', () => {
    const instance = renderer.create(
      <Button title="Test button" onPress={() => {}} />,
    );
    expect(instance.root.findByType(Text).props.children).toBe('Test button');
  });

  it('renders correctly with an icon', () => {
    const instance = renderer.create(
      <Button icon="+" title="Test button" onPress={() => {}} />,
    );
    const texts = instance.root.findAllByType(Text);
    expect(texts.length).toBe(2);
    expect(texts[0].props.children).toBe('+');
    expect(texts[1].props.children).toBe('Test button');
  });
});

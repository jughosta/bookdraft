import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import { name as appName } from './app.json';

// import stories
configure(() => {
  require('./storybook/stories');
}, module);

const StorybookUIRoot = getStorybookUI({ port: 7007, host: 'localhost' });

AppRegistry.registerComponent(appName, () => StorybookUIRoot);

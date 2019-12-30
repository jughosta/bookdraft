import React from 'react';
import { AppState } from 'react-native';

import { closeDatabase, openDatabase } from '../utils/db';

type AppStateValue = 'active' | 'background' | 'inactive';

class Storage extends React.Component {
  componentDidMount(): void {
    AppState.addEventListener('change', this.handleAppStateChanged);
    this.handleAppStateChanged('active');
  }

  componentWillUnmount(): void {
    AppState.removeEventListener('change', this.handleAppStateChanged);
  }

  handleAppStateChanged = (nextAppState: AppStateValue) => {
    if (nextAppState === 'active') {
      openDatabase();
    } else if (nextAppState.match(/inactive|background/)) {
      closeDatabase();
    }
  };

  render() {
    return null;
  }
}

export default Storage;

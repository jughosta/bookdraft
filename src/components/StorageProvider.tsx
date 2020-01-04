import React from 'react';
import { AppState } from 'react-native';

import { closeDatabase, openDatabase } from '../utils/db/dbProvider';

type AppStateValue = 'active' | 'background' | 'inactive';

interface IProps {
  children: JSX.Element;
}

interface IState {
  isReady: boolean;
}

class StorageProvider extends React.Component<IProps, IState> {
  state = {
    isReady: false,
  };

  componentDidMount(): void {
    AppState.addEventListener('change', this.handleAppStateChanged);
    this.handleAppStateChanged('active');
  }

  componentWillUnmount(): void {
    AppState.removeEventListener('change', this.handleAppStateChanged);
    this.handleAppStateChanged('inactive');
  }

  handleAppStateChanged = async (nextAppState: AppStateValue) => {
    if (nextAppState === 'active') {
      await openDatabase();

      if (!this.state.isReady) {
        this.setState({
          isReady: true,
        });
      }
    } else if (nextAppState.match(/inactive|background/)) {
      await closeDatabase();
    }
  };

  render() {
    const { children } = this.props;
    const { isReady } = this.state;

    if (!isReady) {
      return null;
    }

    return children;
  }
}

export default StorageProvider;

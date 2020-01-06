import React from 'react';
import { connect } from 'react-redux';

import { closeDatabase, openDatabase } from '../reducers/storageSlice';

import { RootState, ThunkDispatch } from '../types/redux.type';
import { ConnectingStatus } from '../utils/redux';
import { ActivityIndicator } from 'react-native';
import CenterView from './CenterView';

type AppStateValue = 'active' | 'inactive';

interface IProps {
  connectingStatus: ConnectingStatus;
  children: JSX.Element;
  dispatch: ThunkDispatch;
}

class StorageProvider extends React.Component<IProps> {
  componentDidMount(): void {
    this.handleAppStateChanged('active');
  }

  componentWillUnmount(): void {
    this.handleAppStateChanged('inactive');
  }

  handleAppStateChanged = (nextAppState: AppStateValue) => {
    const { dispatch } = this.props;

    if (nextAppState === 'active') {
      dispatch(openDatabase());
    } else {
      dispatch(closeDatabase());
    }
  };

  render() {
    const { connectingStatus, children } = this.props;

    if (connectingStatus === ConnectingStatus.initial) {
      return (
        <CenterView>
          <ActivityIndicator />
        </CenterView>
      );
    }

    return children;
  }
}

const mapStateToProps = ({ storage }: RootState) => ({
  connectingStatus: storage.connectingStatus,
});

export default connect(mapStateToProps)(StorageProvider);

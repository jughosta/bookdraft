import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import CenterView from '../components/CenterView';

import { closeDatabase, openDatabase } from '../reducers/storageSlice';

import { ConnectingStatus } from '../utils/redux';

import { RootState, ThunkDispatch } from '../types/redux.type';

interface IProps {
  connectingStatus: ConnectingStatus;
  children: JSX.Element;
  dispatch: ThunkDispatch;
}

const StorageProvider = ({ connectingStatus, children, dispatch }: IProps) => {
  useEffect(() => {
    dispatch(openDatabase());

    return () => {
      dispatch(closeDatabase());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (connectingStatus === ConnectingStatus.initial) {
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }

  return children;
};

const mapStateToProps = ({ storage }: RootState) => ({
  connectingStatus: storage.connectingStatus,
});

export default connect(mapStateToProps)(StorageProvider);

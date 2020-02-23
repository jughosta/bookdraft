import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import CenterView from '../components/CenterView';

import { closeDatabase, openDatabase } from '../reducers/storageSlice';

import { ConnectingStatus } from '../utils/redux';

import { RootState } from '../types/redux.type';

interface IProps {
  children: JSX.Element;
}

const StorageProvider = ({ children }: IProps) => {
  const dispatch = useDispatch();
  const connectingStatus = useSelector(
    (state: RootState) => state.storage.connectingStatus,
  );

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

export default StorageProvider;

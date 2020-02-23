import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SQLite, {
  DatabaseParams,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import { createDatabaseTables, DBTable } from '../utils/db/dbTables';
import { ConnectingStatus } from '../utils/redux';

import { StorageState, ThunkResult } from '../types/redux.type';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DB_PARAMS: DatabaseParams = {
  name: 'bookdraft.db',
  location: 'default',
};

type NullableSQLiteDatabase = SQLiteDatabase | null;

let dbProvider: NullableSQLiteDatabase = null;

const initialState: StorageState = {
  connectingStatus: ConnectingStatus.initial,
};

const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    connectingStatusChanged(state, action: PayloadAction<ConnectingStatus>) {
      state.connectingStatus = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

const { connectingStatusChanged } = storageSlice.actions;

export const openDatabase = (): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
) => {
  if (dbProvider) {
    console.log('Database is already open');
    return;
  }

  const connectingStatus = getState().storage.connectingStatus;

  if (connectingStatus !== ConnectingStatus.initial) {
    await dispatch(connectingStatusChanged(ConnectingStatus.connecting));
  }

  console.log('Opening database...');
  try {
    // try {
    //   await SQLite.deleteDatabase(DB_PARAMS);
    // } catch (e) {
    //   console.warn(e);
    // }
    dbProvider = await SQLite.openDatabase(DB_PARAMS);

    if (!dbProvider) {
      throw Error('Database is not available');
    }

    await dispatch(prepareDatabase());
    console.log('Database opened');
  } catch (error) {
    await dispatch(connectingStatusChanged(ConnectingStatus.failed));
    console.warn(error);
    console.log('Could not open the database');
    if (dbProvider) {
      dispatch(closeDatabase());
    }
  }
};

const prepareDatabase = (): ThunkResult<Promise<void>> => async dispatch => {
  if (!dbProvider) {
    console.log('Database is not open');
    return;
  }

  try {
    await dbProvider.executeSql('PRAGMA foreign_keys=ON');
    await dbProvider.executeSql(`SELECT 1 FROM ${DBTable.version} LIMIT 1`);
    console.log('Database has data and is ready');
    await dispatch(connectingStatusChanged(ConnectingStatus.connected));
  } catch (e) {
    console.log('Database is empty. Creating tables...');
    try {
      await dbProvider.transaction(createDatabaseTables);
      await dispatch(connectingStatusChanged(ConnectingStatus.connected));
      console.log('Database is ready');
    } catch (e2) {
      await dispatch(connectingStatusChanged(ConnectingStatus.failed));
      console.warn(e2);
      console.log('Failed to create tables');
    }
  }
};

export const closeDatabase = (): ThunkResult<
  Promise<void>
> => async dispatch => {
  if (!dbProvider) {
    console.log('Database is not open');
    return;
  }

  await dispatch(connectingStatusChanged(ConnectingStatus.disconnecting));

  console.log('Closing database...');
  try {
    await dbProvider.close();
    dbProvider = null;
    await dispatch(connectingStatusChanged(ConnectingStatus.disconnected));
    console.log('Database closed');
  } catch (error) {
    await dispatch(connectingStatusChanged(ConnectingStatus.failed));
    console.warn(error);
    console.log('Could not close the database');
  }
};

export const queryAll = async (
  table: string,
  selectStatement?: string,
  whereStatement?: string,
  params?: any[],
): Promise<any[] | undefined> => {
  try {
    if (!dbProvider) {
      throw Error('DB Provider is not ready!');
    }

    const [resultSets] = await dbProvider.executeSql(
      `SELECT ${table}.* ${
        selectStatement ? `,${selectStatement}` : ''
      } FROM ${table}${whereStatement ? ` WHERE ${whereStatement}` : ''} `,
      params,
    );
    return resultSets.rows.raw();
  } catch (error) {
    console.warn(error);
  }
};

// helpers

export const insert = async (
  table: string,
  data: { [k: string]: any },
): Promise<number | undefined> => {
  const columns = Object.keys(data);

  try {
    if (!dbProvider) {
      throw Error('DB Provider is not ready!');
    }

    const params = columns.reduce(
      (arr, next) => {
        arr.push(data[next]);
        return arr;
      },
      <any[]>[],
    );

    const [resultSets] = await dbProvider.executeSql(
      `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${columns
        .map(() => '?')
        .join(', ')})`,
      params,
    );
    return resultSets.insertId;
  } catch (error) {
    console.warn(error);
  }
};

export const update = async (
  table: string,
  id: number,
  data: { [k: string]: any },
): Promise<number | undefined> => {
  const columns = Object.keys(data);

  try {
    if (!dbProvider) {
      throw Error('DB Provider is not ready!');
    }

    const params = columns.reduce(
      (arr, next) => {
        arr.push(data[next]);
        return arr;
      },
      <any[]>[],
    );

    params.push(id);

    const [resultSets] = await dbProvider.executeSql(
      `UPDATE ${table} SET ${columns
        .map(column => `${column} = ?`)
        .join(', ')} WHERE id = ?`,
      params,
    );
    return resultSets.rowsAffected;
  } catch (error) {
    console.warn(error);
  }
};

export const destroy = async (
  table: string,
  id: number,
): Promise<number | undefined> => {
  try {
    if (!dbProvider) {
      throw Error('DB Provider is not ready!');
    }

    const [resultSets] = await dbProvider.executeSql(
      `DELETE FROM ${table} WHERE id = ?`,
      [id],
    );
    return resultSets.rowsAffected;
  } catch (error) {
    console.warn(error);
  }
};

export default storageSlice.reducer;

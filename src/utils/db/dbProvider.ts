import SQLite, {
  DatabaseParams,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import { onDatabaseOpened } from './dbTables';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DB_PARAMS: DatabaseParams = {
  name: 'bookdraft.db',
  location: 'default',
};

type NullableSQLiteDatabase = SQLiteDatabase | null;

let dbProvider: NullableSQLiteDatabase = null;

export const openDatabase = async () => {
  if (dbProvider) {
    console.log('Database is already open');
    return;
  }

  console.log('Opening database...');
  try {
    // await SQLite.deleteDatabase(DB_PARAMS);
    dbProvider = await SQLite.openDatabase(DB_PARAMS);

    if (!dbProvider) {
      throw Error('Database is not available');
    }
    await dbProvider.executeSql('PRAGMA foreign_keys=ON');
    await onDatabaseOpened(dbProvider);
    console.log('Database opened');
  } catch (error) {
    console.warn(error);
    console.log('Could not open the database');
    if (dbProvider) {
      closeDatabase();
    }
  }
};

export const closeDatabase = async () => {
  if (!dbProvider) {
    console.log('Database is not open');
    return;
  }

  console.log('Closing database...');
  try {
    await dbProvider.close();
    dbProvider = null;
    console.log('Database closed');
  } catch (error) {
    console.warn(error);
    console.log('Could not close the database');
  }
};

export const queryAll = async (
  table: string,
  whereStatement?: string,
  params?: any[],
): Promise<any[] | undefined> => {
  try {
    if (!dbProvider) {
      throw Error('DB Provider is not ready!');
    }

    const [resultSets] = await dbProvider.executeSql(
      `SELECT * FROM ${table}${
        whereStatement ? ` WHERE ${whereStatement}` : ''
      } `,
      params,
    );
    return resultSets.rows.raw();
  } catch (error) {
    console.warn(error);
  }
};

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

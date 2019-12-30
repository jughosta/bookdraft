import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DB_NAME = 'bookdraft.db';
const DB_LOCATION = 'default';

type NullableSQLiteDatabase = SQLiteDatabase | null;

let DB: NullableSQLiteDatabase = null;

export const openDatabase = async () => {
  if (DB) {
    console.log('Database is already open');
    return;
  }

  console.log('Opening database...');
  try {
    DB = await SQLite.openDatabase({
      name: DB_NAME,
      location: DB_LOCATION,
    });
    console.log('Database opened');
  } catch (error) {
    console.warn(error);
    console.log('Could not open the database');
  }
};

export const closeDatabase = async () => {
  if (!DB) {
    console.log('Database is not open');
    return;
  }

  console.log('Closing database...');
  try {
    await DB.close();
    DB = null;
    console.log('Database closed');
  } catch (error) {
    console.warn(error);
    console.log('Could not close the database');
  }
};

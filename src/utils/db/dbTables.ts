import { SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';

type Spec = {
  [k: string]: string;
};

type TableSpec = {
  columns: Spec;
  foreignKeys?: Spec;
};

export enum DBTable {
  version = 'version',
  book = 'book',
  chapter = 'chapter',
  chapterItem = 'chapter_item',
}

const TableSpecs: { [k: string]: TableSpec } = {
  [DBTable.version]: {
    columns: {
      id: 'INTEGER PRIMARY KEY',
      comment: 'TEXT',
    },
  },
  [DBTable.book]: {
    columns: {
      id: 'INTEGER PRIMARY KEY',
      title: 'TEXT NOT NULL',
    },
  },
  [DBTable.chapter]: {
    columns: {
      id: 'INTEGER PRIMARY KEY',
      book_id: 'INTEGER NOT NULL',
      title: 'TEXT NOT NULL',
    },
    foreignKeys: {
      book_id: `${DBTable.book} (id) ON DELETE CASCADE`,
    },
  },
  [DBTable.chapterItem]: {
    columns: {
      id: 'INTEGER PRIMARY KEY',
      chapter_id: 'INTEGER NOT NULL',
      content: 'TEXT NOT NULL',
      state: 'TEXT NOT NULL',
    },
    foreignKeys: {
      chapter_id: `${DBTable.chapter} (id) ON DELETE CASCADE`,
    },
  },
};

const tableIndexes: Spec = {
  chapter_on_book_id: `${DBTable.chapter} (book_id)`,
  chapter_item_on_chapter_id: `${DBTable.chapterItem} (chapter_id)`,
  chapter_item_on_state: `${DBTable.chapterItem} (state)`,
};

const getCreateTableSQL = (
  name: string,
  columns: Spec,
  foreignKeys: Spec | null = null,
) => {
  const columnStrings: String[] = [];
  const constrainStrings: String[] = [];

  Object.keys(columns).forEach(key => {
    columnStrings.push(`${key} ${columns[key]}`);
  });

  if (foreignKeys) {
    Object.keys(foreignKeys).forEach(key => {
      constrainStrings.push(
        `FOREIGN KEY (${key}) REFERENCES ${foreignKeys[key]}`,
      );
    });
  }

  const columnsSQL = columnStrings.join(', ');
  const constrainsSQL = constrainStrings.join(', ');

  const query = `CREATE TABLE ${name} (${columnsSQL}${
    constrainsSQL.length > 0 ? `, ${constrainsSQL}` : ''
  })`;

  console.log(query);

  return query;
};

const createDatabaseTables = (tx: Transaction) => {
  tx.executeSql(
    getCreateTableSQL(DBTable.version, TableSpecs[DBTable.version].columns),
  );
  tx.executeSql(
    getCreateTableSQL(DBTable.book, TableSpecs[DBTable.book].columns),
  );
  tx.executeSql(
    getCreateTableSQL(
      DBTable.chapter,
      TableSpecs[DBTable.chapter].columns,
      TableSpecs[DBTable.chapter].foreignKeys,
    ),
  );
  tx.executeSql(
    getCreateTableSQL(
      DBTable.chapterItem,
      TableSpecs[DBTable.chapterItem].columns,
      TableSpecs[DBTable.chapterItem].foreignKeys,
    ),
  );

  Object.keys(tableIndexes).map(key =>
    tx.executeSql(`CREATE INDEX ${key} ON ${tableIndexes[key]}`),
  );

  tx.executeSql(
    `INSERT INTO ${DBTable.version} (comment) VALUES ("Initial version");`,
  );
  tx.executeSql(`INSERT INTO ${DBTable.book} (title) VALUES ("Demo book");`);
};

export const onDatabaseOpened = async (dbProvider: SQLiteDatabase) => {
  try {
    await dbProvider.executeSql(`SELECT 1 FROM ${DBTable.version} LIMIT 1`);
    console.log('Database has data and is ready');
  } catch (e) {
    console.log('Database is empty. Creating tables...');
    await dbProvider.transaction(createDatabaseTables);
    console.log('Database is ready');
  }
};

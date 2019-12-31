import { SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';

type Spec = {
  [k: string]: string;
};

type TableSpec = {
  columns: Spec;
  foreignKeys?: Spec;
};

export const Tables: Spec = {
  version: 'version',
  book: 'book',
  chapter: 'chapter',
  chapterItem: 'chapter_item',
};

const TableSpecs: { [k: string]: TableSpec } = {
  [Tables.version]: {
    columns: {
      id: 'INTEGER PRIMARY KEY',
      comment: 'TEXT',
    },
  },
  [Tables.book]: {
    columns: {
      id: 'INTEGER PRIMARY KEY',
      title: 'TEXT NOT NULL',
      description: 'TEXT NOT NULL',
    },
  },
  [Tables.chapter]: {
    columns: {
      id: 'INTEGER PRIMARY KEY',
      book_id: 'INTEGER NOT NULL',
      title: 'TEXT NOT NULL',
    },
    foreignKeys: {
      book_id: `${Tables.book} (id) ON DELETE CASCADE`,
    },
  },
  [Tables.chapterItem]: {
    columns: {
      id: 'INTEGER PRIMARY KEY',
      chapter_id: 'INTEGER NOT NULL',
      content: 'TEXT NOT NULL',
      color: 'TEXT',
      type: 'TEXT',
    },
    foreignKeys: {
      chapter_id: `${Tables.chapter} (id) ON DELETE CASCADE`,
    },
  },
};

const tableIndexes: Spec = {
  chapter_on_book_id: `${Tables.chapter} (book_id)`,
  chapter_item_on_chapter_id: `${Tables.chapterItem} (chapter_id)`,
  chapter_item_on_color: `${Tables.chapterItem} (color)`,
  chapter_item_on_type: `${Tables.chapterItem} (type)`,
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
    getCreateTableSQL(Tables.version, TableSpecs[Tables.version].columns),
  );
  tx.executeSql(
    getCreateTableSQL(Tables.book, TableSpecs[Tables.book].columns),
  );
  tx.executeSql(
    getCreateTableSQL(
      Tables.chapter,
      TableSpecs[Tables.chapter].columns,
      TableSpecs[Tables.chapter].foreignKeys,
    ),
  );
  tx.executeSql(
    getCreateTableSQL(
      Tables.chapterItem,
      TableSpecs[Tables.chapterItem].columns,
      TableSpecs[Tables.chapterItem].foreignKeys,
    ),
  );

  Object.keys(tableIndexes).map(key =>
    tx.executeSql(`CREATE INDEX ${key} ON ${tableIndexes[key]}`),
  );

  tx.executeSql(
    `INSERT INTO ${Tables.version} (comment) VALUES ("Initial version");`,
  );
  tx.executeSql(
    `INSERT INTO ${
      Tables.book
    } (title, description) VALUES ("Demo book", "This book can show what is possible here");`,
  );
};

export const onDatabaseOpened = async (dbProvider: SQLiteDatabase) => {
  try {
    await dbProvider.executeSql(`SELECT 1 FROM ${Tables.version} LIMIT 1`);
    console.log('Database has data and is ready');
  } catch (e) {
    console.log('Database is empty. Creating tables...');
    await dbProvider.transaction(createDatabaseTables);
    console.log('Database is ready');
  }
};

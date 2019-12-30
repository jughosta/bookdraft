import { SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';

const tableNameVersion = 'version';
const tableColumnsVersion = {
  id: 'INTEGER PRIMARY KEY',
  comment: 'TEXT',
};

const tableNameBook = 'book';
const tableColumnsBook = {
  id: 'INTEGER PRIMARY KEY',
  title: 'TEXT NOT NULL',
  description: 'TEXT NOT NULL',
};

const tableNameChapter = 'chapter';
const tableColumnsChapter = {
  id: 'INTEGER PRIMARY KEY',
  book_id: 'INTEGER NOT NULL',
  title: 'TEXT NOT NULL',
};
const tableForeignKeysChapter = {
  book_id: `${tableNameBook} (id) ON DELETE CASCADE`,
};

const tableNameChapterItem = 'chapter_item';
const tableColumnsChapterItem = {
  id: 'INTEGER PRIMARY KEY',
  chapter_id: 'INTEGER NOT NULL',
  content: 'TEXT NOT NULL',
  color: 'TEXT',
  type: 'TEXT',
};
const tableForeignKeysChapterItem = {
  chapter_id: `${tableNameChapter} (id) ON DELETE CASCADE`,
};

const tableIndexes: { [k: string]: string } = {
  chapter_on_book_id: `${tableNameChapter} (book_id)`,
  chapter_item_on_chapter_id: `${tableNameChapterItem} (chapter_id)`,
  chapter_item_on_color: `${tableNameChapterItem} (color)`,
  chapter_item_on_type: `${tableNameChapterItem} (type)`,
};

const getCreateTableSQL = (
  name: string,
  columns: { [k: string]: string },
  foreignKeys: { [k: string]: string } | null = null,
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
  tx.executeSql(getCreateTableSQL(tableNameVersion, tableColumnsVersion));
  tx.executeSql(getCreateTableSQL(tableNameBook, tableColumnsBook));
  tx.executeSql(
    getCreateTableSQL(
      tableNameChapter,
      tableColumnsChapter,
      tableForeignKeysChapter,
    ),
  );
  tx.executeSql(
    getCreateTableSQL(
      tableNameChapterItem,
      tableColumnsChapterItem,
      tableForeignKeysChapterItem,
    ),
  );

  Object.keys(tableIndexes).map(key =>
    tx.executeSql(`CREATE INDEX ${key} ON ${tableIndexes[key]}`),
  );

  tx.executeSql(
    `INSERT INTO ${tableNameVersion} (comment) VALUES ("Initial version");`,
  );
  tx.executeSql(
    `INSERT INTO ${tableNameBook} (title, description) VALUES ("Demo book", "This book can show what is possible here");`,
  );
};

export const onDatabaseOpened = async (dbProvider: SQLiteDatabase) => {
  try {
    await dbProvider.executeSql(`SELECT 1 FROM ${tableNameVersion} LIMIT 1`);
    console.log('Database has data and is ready');
  } catch (e) {
    console.log('Database is empty. Creating tables...');
    await dbProvider.transaction(createDatabaseTables);
    console.log('Database is ready');
  }
};

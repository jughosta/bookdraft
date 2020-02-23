import { destroy, insert, queryAll, update } from '../reducers/storageSlice';
import { DBTable } from './db/dbTables';

import { IBook, IBookData } from '../types/book.type';
import { IEntityData } from '../types/entity.type';
import {
  IChapter,
  IChapterData,
  IChapterWithCounters,
} from '../types/chapter.type';
import {
  ChapterItemState,
  IChapterItem,
  IChapterItemData,
} from '../types/chapterItem.type';

export const getEntities = async <T>(
  table: DBTable,
  selectStatement?: string,
  whereStatement?: string,
  params?: any[],
): Promise<T[]> => {
  const entities = await queryAll(
    table,
    selectStatement,
    whereStatement,
    params,
  );

  if (!entities) {
    throw Error('No entities found');
  }

  return entities;
};

export const getEntity = async <T>(table: DBTable, id: number): Promise<T> => {
  const entities = await queryAll(table, undefined, 'id = ? LIMIT 1', [id]);

  if (!entities || entities.length !== 1) {
    throw Error('This entity does not exist');
  }

  return entities[0];
};

export const insertEntity = async <T>(
  table: DBTable,
  data: IEntityData,
): Promise<T> => {
  const id = await insert(table, data);

  if (!id) {
    throw Error('Error while creating a book');
  }

  return await getEntity<T>(table, id);
};

export const updateEntity = async <T>(
  table: DBTable,
  id: number,
  data: IEntityData,
): Promise<T> => {
  const rowsAffected = await update(table, id, data);

  if (!rowsAffected || rowsAffected !== 1) {
    throw Error('Error while updating the entity');
  }

  return await getEntity<T>(table, id);
};

export const destroyEntity = async <T>(
  table: DBTable,
  id: number,
): Promise<void> => {
  const rowsAffected = await destroy(table, id);

  if (!rowsAffected || rowsAffected !== 1) {
    throw Error('Error while deleting the entity');
  }
};

export const getBooks = (): Promise<IBook[]> =>
  getEntities<IBook>(DBTable.book);

export const getBook = (id: number): Promise<IBook> =>
  getEntity<IBook>(DBTable.book, id);

export const insertBook = (data: IBookData): Promise<IBook> =>
  insertEntity<IBook>(DBTable.book, data);

export const updateBook = (id: number, data: IBookData): Promise<IBook> =>
  updateEntity<IBook>(DBTable.book, id, data);

export const destroyBook = (id: number): Promise<void> =>
  destroyEntity<IBook>(DBTable.book, id);

export const getChapters = (bookId: number): Promise<IChapter[]> =>
  getEntities<IChapter>(DBTable.chapter, undefined, 'bookId = ?', [bookId]);

export const getChaptersWithCounters = (
  bookId: number,
): Promise<IChapterWithCounters[]> =>
  getEntities<IChapterWithCounters>(
    DBTable.chapter,
    `(SELECT COUNT(CI.id) FROM ${DBTable.chapterItem} CI WHERE CI.chapterId = ${
      DBTable.chapter
    }.id and CI.state = ?) AS countDone, (SELECT COUNT(CI.id) FROM ${
      DBTable.chapterItem
    } CI WHERE CI.chapterId = ${
      DBTable.chapter
    }.id and CI.state = ?) AS countInProgress, (SELECT COUNT(CI.id) FROM ${
      DBTable.chapterItem
    } CI WHERE CI.chapterId = ${
      DBTable.chapter
    }.id and CI.state = ?) AS countIdea`,
    'bookId = ?',
    [
      ChapterItemState.done,
      ChapterItemState.inProgress,
      ChapterItemState.idea,
      bookId,
    ],
  );

export const getChapter = (id: number): Promise<IChapter> =>
  getEntity<IChapter>(DBTable.chapter, id);

export const insertChapter = (data: IChapterData): Promise<IChapter> =>
  insertEntity<IChapter>(DBTable.chapter, data);

export const updateChapter = (
  id: number,
  data: IChapterData,
): Promise<IChapter> => updateEntity<IChapter>(DBTable.chapter, id, data);

export const destroyChapter = (id: number): Promise<void> =>
  destroyEntity<IChapter>(DBTable.chapter, id);

export const getChapterItems = (chapterId: number): Promise<IChapterItem[]> =>
  getEntities<IChapterItem>(DBTable.chapterItem, undefined, 'chapterId = ?', [
    chapterId,
  ]);

export const getChapterItem = (id: number): Promise<IChapterItem> =>
  getEntity<IChapterItem>(DBTable.chapterItem, id);

export const insertChapterItem = (
  data: IChapterItemData,
): Promise<IChapterItem> =>
  insertEntity<IChapterItem>(DBTable.chapterItem, data);

export const updateChapterItem = (
  id: number,
  data: IChapterItemData,
): Promise<IChapterItem> =>
  updateEntity<IChapterItem>(DBTable.chapterItem, id, data);

export const destroyChapterItem = (id: number): Promise<void> =>
  destroyEntity<IChapterItem>(DBTable.chapterItem, id);

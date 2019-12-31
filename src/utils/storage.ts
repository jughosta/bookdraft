import { queryAll, insert } from './db/dbProvider';
import { Tables } from './db/dbTables';

import { Book, BookData } from '../types/book.type';

export const getBooks = async (): Promise<Book[]> => {
  return queryAll(Tables.book);
};

export const getBook = async (bookId: number): Promise<Book | undefined> => {
  const books = await queryAll(Tables.book, 'id = ?', [bookId]);

  if (books.length === 1) {
    return books[0];
  }
};

export const saveBook = async (bookData: BookData) => {
  const bookId = await insert(Tables.book, bookData);
  return await getBook(bookId);
};

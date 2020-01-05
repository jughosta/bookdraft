import { queryAll, insert, update } from './db/dbProvider';
import { Tables } from './db/dbTables';

import { Book, BookData } from '../types/book.type';

export const getBooks = async (): Promise<Book[]> => {
  const books = await queryAll(Tables.book);

  if (!books) {
    throw Error('No books found');
  }

  return books;
};

export const getBook = async (bookId: number): Promise<Book> => {
  const books = await queryAll(Tables.book, 'id = ?', [bookId]);

  if (!books || books.length !== 1) {
    throw Error('This book does not exist');
  }

  return books[0];
};

export const insertBook = async (bookData: BookData): Promise<Book> => {
  const bookId = await insert(Tables.book, bookData);

  if (!bookId) {
    throw Error('Error while creating a book');
  }

  return await getBook(bookId);
};

export const updateBook = async (
  bookId: number,
  bookData: BookData,
): Promise<Book> => {
  const rowsAffected = await update(Tables.book, bookId, bookData);

  if (!rowsAffected || rowsAffected !== 1) {
    throw Error('Error while updating the book');
  }

  return await getBook(bookId);
};

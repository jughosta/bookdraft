import { queryAll } from './db/dbProvider';
import { Tables } from './db/dbTables';

import { Book } from '../types/book.type';

export const getBooksIds = async (): Promise<number[]> => {
  // try {
  //   const serializedBooksIds = await AsyncStorage.getItem(getBooksIdsKey());
  //
  //   if (!serializedBooksIds) {
  //     return [];
  //   }
  //
  //   return JSON.parse(serializedBooksIds);
  // } catch (error) {
  //   console.warn(error);
  // }

  return [];
};

export const getBooks = async (): Promise<Book[]> => {
  return queryAll(Tables.book);
};

export const getBook = async (bookId: number): Promise<Book | null> => {
  // try {
  //   const serializedBook = await AsyncStorage.getItem(getBookKey(bookId));
  //
  //   if (!serializedBook) {
  //     return null;
  //   }
  //
  //   return JSON.parse(serializedBook);
  // } catch (error) {
  //   console.warn(error);
  // }

  return null;
};

export const saveBook = async (book: Book) => {
  // await AsyncStorage.setItem(getBookKey(book.id), JSON.stringify(book));
  // const booksIds = await getBooksIds();
  // await AsyncStorage.setItem(
  //   getBooksIdsKey(),
  //   JSON.stringify([...booksIds, book.id]),
  // );
};

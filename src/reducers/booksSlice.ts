import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { saveBook, getBooks } from '../utils/storage';
import { FetchStates } from '../utils/redux';

import { Book, BookData } from '../types/book.type';
import { ThunkResult, BooksState } from '../types/redux.type';

let nextBookId = 0;

const initialState: BooksState = {
  list: [],
  fetchState: FetchStates.initial,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksFetchStateChanged(state, action: PayloadAction<FetchStates>) {
      state.fetchState = action.payload;
    },
    booksLoaded(state, action: PayloadAction<Book[]>) {
      state.list = action.payload;
    },
    bookAdded(state, action: PayloadAction<Book>) {
      state.list.push(action.payload);
    },
  },
});

const { bookAdded, booksLoaded, booksFetchStateChanged } = booksSlice.actions;

export const fetchBooks = (): ThunkResult<Promise<void>> => async dispatch => {
  try {
    await dispatch(booksFetchStateChanged(FetchStates.loading));
    const books = await getBooks();
    if (books.length > 0) {
      nextBookId = Math.max(...books.map(b => b.id)) + 1;
    }
    await dispatch(booksLoaded(books));
    await dispatch(booksFetchStateChanged(FetchStates.loaded));
  } catch (error) {
    console.warn(error);
    await dispatch(booksFetchStateChanged(FetchStates.failed));
  }
};

export const addBook = (
  bookData: BookData,
): ThunkResult<Promise<void>> => async dispatch => {
  const id = nextBookId++;
  const book: Book = { ...bookData, id };

  await saveBook(book);
  await dispatch(bookAdded(book));
};

export default booksSlice.reducer;

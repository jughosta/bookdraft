import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { saveBook, getBooks } from '../utils/storage';
import { FetchStates } from '../utils/redux';

import { Book, BookData } from '../types/book.type';
import { ThunkResult, BooksState } from '../types/redux.type';

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
  const book = await saveBook(bookData);
  if (book) {
    await dispatch(bookAdded(book));
  }
};

export default booksSlice.reducer;

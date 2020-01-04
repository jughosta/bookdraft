import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBooks, saveBook } from '../utils/storage';
import { LoadingStatus } from '../utils/redux';

import { Book, BookData } from '../types/book.type';
import { BooksState, ThunkResult } from '../types/redux.type';

const initialState: BooksState = {
  list: [],
  loadingStatus: LoadingStatus.initial,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksLoadingStatusChanged(state, action: PayloadAction<LoadingStatus>) {
      state.loadingStatus = action.payload;
    },
    booksLoaded(state, action: PayloadAction<Book[]>) {
      state.list = action.payload;
    },
    bookAdded(state, action: PayloadAction<Book>) {
      state.list.push(action.payload);
    },
  },
});

const {
  bookAdded,
  booksLoaded,
  booksLoadingStatusChanged,
} = booksSlice.actions;

export const fetchBooks = (): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
) => {
  try {
    const loadingStatus = getState().books.loadingStatus;
    if (loadingStatus !== LoadingStatus.initial) {
      await dispatch(booksLoadingStatusChanged(LoadingStatus.loading));
    }
    const books = await getBooks();
    await dispatch(booksLoaded(books));
    await dispatch(booksLoadingStatusChanged(LoadingStatus.loaded));
  } catch (error) {
    console.warn(error);
    await dispatch(booksLoadingStatusChanged(LoadingStatus.failed));
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

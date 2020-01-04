import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBooks, saveBook } from '../utils/storage';
import { LoadingStatus, UpdatingStatus } from '../utils/redux';

import { Book, BookData } from '../types/book.type';
import { BooksState, ThunkResult } from '../types/redux.type';

const initialState: BooksState = {
  list: [],
  loadingStatus: LoadingStatus.initial,
  updatingStatus: UpdatingStatus.initial,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    booksLoadingStatusChanged(state, action: PayloadAction<LoadingStatus>) {
      state.loadingStatus = action.payload;
    },
    booksUpdatingStatusChanged(state, action: PayloadAction<UpdatingStatus>) {
      state.updatingStatus = action.payload;
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
  booksUpdatingStatusChanged,
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
    await dispatch(booksLoaded([]));
    await dispatch(booksLoadingStatusChanged(LoadingStatus.failed));
  } finally {
    await dispatch(booksUpdatingStatusChanged(UpdatingStatus.initial));
  }
};

export const addBook = (
  bookData: BookData,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    await dispatch(booksUpdatingStatusChanged(UpdatingStatus.processing));
    const book = await saveBook(bookData);
    await dispatch(bookAdded(book));
    await dispatch(booksUpdatingStatusChanged(UpdatingStatus.succeeded));
  } catch (error) {
    console.warn(error);
    await dispatch(booksUpdatingStatusChanged(UpdatingStatus.failed));
  }
};

export const resetBookUpdatingStatus = (): ThunkResult<
  Promise<void>
> => async dispatch => {
  await dispatch(booksUpdatingStatusChanged(UpdatingStatus.initial));
};

export default booksSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { bookCreated, bookDeleted, bookEdited } from './booksSlice';

import {
  destroyBook,
  getBook,
  insertBook,
  updateBook,
} from '../utils/repository';
import { LoadingStatus } from '../utils/redux';

import { IBookData, INullableBook } from '../types/book.type';
import { BookState, ThunkDispatch, ThunkResult } from '../types/redux.type';

const initialState: BookState = {
  book: null,
  loadingStatus: LoadingStatus.initial,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    loadingStatusChanged(state, action: PayloadAction<LoadingStatus>) {
      state.loadingStatus = action.payload;
    },
    loaded(state, action: PayloadAction<INullableBook>) {
      state.book = action.payload || null;
    },
    reset() {
      return initialState;
    },
  },
});

const { loaded, loadingStatusChanged, reset } = bookSlice.actions;

export const fetchBook = (bookId: number): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
) => {
  try {
    const loadingStatus = getState().book.loadingStatus;
    if (loadingStatus !== LoadingStatus.initial) {
      await dispatch(loadingStatusChanged(LoadingStatus.loading));
    }
    const book = await getBook(bookId);
    await dispatch(loaded(book));
    await dispatch(loadingStatusChanged(LoadingStatus.loaded));
  } catch (error) {
    console.warn(error);
    await dispatch(loaded(null));
    await dispatch(loadingStatusChanged(LoadingStatus.failed));
  }
};

export const createBook = (
  bookData: IBookData,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    const book = await insertBook(bookData);
    await dispatch(bookCreated(book));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const editBook = (
  bookId: number,
  bookData: IBookData,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    const book = await updateBook(bookId, bookData);
    await dispatch(loaded(book));
    await dispatch(bookEdited(book));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const deleteBook = (
  bookId: number,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    await destroyBook(bookId);
    await dispatch(reset());
    await dispatch(bookDeleted(bookId));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const resetBook = () => (dispatch: ThunkDispatch) => dispatch(reset());

export default bookSlice.reducer;

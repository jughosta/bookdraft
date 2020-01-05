import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBooks } from '../utils/repository';
import { LoadingStatus } from '../utils/redux';

import { IBook } from '../types/book.type';
import { BooksState, ThunkDispatch, ThunkResult } from '../types/redux.type';

const initialState: BooksState = {
  list: [],
  loadingStatus: LoadingStatus.initial,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    loadingStatusChanged(state, action: PayloadAction<LoadingStatus>) {
      state.loadingStatus = action.payload;
    },
    loaded(state, action: PayloadAction<IBook[]>) {
      state.list = action.payload;
    },
    created(state, action: PayloadAction<IBook>) {
      state.list.push(action.payload);
    },
    edited(state, action: PayloadAction<IBook>) {
      const editedBook = action.payload;
      const prevBookIndex = state.list.findIndex(b => b.id === editedBook.id);
      if (prevBookIndex >= 0) {
        state.list[prevBookIndex] = editedBook;
      }
    },
    deleted(state, action: PayloadAction<number>) {
      const bookId = action.payload;
      const prevBookIndex = state.list.findIndex(b => b.id === bookId);
      if (prevBookIndex >= 0) {
        state.list.splice(prevBookIndex, 1);
      }
    },
  },
});

const {
  loadingStatusChanged,
  loaded,
  created,
  edited,
  deleted,
} = booksSlice.actions;

export const fetchBooks = (): ThunkResult<Promise<void>> => async (
  dispatch,
  getState,
) => {
  try {
    const loadingStatus = getState().books.loadingStatus;
    if (loadingStatus !== LoadingStatus.initial) {
      await dispatch(loadingStatusChanged(LoadingStatus.loading));
    }
    const books = await getBooks();
    await dispatch(loaded(books));
    await dispatch(loadingStatusChanged(LoadingStatus.loaded));
  } catch (error) {
    console.warn(error);
    await dispatch(loaded([]));
    await dispatch(loadingStatusChanged(LoadingStatus.failed));
  }
};

export const bookCreated = (book: IBook) => (dispatch: ThunkDispatch) =>
  dispatch(created(book));

export const bookEdited = (book: IBook) => (dispatch: ThunkDispatch) =>
  dispatch(edited(book));

export const bookDeleted = (bookId: number) => (dispatch: ThunkDispatch) =>
  dispatch(deleted(bookId));

export default booksSlice.reducer;

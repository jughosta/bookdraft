import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getBooks } from '../utils/storage';
import { LoadingStatus } from '../utils/redux';

import { Book } from '../types/book.type';
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
    loaded(state, action: PayloadAction<Book[]>) {
      state.list = action.payload;
    },
    created(state, action: PayloadAction<Book>) {
      state.list.push(action.payload);
    },
    edited(state, action: PayloadAction<Book>) {
      const editedBook = action.payload;
      const prevBookIndex = state.list.findIndex(b => b.id === editedBook.id);
      if (prevBookIndex >= 0) {
        state.list[prevBookIndex] = editedBook;
      }
    },
  },
});

const { loadingStatusChanged, loaded, created, edited } = booksSlice.actions;

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

export const bookCreated = (book: Book) => (dispatch: ThunkDispatch) =>
  dispatch(created(book));

export const bookEdited = (book: Book) => (dispatch: ThunkDispatch) =>
  dispatch(edited(book));

export default booksSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { Book } from '../types/book.type';

let nextBookId = 0;

const exampleBook = {
  id: nextBookId++,
  title: 'Demo book',
  description: 'This book can show what is possible here',
};

const booksSlice = createSlice({
  name: 'books',
  initialState: [exampleBook] as Book[],
  reducers: {
    addBook: {
      reducer(state, action) {
        const { id, bookData } = action.payload;
        state.push({ ...bookData, id });
      },
      prepare(bookData) {
        return { payload: { bookData, id: nextBookId++ } };
      },
    },
  },
});

export const { addBook } = booksSlice.actions;

export default booksSlice.reducer;

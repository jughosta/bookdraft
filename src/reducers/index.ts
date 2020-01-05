import { combineReducers } from 'redux';

import bookSlice from './bookSlice';
import booksSlice from './booksSlice';
import chaptersSlice from './chaptersSlice';

export default combineReducers({
  book: bookSlice,
  books: booksSlice,
  chapters: chaptersSlice,
});

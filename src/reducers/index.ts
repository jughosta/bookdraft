import { combineReducers } from 'redux';

import bookSlice from './bookSlice';
import booksSlice from './booksSlice';

export default combineReducers({
  book: bookSlice,
  books: booksSlice,
});

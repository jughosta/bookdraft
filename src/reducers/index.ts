import { combineReducers } from 'redux';

import booksSlice from './booksSlice';

export default combineReducers({
  books: booksSlice,
});

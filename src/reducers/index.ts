import { combineReducers } from 'redux';

import bookSlice from './bookSlice';
import booksSlice from './booksSlice';
import chapterSlice from './chapterSlice';
import chaptersSlice from './chaptersSlice';
import chapterItemSlice from './chapterItemSlice';
import chapterItemsSlice from './chapterItemsSlice';

export default combineReducers({
  book: bookSlice,
  books: booksSlice,
  chapter: chapterSlice,
  chapters: chaptersSlice,
  chapterItem: chapterItemSlice,
  chapterItems: chapterItemsSlice,
});

import { Action } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch as TDispatch } from 'redux-thunk';

import { ConnectingStatus, LoadingStatus } from '../utils/redux';

import { IBook, INullableBook } from './book.type';
import { IChapter, INullableChapter } from './chapter.type';
import { IChapterItem, INullableChapterItem } from './chapterItem.type';

export type BookState = {
  book: INullableBook;
  loadingStatus: LoadingStatus;
};

export type BooksState = {
  list: IBook[];
  loadingStatus: LoadingStatus;
};

export type ChapterState = {
  chapter: INullableChapter;
  loadingStatus: LoadingStatus;
};

export type ChaptersState = {
  list: IChapter[];
  loadingStatus: LoadingStatus;
};

export type ChapterItemState = {
  chapterItem: INullableChapterItem;
  loadingStatus: LoadingStatus;
};

export type ChapterItemsState = {
  list: IChapterItem[];
  loadingStatus: LoadingStatus;
};

export type StorageState = {
  connectingStatus: ConnectingStatus;
};

export type RootState = {
  book: BookState;
  books: BooksState;
  chapter: ChapterState;
  chapters: ChaptersState;
  chapterItem: ChapterItemState;
  chapterItems: ChapterItemsState;
  storage: StorageState;
};

export type ThunkResult<R> = ThunkAction<R, RootState, null, Action<string>>;
export type ThunkDispatch = TDispatch<RootState, null, Action<string>>;

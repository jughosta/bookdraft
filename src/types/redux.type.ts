import { Action } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch as TDispatch } from 'redux-thunk';

import { LoadingStatus } from '../utils/redux';

import { IBook, INullableBook } from './book.type';
import { IChapter, INullableChapter } from './chapter.type';

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

export type RootState = {
  book: BookState;
  books: BooksState;
  chapter: ChapterState;
  chapters: ChaptersState;
};

export type ThunkResult<R> = ThunkAction<R, RootState, null, Action<string>>;
export type ThunkDispatch = TDispatch<RootState, null, Action<string>>;

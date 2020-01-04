import { Action } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch as TDispatch } from 'redux-thunk';

import { LoadingStatus, UpdatingStatus } from '../utils/redux';

import { Book } from './book.type';

export type BooksState = {
  list: Book[];
  loadingStatus: LoadingStatus;
  updatingStatus: UpdatingStatus;
};

export type RootState = {
  books: BooksState;
};

export type ThunkResult<R> = ThunkAction<R, RootState, null, Action<string>>;
export type ThunkDispatch = TDispatch<RootState, null, Action<string>>;

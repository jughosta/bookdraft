import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { chapterCreated, chapterDeleted, chapterEdited } from './chaptersSlice';

import {
  destroyChapter,
  getChapter,
  insertChapter,
  updateChapter,
} from '../utils/repository';
import { LoadingStatus } from '../utils/redux';

import { IChapterData, INullableChapter } from '../types/chapter.type';
import { ChapterState, ThunkDispatch, ThunkResult } from '../types/redux.type';

const initialState: ChapterState = {
  chapter: null,
  loadingStatus: LoadingStatus.initial,
};

const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    loadingStatusChanged(state, action: PayloadAction<LoadingStatus>) {
      state.loadingStatus = action.payload;
    },
    loaded(state, action: PayloadAction<INullableChapter>) {
      state.chapter = action.payload || null;
    },
    reset() {
      return initialState;
    },
  },
});

const { loaded, loadingStatusChanged, reset } = chapterSlice.actions;

export const fetchChapter = (
  chapterId: number,
): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const loadingStatus = getState().chapter.loadingStatus;
    if (loadingStatus !== LoadingStatus.initial) {
      await dispatch(loadingStatusChanged(LoadingStatus.loading));
    }
    const chapter = await getChapter(chapterId);
    await dispatch(loaded(chapter));
    await dispatch(loadingStatusChanged(LoadingStatus.loaded));
  } catch (error) {
    console.warn(error);
    await dispatch(loaded(null));
    await dispatch(loadingStatusChanged(LoadingStatus.failed));
  }
};

export const createChapter = (
  chapterData: IChapterData,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    const chapter = await insertChapter(chapterData);
    await dispatch(chapterCreated(chapter));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const editChapter = (
  chapterId: number,
  chapterData: IChapterData,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    const chapter = await updateChapter(chapterId, chapterData);
    await dispatch(loaded(chapter));
    await dispatch(chapterEdited(chapter));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const deleteChapter = (
  chapterId: number,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    await destroyChapter(chapterId);
    await dispatch(reset());
    await dispatch(chapterDeleted(chapterId));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const resetChapter = () => (dispatch: ThunkDispatch) =>
  dispatch(reset());

export default chapterSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getChapters } from '../utils/repository';
import { LoadingStatus } from '../utils/redux';

import { IChapter } from '../types/chapter.type';
import { ChaptersState, ThunkDispatch, ThunkResult } from '../types/redux.type';

const initialState: ChaptersState = {
  list: [],
  loadingStatus: LoadingStatus.initial,
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    loadingStatusChanged(state, action: PayloadAction<LoadingStatus>) {
      state.loadingStatus = action.payload;
    },
    loaded(state, action: PayloadAction<IChapter[]>) {
      state.list = action.payload;
    },
    created(state, action: PayloadAction<IChapter>) {
      state.list.push(action.payload);
    },
    edited(state, action: PayloadAction<IChapter>) {
      const editedChapter = action.payload;
      const prevChapterIndex = state.list.findIndex(
        c => c.id === editedChapter.id,
      );
      if (prevChapterIndex >= 0) {
        state.list[prevChapterIndex] = editedChapter;
      }
    },
    deleted(state, action: PayloadAction<number>) {
      const chapterId = action.payload;
      const prevChapterIndex = state.list.findIndex(c => c.id === chapterId);
      if (prevChapterIndex >= 0) {
        state.list.splice(prevChapterIndex, 1);
      }
    },
    reset() {
      return initialState;
    },
  },
});

const {
  loadingStatusChanged,
  loaded,
  created,
  edited,
  deleted,
  reset,
} = chaptersSlice.actions;

export const fetchChapters = (
  bookId: number,
): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const loadingStatus = getState().chapters.loadingStatus;
    if (loadingStatus !== LoadingStatus.initial) {
      await dispatch(loadingStatusChanged(LoadingStatus.loading));
    }
    const chapters = await getChapters(bookId);
    await dispatch(loaded(chapters));
    await dispatch(loadingStatusChanged(LoadingStatus.loaded));
  } catch (error) {
    console.warn(error);
    await dispatch(loaded([]));
    await dispatch(loadingStatusChanged(LoadingStatus.failed));
  }
};

export const chapterCreated = (chapter: IChapter) => (
  dispatch: ThunkDispatch,
) => dispatch(created(chapter));

export const chapterEdited = (chapter: IChapter) => (dispatch: ThunkDispatch) =>
  dispatch(edited(chapter));

export const chapterDeleted = (chapterId: number) => (
  dispatch: ThunkDispatch,
) => dispatch(deleted(chapterId));

export const resetChapters = () => (dispatch: ThunkDispatch) =>
  dispatch(reset());

export default chaptersSlice.reducer;

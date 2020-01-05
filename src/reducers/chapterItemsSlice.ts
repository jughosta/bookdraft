import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getChapterItems } from '../utils/repository';
import { LoadingStatus } from '../utils/redux';

import { IChapterItem } from '../types/chapterItem.type';
import {
  ChapterItemsState,
  ThunkDispatch,
  ThunkResult,
} from '../types/redux.type';

const initialState: ChapterItemsState = {
  list: [],
  loadingStatus: LoadingStatus.initial,
};

const chapterItemsSlice = createSlice({
  name: 'chapterItems',
  initialState,
  reducers: {
    loadingStatusChanged(state, action: PayloadAction<LoadingStatus>) {
      state.loadingStatus = action.payload;
    },
    loaded(state, action: PayloadAction<IChapterItem[]>) {
      state.list = action.payload;
    },
    created(state, action: PayloadAction<IChapterItem>) {
      state.list.push(action.payload);
    },
    edited(state, action: PayloadAction<IChapterItem>) {
      const editedChapter = action.payload;
      const prevChapterIndex = state.list.findIndex(
        c => c.id === editedChapter.id,
      );
      if (prevChapterIndex >= 0) {
        state.list[prevChapterIndex] = editedChapter;
      }
    },
    deleted(state, action: PayloadAction<number>) {
      const chapterItemId = action.payload;
      const prevChapterIndex = state.list.findIndex(
        c => c.id === chapterItemId,
      );
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
} = chapterItemsSlice.actions;

export const fetchChapterItems = (
  chapterId: number,
): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const loadingStatus = getState().chapterItems.loadingStatus;
    if (loadingStatus !== LoadingStatus.initial) {
      await dispatch(loadingStatusChanged(LoadingStatus.loading));
    }
    const chapterItems = await getChapterItems(chapterId);
    await dispatch(loaded(chapterItems));
    await dispatch(loadingStatusChanged(LoadingStatus.loaded));
  } catch (error) {
    console.warn(error);
    await dispatch(loaded([]));
    await dispatch(loadingStatusChanged(LoadingStatus.failed));
  }
};

export const chapterItemCreated = (chapterItem: IChapterItem) => (
  dispatch: ThunkDispatch,
) => dispatch(created(chapterItem));

export const chapterItemEdited = (chapterItem: IChapterItem) => (
  dispatch: ThunkDispatch,
) => dispatch(edited(chapterItem));

export const chapterItemDeleted = (chapterItemId: number) => (
  dispatch: ThunkDispatch,
) => dispatch(deleted(chapterItemId));

export const resetChapterItems = () => (dispatch: ThunkDispatch) =>
  dispatch(reset());

export default chapterItemsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  chapterItemCreated,
  chapterItemDeleted,
  chapterItemEdited,
} from './chapterItemsSlice';

import {
  destroyChapterItem,
  getChapterItem,
  insertChapterItem,
  updateChapterItem,
} from '../utils/repository';
import { LoadingStatus } from '../utils/redux';

import {
  IChapterItemData,
  INullableChapterItem,
} from '../types/chapterItem.type';
import {
  ChapterItemState,
  ThunkDispatch,
  ThunkResult,
} from '../types/redux.type';

const initialState: ChapterItemState = {
  chapterItem: null,
  loadingStatus: LoadingStatus.initial,
};

const chapterItemSlice = createSlice({
  name: 'chapterItem',
  initialState,
  reducers: {
    loadingStatusChanged(state, action: PayloadAction<LoadingStatus>) {
      state.loadingStatus = action.payload;
    },
    loaded(state, action: PayloadAction<INullableChapterItem>) {
      state.chapterItem = action.payload || null;
    },
    reset() {
      return initialState;
    },
  },
});

const { loaded, loadingStatusChanged, reset } = chapterItemSlice.actions;

export const fetchChapterItem = (
  chapterItemId: number,
): ThunkResult<Promise<void>> => async (dispatch, getState) => {
  try {
    const loadingStatus = getState().chapterItem.loadingStatus;
    if (loadingStatus !== LoadingStatus.initial) {
      await dispatch(loadingStatusChanged(LoadingStatus.loading));
    }
    const chapterItem = await getChapterItem(chapterItemId);
    await dispatch(loaded(chapterItem));
    await dispatch(loadingStatusChanged(LoadingStatus.loaded));
  } catch (error) {
    console.warn(error);
    await dispatch(loaded(null));
    await dispatch(loadingStatusChanged(LoadingStatus.failed));
  }
};

export const createChapterItem = (
  chapterItemData: IChapterItemData,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    const chapterItem = await insertChapterItem(chapterItemData);
    await dispatch(chapterItemCreated(chapterItem));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const editChapterItem = (
  chapterItemId: number,
  chapterItemData: IChapterItemData,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    const chapterItem = await updateChapterItem(chapterItemId, chapterItemData);
    await dispatch(loaded(chapterItem));
    await dispatch(chapterItemEdited(chapterItem));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const deleteChapterItem = (
  chapterItemId: number,
): ThunkResult<Promise<void>> => async dispatch => {
  try {
    await destroyChapterItem(chapterItemId);
    await dispatch(reset());
    await dispatch(chapterItemDeleted(chapterItemId));
  } catch (error) {
    console.warn(error);
    throw error;
  }
};

export const resetChapterItem = () => (dispatch: ThunkDispatch) =>
  dispatch(reset());

export default chapterItemSlice.reducer;

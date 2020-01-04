import { FormMode } from './form.type';

export type NavigationParamsBooks = {};

export type NavigationParamsForm = {
  mode: FormMode;
  id?: number;
};

export type NavigationParamsBook = {
  bookId: number;
};

export type NavigationParamsChapter = {
  chapterId: number;
};

export type NavigationParamsChapterItem = {
  chapterItemId: number;
};

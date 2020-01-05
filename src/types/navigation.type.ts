export type NavigationParamsBooks = {};

export type NavigationParamsForm = {
  id?: number;
};

export type NavigationParamsBook = {
  bookId: number;
  onHeaderRightPressed?: () => void;
};

export type NavigationParamsChapter = {
  chapterId: number;
};

export type NavigationParamsChapterItem = {
  chapterItemId: number;
};

export type NavigationParamsBooks = {};

export type NavigationParamsForm = {
  id?: number;
  onHeaderRightPressed?: () => void;
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

import { IBook } from './book.type';
import { IChapter } from './chapter.type';
import { IChapterItem } from './chapterItem.type';

export type NavigationParamsBooks = {};

export type NavigationParamsBook = {
  bookId: number;
  onEdit?: () => void;
};

export type NavigationParamsBookForm = {
  book?: IBook;
  onConfirmDeletion?: () => void;
};

export type NavigationParamsChapter = {
  chapterId: number;
  chapterBookId: number;
};

export type NavigationParamsChapterForm = {
  bookId: number;
  chapter?: IChapter;
  onConfirmDeletion?: () => void;
};

export type NavigationParamsChapterItem = {
  chapterItemId: number;
};

export type NavigationParamsChapterItemForm = {
  chapterId: number;
  chapterItem?: IChapterItem;
  onConfirmDeletion?: () => void;
};

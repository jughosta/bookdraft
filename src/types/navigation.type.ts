import { IBook } from './book.type';
import { IChapter } from './chapter.type';

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
};

export type NavigationParamsChapterForm = {
  chapter?: IChapter;
  onConfirmDeletion?: () => void;
};

export type NavigationParamsChapterItem = {
  chapterItemId: number;
};

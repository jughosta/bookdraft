import { FormField, FormFieldShape } from '../types/form.type';
import { INullableBook } from '../types/book.type';
import { INullableChapter } from '../types/chapter.type';
import {
  ChapterItemState,
  INullableChapterItem,
} from '../types/chapterItem.type';

export enum FormSubmittingStatus {
  initial = 'initial',
  processing = 'processing',
  succeeded = 'succeeded',
  failed = 'failed',
}

export const getBookFormFields = (book?: INullableBook): FormField[] => [
  {
    name: 'title',
    label: 'Title',
    shape: FormFieldShape.text,
    defaultValue: book ? book.title : '',
  },
];

export const getChapterFormFields = (
  chapter?: INullableChapter,
): FormField[] => [
  {
    name: 'title',
    label: 'Title',
    shape: FormFieldShape.text,
    defaultValue: chapter ? chapter.title : '',
  },
];

export const getChapterItemFormFields = (
  chapterItem?: INullableChapterItem,
): FormField[] => [
  {
    name: 'state',
    label: 'State',
    shape: FormFieldShape.select,
    defaultValue: chapterItem ? chapterItem.state : ChapterItemState.inProgress,
    options: [
      {
        label: 'Work in progress',
        value: ChapterItemState.inProgress,
      },
      {
        label: 'Done',
        value: ChapterItemState.done,
      },
      {
        label: 'Idea / TODO',
        value: ChapterItemState.idea,
      },
    ],
  },
  {
    name: 'content',
    label: 'Content',
    shape: FormFieldShape.textarea,
    defaultValue: chapterItem ? chapterItem.content : '',
  },
];

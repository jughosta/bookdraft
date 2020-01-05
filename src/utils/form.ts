import { FormField, FormFieldShape } from '../types/form.type';
import { INullableBook } from '../types/book.type';
import { INullableChapter } from '../types/chapter.type';

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

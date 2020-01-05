import { FormField, FormFieldShape } from '../types/form.type';
import { NullableBook } from '../types/book.type';

export enum FormSubmittingStatus {
  initial = 'initial',
  processing = 'processing',
  succeeded = 'succeeded',
  failed = 'failed',
}

export const getBookFormFields = (book: NullableBook): FormField[] => [
  {
    name: 'title',
    label: 'Title',
    shape: FormFieldShape.text,
    defaultValue: book ? book.title : '',
  },
];

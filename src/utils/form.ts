import { FormField, FormFieldShape } from '../types/form.type';
import { Book } from '../types/book.type';

export const getBookFormFields = (book?: Book): FormField[] => [
  {
    name: 'title',
    label: 'Title',
    shape: FormFieldShape.text,
    defaultValue: book ? book.title : '',
  },
];

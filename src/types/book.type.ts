export type BookData = {
  title: string;
};

export type Book = BookData & {
  id: number;
};

export type NullableBook = Book | null;

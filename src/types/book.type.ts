export type BookData = {
  title: string;
  description: string;
};

export type Book = BookData & {
  id: number;
};

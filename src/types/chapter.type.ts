import { IEntity, IEntityData } from './entity';

export interface IChapterData extends IEntityData {
  title: string;
  bookId: number;
}

export interface IChapter extends IEntity, IChapterData {}

export type INullableChapter = IChapter | null;

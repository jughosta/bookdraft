import { IEntity, IEntityData } from './entity.type';

export interface IChapterData extends IEntityData {
  title: string;
  bookId: number;
}

export interface IChapter extends IEntity, IChapterData {}

export interface IChapterWithCounters extends IChapter {
  countIdea: number;
  countInProgress: number;
  countDone: number;
}

export type INullableChapter = IChapter | null;

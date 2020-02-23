import { IEntity, IEntityData } from './entity.type';

export enum ChapterItemState {
  idea = 'idea',
  inProgress = 'inProgress',
  done = 'done',
}

export interface IChapterItemData extends IEntityData {
  state: ChapterItemState;
  content: string;
  chapterId: number;
}

export interface IChapterItem extends IEntity, IChapterItemData {}

export type INullableChapterItem = IChapterItem | null;

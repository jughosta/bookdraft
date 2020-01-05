import { IEntity, IEntityData } from './entity';

export interface IBookData extends IEntityData {
  title: string;
}

export interface IBook extends IEntity, IBookData {}

export type INullableBook = IBook | null;

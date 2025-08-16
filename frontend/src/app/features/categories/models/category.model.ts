import {Group} from './group.model';

export interface Category {
  id: number;
  group?: Group;
  wording: string;
  description: string;
}

import { Category } from '../features/categories/models/category.model';
import {Group} from '../features/categories/models/group.model';

export const MOCK_GROUPS: Group[] = [
  {id: 1, name: 'Banque & Assurance', color: 'm-blue'},
  {id: 2, name: 'Frais de fonctionnement', color: 'm-red'},
  {id: 3, name: 'Impôts & Rémunérations', color: 'm-green'}
];

export const MOCK_CATEGORIES: Category[] = [
  {id: 1, wording: 'Honoraires rétrocédés', description: 'Ah bah oui je sais complètement ce que c\'est ahahah qui le sait pas enfin', group: MOCK_GROUPS[0]},
  {id: 2, wording: 'Matériel informatique et logiciel (immobilisé)', description: null, group: MOCK_GROUPS[2]},
  {id: 3, wording: 'Participation', description: 'Parce que l\'important c\'est de participer', group: MOCK_GROUPS[1]},
  {id: 4, wording: 'Variation de stock de matières premières', description: 'The game'},
  {id: 5, wording: 'Ventes de marchandises 5,5%', description: 'on va tester les nombre avec ça', group: MOCK_GROUPS[0]},
];
export const MOCK_VISIBLE_CATEGORY_IDS = [{id: 1}, {id: 3}];

export const EXPECTED_CATEGORIES = [
  MOCK_CATEGORIES[0],
  MOCK_CATEGORIES[2]
];

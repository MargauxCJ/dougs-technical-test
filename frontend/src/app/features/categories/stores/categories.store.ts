import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map} from 'rxjs';
import {Category} from '../models/category.model';
import {CategoryService} from '../services/category.service';
import {Group} from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class CategoriesStore {

  private categoryService= inject(CategoryService);

  private _categories$ = new BehaviorSubject<Category[]>([]);
  private _search$ = new BehaviorSubject<string>('');
  private _selectGroup$ = new BehaviorSubject<number | null>(null);
  private _sort$ = new BehaviorSubject<string>('alphabet');

  public init() {
    if(!this._categories$.value.length) {
      this.loadCategories();
    }
  }

  private loadCategories() {
    this.categoryService.getVisibleCategories().subscribe(categories => {
      this._categories$.next(categories);
    });
  }

  public groups$ = this._categories$.pipe(
    map(categories => {
      const group: Group[] = [];
      const seen = new Set<number>();
      for (const category of categories) {
        if (category.group && !seen.has(category.group.id)) {
          seen.add(category.group.id);
          group.push(category.group);
        }
      }
      return group;
    })
  );

  public filteredCategories$ = combineLatest([
    this._categories$,
    this._search$,
    this._selectGroup$,
    this._sort$
  ]).pipe(
    map(([categories, search, group, sort]) => {
      let res: Category[] = [...categories];

      if (search) {
        res = res.filter(cat =>
          this.normalizeText(cat.wording).includes(this.normalizeText(search)) ||
          this.normalizeText(cat.description || '').includes(this.normalizeText(search))
        );
      }

      if (group) {
        res = res.filter((cat: Category) => cat.group?.id === group);
      }

      if (sort === 'alphabet') {
        res.sort((a, b) => a.wording.localeCompare(b.wording));
      } else if (sort === 'group') {
        res.sort((a, b) => (a.group?.id ?? -1) - (b.group?.id ?? -1));
      }

      return res;
    })
  );

  public categoriesByGroup$ = combineLatest([this.groups$, this.filteredCategories$]).pipe(
    map(([groups, categories]) => {
      const res = groups
        .map((group: Group) => ({
          group,
          categories: categories.filter(c => c.group?.id === group.id)
        }))
        .filter(g => g.categories.length > 0);

      // There is no such case in the visibleCategories List, but group is optional in Category model
      const  uncategorized = categories.filter(c => !c.group);
      if (uncategorized.length > 0) {
        res.push({
          group: { id: -1, name: 'Autres', color: 'grey' },
          categories: uncategorized
        });
      }

        return res
      }
    )
  );

  public get categories$() {
    return this._categories$.asObservable();
  }

  public get sort$() {
    return this._sort$.asObservable();
  }

  public setSearch(value: string): void {
    this._search$.next(value);
  }

  public setGroup(groupId: number): void {
      this._selectGroup$.next(groupId);
  }

  public setSort(value: string): void {
    this._sort$.next(value);
  }

  //TODO: Get this function in a text.service if more text manipulation, like using a wysiwig ?
  protected normalizeText(text: string): string {
    return text.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .toLowerCase()
  }
}

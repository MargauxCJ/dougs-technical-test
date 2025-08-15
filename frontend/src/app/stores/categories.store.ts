import { Injectable, signal, computed, inject, Signal } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';
import { Group } from '../models/group.model';
import {CategoriesList} from '../pages/categories/categories-list';

@Injectable({ providedIn: 'root' })
export class CategoriesStore {
  private categoryService = inject(CategoriesService);

  public categories = signal<Category[]>([]);
  public search = signal('');
  public selectGroup = signal<number | null>(null);
  public sort = signal<string>('alphabet');

  public loadCategories() {
    this.categoryService.getVisibleCategories().subscribe(categories => {
      this.categories.set(categories);
    });
  }

  public groups: Signal<Group[]> = computed(() => {
    const allGroups = this.categories()
      .map(category => category.group)

    const uniqueGroups: Group[] = [];
    const seen = new Set<number>();

    allGroups.forEach(g => {
      if (!seen.has(g.id)) {
        seen.add(g.id);
        uniqueGroups.push(g);
      }
    });

    return uniqueGroups;
  });

  public filteredCategories: Signal<Category[]> = computed(() => {
    let result = this.categories();

    if (this.search()) {
      result = result.filter((category: Category) => category.wording.toLowerCase().includes(this.search()!.toLowerCase()));
    }

    if (this.selectGroup()) {
      result = result.filter((category: Category) => category.group?.id === this.selectGroup());
    }

    if (this.sort() === 'alphabet') {
      result = [...result].sort((a, b) => a.wording.localeCompare(b.wording));
    } else if (this.sort() === 'group') {
      result = [...result].sort((a, b) => (a.group?.id ?? -1) - (b.group?.id ?? -1));
    }

    return result;
  });
}

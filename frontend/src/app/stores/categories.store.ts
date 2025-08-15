import {computed, inject, Injectable, signal, Signal} from '@angular/core';
import {Category} from '../models/category.model';
import {CategoryService} from '../services/category.service';
import {Group} from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class CategoriesStore {
  private categoryService = inject(CategoryService);

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

  public categoriesByGroup: Signal<{ group: Group; categories: Category[] }[]> = computed(() => {
    const groups = this.groups();
    const cats = this.filteredCategories();

    return groups.map(group => ({
      group,
      categories: cats.filter(c => c.group?.id === group.id)
    })).filter(g => g.categories.length > 0);
  });

  public filteredCategories: Signal<Category[]> = computed(() => {
    let result = this.categories();

    if (this.search()) {
      const search = this.search()!
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .toLowerCase();

      result = result.filter((category: Category) =>
        category.wording
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9 ]/g, '')
          .toLowerCase()
          .includes(search)
      );
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

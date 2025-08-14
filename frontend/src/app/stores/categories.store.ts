import { Injectable, signal, computed, inject, Signal } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';
import { Group } from '../models/group.model';

@Injectable({ providedIn: 'root' })
export class CategoriesStore {
  private categoryService = inject(CategoriesService);

  public categories = signal<Category[]>([]);
  public search = signal('');
  public selectGroup = signal<number | null>(null);
  public sort = signal<string>('alphabet');

  loadCategories() {
    this.categoryService.getVisibleCategories().subscribe(categories => {
      console.log('Loaded categories:', categories);
      this.categories.set(categories);
    });
  }

  public groups: Signal<Group[]> = computed(() => {
    const allGroups = this.categories()
      .map(c => c.group)
      .filter((g): g is Group => !!g);

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
      const searchLower = this.search()!.toLowerCase();
      result = result.filter(c => c.wording.toLowerCase().includes(searchLower));
    }

    if (this.selectGroup()) {
      result = result.filter(c => c.group?.id === this.selectGroup());
    }

    if (this.sort() === 'alphabet') {
      result = [...result].sort((a, b) => a.wording.localeCompare(b.wording));
    } else if (this.sort() === 'group') {
      result = [...result].sort((a, b) => (a.group?.id ?? -1) - (b.group?.id ?? -1));
    }

    return result;
  });
}

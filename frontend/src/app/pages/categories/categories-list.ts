import {Component, inject, OnInit} from '@angular/core';
import {CategoryCard} from '../../components/category-card/category-card';
import {Search} from '../../components/search/search';
import {SortButtonsComponent, SortOption} from '../../components/sort-buttons/sort-buttons';
import {FormsModule} from '@angular/forms';
import {CategoriesStore} from '../../stores/categories.store';
import {Select} from '../../components/select/select';
import {Category} from '../../models/category.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-categories-list',
  imports: [
    CategoryCard,
    Search,
    SortButtonsComponent,
    FormsModule,
    Select,
    CommonModule
  ],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss'
})
export class CategoriesList implements OnInit {
  public categoriesStore: CategoriesStore = inject(CategoriesStore);
  public categorySelected: Category;
  public sortOptions: SortOption[] = [
    { label: 'Ordre alphabétique', value: 'alphabet', icon: 'icon-alphabet'},
    { label: 'Groupe de catégorie', value: 'group', icon: 'icon-group'},
  ];

  public selectedSort = 'alphabet';

  public ngOnInit(): void {
    this.categoriesStore.loadCategories();
  }

  public onSortSelected(value: string) {
    this.categoriesStore.sort.set(value)
  }

  public onInputSearch(value: string) {
    this.categoriesStore.search.set(value)
  }

  public onGroupSelect(value: any) {
    this.categoriesStore.selectGroup.set(Number(value));
  }

  public getSelectedCategory(value: Category) {
    this.categorySelected = value;
  }
}

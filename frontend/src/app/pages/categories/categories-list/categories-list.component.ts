import {Component, inject, OnInit} from '@angular/core';
import {CategoryCardComponent} from '../../../components/category-card/category-card.component';
import {SearchComponent} from '../../../components/search/search.component';
import {SortButtonsComponent, SortOption} from '../../../components/sort-buttons/sort-buttons.component';
import {FormsModule} from '@angular/forms';
import {CategoriesStore} from '../../../stores/categories.store';
import {SelectComponent} from '../../../components/select/select.component';
import {Category} from '../../../models/category.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-categories-list',
  imports: [
    CategoryCardComponent,
    SearchComponent,
    SortButtonsComponent,
    FormsModule,
    SelectComponent,
    CommonModule
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss',
  standalone: true
})
export class CategoriesListComponent implements OnInit{
  public categoriesStore: CategoriesStore = inject(CategoriesStore);
  public categories$ = this.categoriesStore.filteredCategories$;
  public categoriesByGroup$ = this.categoriesStore.categoriesByGroup$;
  public groups$ = this.categoriesStore.groups$;
  public sort$ = this.categoriesStore.sort$;

  public categorySelected: Category;
  public sortOptions: SortOption[] = [
    { label: 'Ordre alphabétique', value: 'alphabet', icon: 'icon-alphabet'},
    { label: 'Groupe de catégorie', value: 'group', icon: 'icon-group'},
  ];

  public ngOnInit(): void {
    this.categoriesStore.init()
  }

  public onGroupSelect(value: number) {
    this.categoriesStore.setGroup(Number(value));
  }

  public getSelectedCategory(value: Category) {
    this.categorySelected = value;
  }
}

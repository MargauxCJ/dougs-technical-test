import {Component, inject, OnInit} from '@angular/core';
import {CategoryCard} from '../../components/category-card/category-card';
import {SearchBar} from '../../components/search-bar/search-bar';
import {CategoriesService} from '../../services/categories.service';
import {Category} from '../../models/category.model';
import {forkJoin, map, Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {SortButtonsComponent, SortOption} from '../../components/sort-buttons/sort-buttons';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [
    CategoryCard,
    SearchBar,
    AsyncPipe,
    SortButtonsComponent,
    FormsModule
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {
  public displayedCategories$: Observable<Category[]>;
  private categoriesService = inject(CategoriesService);

  sortOptions: SortOption[] = [
    { label: 'Ordre alphabétique', value: 'alphabet', icon: 'icon-alphabet'},
    { label: 'Groupe de catégorie', value: 'group', icon: 'icon-group'},
  ];

  selectedSort = 'alphabet';

  public ngOnInit(): void {
    this.displayedCategories$ = this.categoriesService.getVisibleCategories();
  }

  public onSortSelected(value: string) {
    console.log(value);
  }
}

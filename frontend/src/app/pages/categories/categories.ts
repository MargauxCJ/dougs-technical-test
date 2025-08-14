import {Component, inject, OnInit} from '@angular/core';
import {CategoryCard} from '../../components/category-card/category-card';
import {Search} from '../../components/search/search';
import {CategoriesService} from '../../services/categories.service';
import {Category} from '../../models/category.model';
import {Observable} from 'rxjs';
import {SortButtonsComponent, SortOption} from '../../components/sort-buttons/sort-buttons';
import {FormsModule} from '@angular/forms';
import {CategoriesStore} from '../../stores/categories.store';
import {Select, SelectOption} from '../../components/select/select';
import {Group} from '../../models/group.model';

@Component({
  selector: 'app-categories',
  imports: [
    CategoryCard,
    Search,
    SortButtonsComponent,
    FormsModule,
    Select
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {
  public categoriesStore: CategoriesStore = inject(CategoriesStore);
  public categoriesGroupOptions = this.categoriesStore.groups();

  sortOptions: SortOption[] = [
    { label: 'Ordre alphabétique', value: 'alphabet', icon: 'icon-alphabet'},
    { label: 'Groupe de catégorie', value: 'group', icon: 'icon-group'},
  ];

  selectedSort = 'alphabet';

  public ngOnInit(): void {
    this.categoriesStore.loadCategories();
  }

  public onSortSelected(value: string) {
    this.categoriesStore.sort.set(value)
  }

  public onInputSearch(value: string) {
    this.categoriesStore.search.set(value)
  }

  public onGroupSelect(value: Group) {
    // this.categoriesStore.selectGroup.set(value)
  }
}

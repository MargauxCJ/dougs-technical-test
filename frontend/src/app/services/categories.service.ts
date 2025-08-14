import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/category.model';
import {forkJoin, map, Observable} from 'rxjs';

const API_PREFIX = '/api/';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {
  }

  public getAllCategories(): Observable<Category[]>  {
    return this.http.get<Category[]>(API_PREFIX+'all-categories');
  }

  public getVisibleCategoriesIds(): Observable<{id: number}[]> {
    return this.http.get<{id: number}[]>(API_PREFIX+'visible-categories')
  }

  public getVisibleCategories(): Observable<Category[]> {
       return forkJoin({
      all: this.getAllCategories(),
      visible: this.getVisibleCategoriesIds(),
    })
      .pipe(
        map(({all, visible}) => {
          const visibleIds = visible.map(v => v.id);
          return all.filter(cat => visibleIds.includes(cat.id));
        })
      )
  }

  public getAllGroupNames(): Observable<string[]> {
    return this.getAllCategories().pipe(
      map(categories => {
        const groupNames = categories
          .map(cat => cat.group?.name)
          .filter((name): name is string => !!name);
        return Array.from(new Set(groupNames));
      })
    );
  }
}

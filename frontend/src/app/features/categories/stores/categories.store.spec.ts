import {TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {CategoriesStore} from './categories.store';
import {CategoryService} from '../services/category.service';
import {MOCK_CATEGORIES} from '../../../testing/mock-categories';

describe('CategoriesStore', () => {
  let categoriesStore: CategoriesStore;
  let categoryServiceMock: jest.Mocked<CategoryService>;

  beforeEach(() => {
    const categoryServiceSpy = {
      getVisibleCategories: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        CategoriesStore,
        {provide: CategoryService, useValue: categoryServiceSpy}
      ]
    });

    categoriesStore = TestBed.inject(CategoriesStore);
    categoryServiceMock = TestBed.inject(CategoryService) as jest.Mocked<CategoryService>;

    categoryServiceMock.getVisibleCategories.mockReturnValue(of(MOCK_CATEGORIES));
    categoriesStore.init();
  });

  it('should load categories if none exist', () => {
    expect(categoryServiceMock.getVisibleCategories).toHaveBeenCalledTimes(1);
  });

  it('should not load categories if already call', () => {
    categoriesStore.init();
    expect(categoryServiceMock.getVisibleCategories).toHaveBeenCalledTimes(1);
  });

  it('should load categories', (done) => {
    categoriesStore.categories$.subscribe(categories => {
      expect(categories).toEqual(MOCK_CATEGORIES);
      done();
    });
  });

  it('should filter categories by search', (done) => {
    categoriesStore.setSearch('je SAis !');

    categoriesStore.filteredCategories$.subscribe(categories => {
      expect(categories).toHaveLength(1);
      expect(categories[0].wording.includes('je sais') || categories[0].description.includes('je sais')).toBe(true);
      done();
    });
  });

  it('should return all categories when search is empty', (done) => {
    categoriesStore.setSearch('');

    categoriesStore.filteredCategories$.subscribe(categories => {
      expect(categories).toHaveLength(MOCK_CATEGORIES.length);
      done();
    });
  });

  it('should filter categories by group id', (done) => {
    categoriesStore.setGroup(1);

    categoriesStore.filteredCategories$.subscribe(categories => {
      expect(categories).toHaveLength(2);
      expect(categories.every(cat => cat.group?.id === 1)).toBe(true);
      done();
    });
  });

  it('should return all categories when no group is selected', (done) => {
    categoriesStore.filteredCategories$.subscribe(categories => {
      expect(categories).toHaveLength(MOCK_CATEGORIES.length);
      done();
    });
  });

  it('should apply search and group filters together', (done) => {
    categoriesStore.setSearch('pArTiCiPeR');
    categoriesStore.setGroup(2);

    categoriesStore.filteredCategories$.subscribe(categories => {
      expect(categories).toHaveLength(1);
      expect(categories[0].description).toContain('participer');
      expect(categories[0].group?.id).toBe(2);
      done();
    });
  });
});

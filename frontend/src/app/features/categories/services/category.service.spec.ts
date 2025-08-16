import {Category} from '../models/category.model';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {CategoryService} from './category.service';
import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {EXPECTED_CATEGORIES, MOCK_CATEGORIES, MOCK_VISIBLE_CATEGORY_IDS} from '../../../testing/mock-categories';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CategoryService,
      ],
    });

    categoryService = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get all categories', () => {
    categoryService.getAllCategories().subscribe((categories: Category[]) => {
      expect(categories).toEqual(MOCK_CATEGORIES);
    });

    const req = httpMock.expectOne('/api/all-categories');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_CATEGORIES);
  });

  it('should get visible category IDs', () => {
    categoryService.getVisibleCategoriesIds().subscribe((ids: {id: number}[]) => {
      expect(ids).toEqual(MOCK_VISIBLE_CATEGORY_IDS);
    });

    const req = httpMock.expectOne('/api/visible-categories');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_VISIBLE_CATEGORY_IDS);
  });

  it('should return visible categories', () => {
    categoryService.getVisibleCategories().subscribe((cats: Category[]) => {
      expect(cats).toEqual(EXPECTED_CATEGORIES);
    });

    const allReq = httpMock.expectOne('/api/all-categories');
    expect(allReq.request.method).toBe('GET');
    allReq.flush(MOCK_CATEGORIES);

    const visibleReq = httpMock.expectOne('/api/visible-categories');
    expect(visibleReq.request.method).toBe('GET');
    visibleReq.flush(MOCK_VISIBLE_CATEGORY_IDS);
  });
});

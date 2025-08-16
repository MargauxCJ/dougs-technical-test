import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {CategoryService} from './category.service';
import {Category} from '../models/category.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        CategoryService],
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all categories', () => {
    const mockCategories: Category[] = [
      {id: 1, wording: 'Cat 1', description: 'I am a big description... I lied'},
      {id: 2, wording: 'Cat 2', description: 'Lorem Ipsum blabliblu'},
    ];

    service.getAllCategories().subscribe((cats) => {
      expect(cats).toEqual(mockCategories);
    });

    const req = httpMock.expectOne('/api/all-categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should fetch visible category IDs', () => {
    const mockVisible = [{id: 1}, {id: 3}];

    service.getVisibleCategoriesIds().subscribe((ids) => {
      expect(ids).toEqual(mockVisible);
    });

    const req = httpMock.expectOne('/api/visible-categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockVisible);
  });

  it('should return only visible categories', () => {
    const allCategories: Category[] = [
      {id: 1, wording: 'Cat 1', description: 'I am a big description... I lied'},
      {id: 2, wording: 'Cat 2', description: 'Lorem Ipsum blabliblu'},
      {id: 1, wording: 'Cat 3', description: 'Im Blue dabedidabeda'},
      {id: 2, wording: 'Cat 4', description: 'The game'},
    ];
    const visibleIds = [{id: 1}, {id: 3}];
    const expectedVisibleCategories = [
      {id: 1, wording: 'Cat 1', description: 'I am a big description... I lied'},
      {id: 1, wording: 'Cat 3', description: 'Im Blue dabedidabeda'},
    ];

    service.getVisibleCategories().subscribe((cats) => {
      expect(cats).toEqual(expectedVisibleCategories);
    });

    const allReq = httpMock.expectOne('/api/all-categories');
    expect(allReq.request.method).toBe('GET');
    allReq.flush(allCategories);

    const visibleReq = httpMock.expectOne('/api/visible-categories');
    expect(visibleReq.request.method).toBe('GET');
    visibleReq.flush(visibleIds);
  });
});

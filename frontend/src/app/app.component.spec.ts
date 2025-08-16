import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    app = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});

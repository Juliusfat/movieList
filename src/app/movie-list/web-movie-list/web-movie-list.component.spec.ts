import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebMovieListComponent } from './web-movie-list.component';

describe('WebMovieListComponent', () => {
  let component: WebMovieListComponent;
  let fixture: ComponentFixture<WebMovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebMovieListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

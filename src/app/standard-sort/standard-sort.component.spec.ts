import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSortComponent } from './standard-sort.component';

describe('StandardSortComponent', () => {
  let component: StandardSortComponent;
  let fixture: ComponentFixture<StandardSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteImageDialogComponent } from './route-image-dialog.component';

describe('RouteImageDialogComponent', () => {
  let component: RouteImageDialogComponent;
  let fixture: ComponentFixture<RouteImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteImageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

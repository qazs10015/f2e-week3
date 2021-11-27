import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreButtonDialogComponent } from './more-button-dialog.component';

describe('MoreButtonDialogComponent', () => {
  let component: MoreButtonDialogComponent;
  let fixture: ComponentFixture<MoreButtonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreButtonDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

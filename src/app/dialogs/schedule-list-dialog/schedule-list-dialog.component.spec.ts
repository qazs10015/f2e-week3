import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListDialogComponent } from './schedule-list-dialog.component';

describe('ScheduleListDialogComponent', () => {
  let component: ScheduleListDialogComponent;
  let fixture: ComponentFixture<ScheduleListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleListDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

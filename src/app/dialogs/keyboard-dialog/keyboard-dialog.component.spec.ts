import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardDialogComponent } from './keyboard-dialog.component';

describe('KeyboardDialogComponent', () => {
  let component: KeyboardDialogComponent;
  let fixture: ComponentFixture<KeyboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

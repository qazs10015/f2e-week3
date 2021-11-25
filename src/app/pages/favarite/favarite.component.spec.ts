import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavariteComponent } from './favarite.component';

describe('FavariteComponent', () => {
  let component: FavariteComponent;
  let fixture: ComponentFixture<FavariteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavariteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavariteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

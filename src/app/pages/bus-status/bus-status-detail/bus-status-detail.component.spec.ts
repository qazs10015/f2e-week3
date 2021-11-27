import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStatusDetailComponent } from './bus-status-detail.component';

describe('BusStatusDetailComponent', () => {
  let component: BusStatusDetailComponent;
  let fixture: ComponentFixture<BusStatusDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusStatusDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusStatusDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

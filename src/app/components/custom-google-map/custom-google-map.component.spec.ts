import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGoogleMapComponent } from './custom-google-map.component';

describe('CustomGoogleMapComponent', () => {
  let component: CustomGoogleMapComponent;
  let fixture: ComponentFixture<CustomGoogleMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGoogleMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomGoogleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

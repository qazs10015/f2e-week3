import { TestBed } from '@angular/core/testing';

import { CityBusService } from './city-bus.service';

describe('CityBusService', () => {
  let service: CityBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

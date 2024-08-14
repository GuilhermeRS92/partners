import { TestBed } from '@angular/core/testing';

import { PartnersService } from './partners.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PartnersService', () => {
  let service: PartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnersService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PartnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

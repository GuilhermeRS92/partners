import { TestBed } from '@angular/core/testing';

import { PartnersService } from './partners.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Partner } from '../models/partner.model';

describe('PartnersService', () => {
  let service: PartnersService;
  let http: HttpClient;
  const API = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners';

  const dummyPartner: Partner = {
    createdAt: new Date(),
    name: 'Partner One',
    description: 'Description for Partner One',
    repositoryGit: 'https://github.com/partnerone/repo',
    urlDoc: 'https://partnerone.com/docs',
    clients: [1, 'Client A'],
    projects: [101, 'Project X'],
    id: 'partner1'
}
  
  const dummyPartners: Partner[] = [
    dummyPartner,
    {
        createdAt: new Date(),
        name: 'Partner Two',
        description: 'Description for Partner Two',
        repositoryGit: 'https://github.com/partnertwo/repo',
        urlDoc: 'https://partnertwo.com/docs',
        clients: [2, 'Client B'],
        projects: [102, 'Project Y'],
        id: 'partner2'
    }
];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartnersService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PartnersService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get partners', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getPartners().subscribe(users => {
      expect(users).toEqual(dummyPartners);
    })
    expect(spy).toHaveBeenCalledWith(`${API}`);
  });

  it('should get partner by id', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.getPartnerById('partner1').subscribe(user => {
      expect(user).toEqual(dummyPartner);
    })
    expect(spy).toHaveBeenCalledWith(`${API}/partner1`);
  });

  it('should post partner', () => {
    const spy = spyOn(http, 'post').and.callThrough();
    service.postPartner(dummyPartner).subscribe(user => {
      expect(user).toEqual(dummyPartner);
    })
    expect(spy).toHaveBeenCalledWith(`${API}`, dummyPartner);
  })

  it('should put partner', () => {
    const spy = spyOn(http, 'put').and.callThrough();
    service.putPartner(dummyPartner).subscribe(user => {
      expect(user).toEqual(dummyPartner);
    })
    expect(spy).toHaveBeenCalledWith(`${API}/partner1`, dummyPartner);
  })

  it('should delete partner', () => {
    const spy = spyOn(http, 'delete').and.callThrough();
    service.deletePartner('partner1').subscribe(user => {
      expect(user).toEqual(user);
    })
    expect(spy).toHaveBeenCalledWith(`${API}/partner1`);
  })
});

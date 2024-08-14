import { Injectable } from '@angular/core';
import { Partner } from '../models/partner.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  private readonly API = 'https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners'

  constructor(
    private http: HttpClient
  ) { }

  getPartners(){
    return this.http.get<Partner[]>(this.API)
  }

  getPartnerById(id: string){
    return this.http.get<Partner>(`${this.API}/${id}`)
  }

  postPartner(partner: Partner){
    return this.http.post<Partner>(this.API, partner)
  }

  putPartner(partner: Partner){
    return this.http.put<Partner>(`${this.API}/${partner.id}`, partner)
  }

  deletePartner(id: string){
    return this.http.delete(`${this.API}/${id}`)
  }
}

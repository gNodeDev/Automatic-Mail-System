import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }
  public mainUrl = "http://localhost:3000";

  post(obj, endPoint) {
    this.mainUrl = "http://localhost:3000" + endPoint; 
    return this.http.post(this.mainUrl, obj);
  }

  get(endPoint) {
    this.mainUrl = this.mainUrl + endPoint; 
    return this.http.get(this.mainUrl);
  }

}

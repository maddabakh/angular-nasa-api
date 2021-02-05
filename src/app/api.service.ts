import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class NasaItem {
  constructor(public id: string, public title: string, public url: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  url:string = "https://images-api.nasa.gov";

  /**
   * get all items by search
   * 
   * @param search 
   */
  getAllItemsBySearch(search:string) {
    return this.httpClient.get(this.url + `/search?q=${ search }`);
  }
  

  /**
   * get item detail by id
   * 
   * @param id 
   */
  getItemDetailById(id:string) {
    return this.httpClient.get(this.url + `/asset/${ id }`);
  }
}

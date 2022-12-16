import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private readonly http: HttpClient) { }

  /**
   * Get users from an api endpoint
   */
  public getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }
}

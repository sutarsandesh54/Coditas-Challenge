import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  myUrl="https://api.github.com/search/users?q=tom";
  constructor(private http: HttpClient) { }

  getUserData(): Observable<any>{
    return this.http.get(this.myUrl);
  }
}

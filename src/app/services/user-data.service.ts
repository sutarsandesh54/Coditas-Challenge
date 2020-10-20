import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  myUrl = "https://api.github.com/search/users?q=";

  repoUrl = "https://api.github.com/users/";

  constructor(private http: HttpClient) {}

  getUserData(username: string): Observable<any> {
    const body = username;
    const finalURL = `${this.myUrl}${body}`;
    return this.http.get(finalURL);
  }

  getUserRepoData(username): Observable<any> {
    const body = username;
    const change = `${this.repoUrl}${body}/repos`;
    return this.http.get(change);
  }
}

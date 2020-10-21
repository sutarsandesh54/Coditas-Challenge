import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserDetails } from "../models/data.model";
import { map } from "rxjs/operators";
import { userApiURL, repoApiURL } from "../shared/constants/constants";

@Injectable({
  providedIn: "root",
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUserData(username: string): Observable<UserDetails> {
    const body = username;
    const finalURL = `${userApiURL}${body}`;
    return this.http.get<UserDetails>(finalURL).pipe(
      map((dataElement) => {
        dataElement.items.map((element) => {
          element.buttonText = "Details";
          return element;
        });
        return dataElement;
      })
    );
  }

  getUserRepoData(username): Observable<any> {
    const body = username;
    const change = `${repoApiURL}${body}/repos`;
    return this.http.get(change);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers:HttpHeaders = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

  constructor(private http: HttpClient) { } 

  login() {
    this.http.post('url', { username: null, password: null}, { headers: this.headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/Iris/34065016/api/v1';

  constructor(private http: HttpClient) {}

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
  hasAccount(): boolean {
    return !!localStorage.getItem('accountCreated'); 
  }

  login(username: string, password: string): Observable<any> {
    const payload = { user_name: username, password };
    
    return this.http.post(`${this.baseUrl}/login`, payload, httpOptions);
  }

  signup(username: string, password: string, confirmPassword: string): Observable<any> {
    const payload = {
      user_name: username,
      password: password,
      confirmPassword: confirmPassword
    };
    return this.http.post(`${this.baseUrl}/signup`, payload, httpOptions);
  }
  logout(): void {
    localStorage.removeItem('user');
  }
}

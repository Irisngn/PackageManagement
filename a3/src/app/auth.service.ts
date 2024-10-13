import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = '/Iris/34065016/api/v1';

  constructor(private http: HttpClient, private router: Router) {}

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }

  hasAccount(): boolean {
    return !!localStorage.getItem('accountCreated'); 
  }

  login(username: string, password: string): Observable<any> {
    const payload = { user_name: username, password };
    
    return this.http.post(`${this.baseUrl}/login`, payload, httpOptions).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.router.navigate(['/invalid-data']);
        }
        console.error('Login error occurred:', error);
        return throwError(error);
      })
    );
  }

  signup(username: string, password: string, confirmPassword: string): Observable<any> {
    const payload = {
      user_name: username,
      password: password,
      confirmPassword: confirmPassword
    };
    return this.http.post(`${this.baseUrl}/signup`, payload, httpOptions).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.router.navigate(['/invalid-data']);
        }
        console.error('Signup error occurred:', error);
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/34065016/Iris';  
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  // Create a new driver
  createDriver(driver: any): Observable<any> {
    return this.http.post<any>(API_URL + '/drivers', driver, httpOptions);
  }

  // Get all drivers
  getDrivers(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + '/drivers');
  }

  // Delete a driver by ID
  deleteDriver(id: string): Observable<any> {
    return this.http.delete<any>(API_URL + '/drivers/' + id, httpOptions);
  }

  // Update driver by ID
  updateDriver(id: string, driver: any): Observable<any> {
    return this.http.put<any>(API_URL + '/drivers/' + id, driver, httpOptions);
  }
  getDriverById(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/drivers/${id}`);
  }
  //adding new package
  createPackage(packages: any): Observable<any> {
    return this.http.post<any>(API_URL + '/package', packages, httpOptions);
  }
   // Get all drivers
  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + '/package');
  }
  deletePackage(id: string): Observable<any> {
    return this.http.delete<any>(API_URL + '/package/' + id, httpOptions);
  }
  updatePackage(id: string, packages: any): Observable<any> {
    return this.http.put<any>(API_URL + '/package/' + id, packages, httpOptions);
  }
  getPackageById(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/package/${id}`);
  }
  getStatistics(): Observable<any> {
    return this.http.get<any>(`${API_URL}/statistics`);
  }
}

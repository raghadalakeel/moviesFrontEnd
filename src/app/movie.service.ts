import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { movie } from './movie';
import { environment } from 'src/environments/environment';
@Injectable({providedIn: 'root'})
export class moviesservice{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getLatestMovies(): Observable<movie[]> {
    return this.http.get<movie[]>(`${this.apiServerUrl}/api/movies/latest`);
  }
  public searchMovies(name:string): Observable<movie[]> {
    return this.http.get<movie[]>(`${this.apiServerUrl}/api/movies/search/movieName?name=${name}`);
  }

 public getMovie(MovieId:number): Observable<movie> {
    return this.http.get<movie>(`${this.apiServerUrl}/api/movies/MovieId`);
  }
  

//   public addEmployee(employee: movies): Observable<movie> {
//     return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
//   }

//   public updateEmployee(employee: Employee): Observable<Employee> {
//     return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
//   }

//   public deleteEmployee(employeeId: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
//   }
// 
}
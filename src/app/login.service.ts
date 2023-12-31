import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api2/users/login`, { email, password });
  }
}
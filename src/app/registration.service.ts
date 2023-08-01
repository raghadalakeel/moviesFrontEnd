import { Injectable } from '@angular/core';
import { movieUser } from './movieUser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  
//regestration 
  public addUser(user:movieUser): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api2/users/add?email=${user.email}&firstName=${user.firstName}&lastName=${user.lastName}&password=${user.password}`, { userId: user.id, email:user.email,firstName:user.firstName,lastName:user.lastName,password:user.password });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { movie } from './movie';
import { environment } from 'src/environments/environment';
import { movieUser } from './movieUser';

@Injectable({ providedIn: 'root' })
export class userService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  //view profile
  public getUserByEmail(email: string): Observable<movieUser> {
    return this.http.get<movieUser>(`${this.apiServerUrl}/api2/users/email?email=${email}`);
  }

//   public addUser(user:movieUser): Observable<any> {
//     return this.http.post(`${this.apiServerUrl}/api2/users/add?${user.id}/${user.email}/${user.firstName}/${user.lastName}/${user.password}`, { userId: user.id, email:user.email,firstName:user.firstName,lastName:user.lastName,password:user.password });
//   }


}
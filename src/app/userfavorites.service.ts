import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { movie } from './movie';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class userFavoritesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getFavoriteMovies(userId:number): Observable<movie[]> {
    return this.http.get<movie[]>(`${this.apiServerUrl}/api2/users/favorites/userId?userId=${userId}`);
  }

  public addToFavorites(movieId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/api2/users/favorites/${userId}/${movieId}/add`, { userId: userId, movieId: movieId });
  }

  public removeFromFavorites(movieId: number,userId:number): Observable<any> {
    return this.http.delete(`${this.apiServerUrl}/api2/users/favorites/deleteMovie?userId=${userId}&movieId=${movieId}`);
  }
}

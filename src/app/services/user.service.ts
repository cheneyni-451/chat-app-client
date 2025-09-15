import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private userApiEndpoint = `${environment.apiUrl}/user`;

  login(email: String, password: String): Observable<User> {
    return this.http.post<User>(`${this.userApiEndpoint}/login`, { email, password });
  }
}

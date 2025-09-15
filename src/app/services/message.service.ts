import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/message.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http = inject(HttpClient);
  private apiEndpoint = `${environment.apiUrl}`;
  private messageApiEndpoint = `${this.apiEndpoint}/messages`;

  sendMessage(roomId: number, userId: number, content: string): Observable<Message> {
    return this.http.post<Message>(
      this.messageApiEndpoint,
      { roomId, userId, content },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
  }
}

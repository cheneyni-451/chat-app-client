import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Room } from '../models/room.models';
import { Message } from '../models/message.models';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private http = inject(HttpClient);
  private apiEndpoint = `${environment.apiUrl}`;
  private roomApiEndpoint = `${this.apiEndpoint}/rooms`;

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomApiEndpoint, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  getRoomById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.roomApiEndpoint}/id`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  createRoom(roomName: string): Observable<number | null> {
    return this.http.post<number | null>(
      `${this.apiEndpoint}/room`,
      { name: roomName, ownerId: 1 },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  getRoomMessages(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.roomApiEndpoint}/${id}/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}

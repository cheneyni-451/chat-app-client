import { Component, effect, inject, signal } from '@angular/core';
import { HousingLocationInfo } from '../housinglocation';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { Room } from '../models/room.models';
import { Message } from '../models/message.models';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { User } from '../models/user.models';
import { socket } from '../../main';
import { Messenger } from './messenger/messenger';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, Messenger],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  userService: UserService = inject(UserService);
  roomService: RoomService = inject(RoomService);
  messageService: MessageService = inject(MessageService);

  housingLocationList: HousingLocationInfo[] = [];
  filteredLocationList: HousingLocationInfo[] = [];
  userInfo: User = {
    id: 0,
    name: null,
    email: '',
    token: '',
  };
  rooms = signal<Room[]>([]);
  currentRoomIndex = signal<number>(0);
  messages = signal<Message[]>([]);

  messageForm = new FormGroup({
    content: new FormControl(''),
  });

  constructor() {
    this.userService.login('mail@mail.com', 'password').subscribe((data) => {
      this.userInfo = data;
      localStorage.setItem('token', data.token);
      this.updateRoomList();
      if (this.rooms().length > 0) {
        this.currentRoomIndex.set(0);
      }
    });

    effect(() => {
      const index = this.currentRoomIndex();
      if (this.rooms().length === 0) {
        return;
      }
      const room = this.rooms()[index];
      this.roomService.getRoomMessages(room.id).subscribe((data) => {
        this.messages.set(data);
      });
    });

    socket.on('chat message', (message: Message, ack: (response: boolean) => void) => {
      this.messages.update((msgs) => [...msgs, message]);
      if (ack) {
        ack(true);
      }
    });
  }

  createRoom() {
    this.roomService.createRoom(`new room ${new Date().getMilliseconds()}`).subscribe((data) => {
      this.updateRoomList();
    });
  }

  updateRoomList() {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms.set(data);
    });
  }

  selectRoom(roomIndex: number) {
    const currentRoomId = this.rooms()[this.currentRoomIndex()].id;
    socket.emit('leave room', currentRoomId);
    this.currentRoomIndex.set(roomIndex);
    const newRoomId = this.rooms()[this.currentRoomIndex()].id;
    socket.emit('join room', newRoomId);
  }

  sendMessage() {
    const roomId = this.rooms()[this.currentRoomIndex()].id;
    if ((this.messageForm.value.content?.length ?? 0) > 0) {
      this.messageService
        .sendMessage(roomId, this.userInfo.id, this.messageForm.value.content!)
        .subscribe(console.log);
    }
  }
}

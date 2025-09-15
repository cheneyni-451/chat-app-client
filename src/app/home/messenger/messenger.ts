import { Component, computed, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';
import { Message } from '../../models/message.models';
import { socket } from '../../../main';
import { User } from '../../models/user.models';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-messenger',
  imports: [ReactiveFormsModule],
  templateUrl: './messenger.html',
  styleUrl: './messenger.scss',
})
export class Messenger {
  messageService: MessageService = inject(MessageService);
  roomService: RoomService = inject(RoomService);

  roomId = input<number>(-1);
  userInfo = input<User>({
    id: 0,
    name: null,
    email: '',
    token: '',
  });

  messages: Message[] = [];

  messageForm = new FormGroup({
    content: new FormControl(''),
  });

  constructor() {
    socket.on('chat message', (message: Message, ack: (response: boolean) => void) => {
      this.messages.update((msgs) => [...msgs, message]);
      if (ack) {
        ack(true);
      }
    });

    this.roomService.getRoomMessages(this.roomId()).subscribe((msgs) => {
      this.messages.set(msgs);
    });
  }

  sendMessage() {
    if ((this.messageForm.value.content?.length ?? 0) > 0) {
      this.messageService
        .sendMessage(this.roomId(), this.userInfo().id, this.messageForm.value.content!)
        .subscribe(console.log);
    }
  }
}

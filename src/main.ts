import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { io } from 'socket.io-client';

export const socket = io('ws://localhost:3000', {
  ackTimeout: 10000,
  retries: 3,
});

socket.on('connect', () => {
  console.log('WebSocket connected');
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

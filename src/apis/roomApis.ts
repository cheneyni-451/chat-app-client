import type { MessageDetail } from "../models/messageModels";
import type { Room, RoomWithMemberCount } from "../models/roomModels";

export type MessageInput = {
  roomId: number;
  userId: number;
  content: string;
};

const ROOM_API_ENDPOINT = `${import.meta.env.VITE_BACKEND_ENDPOINT}/rooms`;

export async function getRooms(
  authToken: string
): Promise<RoomWithMemberCount[]> {
  const res = await fetch(ROOM_API_ENDPOINT, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await res.json();
}

export async function getRoomById(
  authToken: string,
  roomId: number
): Promise<Room | null> {
  const res = await fetch(`${ROOM_API_ENDPOINT}/${roomId}`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}

export async function getMessagesForRoom(
  authToken: string,
  roomId: number
): Promise<MessageDetail[]> {
  const res = await fetch(`${ROOM_API_ENDPOINT}/${roomId}/messages`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return await res.json();
}

export async function createRoom(
  authToken: string,
  roomName: string,
  ownerId: number
): Promise<number | null> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/room`, {
    method: "POST",
    body: JSON.stringify({ name: roomName, ownerId }),
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (res.ok) {
    return (await res.json()).id;
  }
  return null;
}

export async function createMessage(
  authToken: string,
  messageInput: MessageInput
): Promise<MessageDetail | null> {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_ENDPOINT}/messages`, {
    method: "POST",
    body: JSON.stringify(messageInput),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (res.ok) {
    return await res.json();
  }
  return null;
}

import type { User } from "./userModels";

export type MessageDetail = {
  id: number;
  content: string;
  createdAt: Date;
  roomId: number;
  user: Omit<User, "token">;
};

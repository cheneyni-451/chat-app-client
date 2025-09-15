import { User } from './user.models';

export interface Message {
  readonly id: number;
  readonly content: string;
  readonly createdAt: Date;
  readonly roomId: number;
  readonly user: Pick<User, 'id' | 'name' | 'email'>;
}

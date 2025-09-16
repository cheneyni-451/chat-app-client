export type Room = {
  id: number;
  ownerId: number;
  name: string;
};

export type RoomWithMemberCount = Room & {
  memberCount: number;
};

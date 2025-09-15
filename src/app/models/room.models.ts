export interface Room {
  readonly name: string;
  readonly id: number;
  readonly ownerId: number;
  readonly memberCount: number;
}

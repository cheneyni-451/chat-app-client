export interface User {
  readonly name: string | null;
  readonly email: string;
  readonly id: number;
  readonly token: string;
}

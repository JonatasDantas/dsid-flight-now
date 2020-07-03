export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
  credits: number;
  born_date: Date;
}

export interface UserPut {
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  born_date?: Date;
}
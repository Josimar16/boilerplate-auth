export class IUserModel {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at?: Date;
}
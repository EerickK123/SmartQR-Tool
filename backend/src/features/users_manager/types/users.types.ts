import { ResultSetHeader, RowDataPacket } from "mysql2";

export interface readedUsersRow extends RowDataPacket {
  user_id: number;
  role: string;
  document_id: string;
  user_name: string;
}

export interface addUserDTO {
  role: number;
  document: number;
  password: string;
  userName: string;
}

export interface deletedUser extends ResultSetHeader{
  user_id: number;
}

export interface bulkDeleteDTO {
  bulk : number[]  
}

export interface updatedUserData extends RowDataPacket {
  user_id: number;
  role: string;
  document_id: string;
  password: string;
  user_name: string;
}
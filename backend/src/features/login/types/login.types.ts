import { RowDataPacket } from "mysql2";

export interface loginRequestDTO {
  document: number;
  password: string;
}

export interface UserRow extends RowDataPacket {
  user_id: number;
  role: string;
  document_id: number;
  password: string;
  user_name: string;
  status: number;
}
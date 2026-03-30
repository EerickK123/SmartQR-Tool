import { RowDataPacket } from "mysql2";

export interface loginRequestDTO {
    document: number;
    password: string;
}

export interface loginResponseDTO {
    success: boolean;
    result: Record<string, any>;
    message: string | null;
}


export interface UserRow extends RowDataPacket {
  users_id: number;
  role: number;
  document_id: number;
  password: string;
  user_name: string;
  status: number;
}
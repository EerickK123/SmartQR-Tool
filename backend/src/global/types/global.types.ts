declare global {
  namespace Express {
    interface Request {
      user: any
    }
  }
}

export interface ApiResponse<T> {
  success: boolean;
  result: T;
  message: string;
}

export enum systemActions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum entityTypes {
  USER = "USER",
  QR_CODE = "QR_CODE",
  PRODUCT = "PRODUCT",
  LOT = "LOT",
  UNIT = "UNIT",
}

export interface JwtPayload {
  user_id: number;  
  role: number;
  document: number;
  user_name: string;
}
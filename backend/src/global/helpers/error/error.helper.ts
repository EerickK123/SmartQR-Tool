export const throwErrorHelper = (message: string, status: number) => {
  const error: any = new Error(message);
  error.status = status;
  throw error;
};
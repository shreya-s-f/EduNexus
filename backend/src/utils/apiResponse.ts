import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: any,
  message: string = 'Operation successful',
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string = 'Operation failed',
  statusCode: number = 400,
  errors: any = null
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

import { Response } from "express";

export const sendDefaultError = (err: unknown, res: Response) => {
  const error = err as { message: string };
  res.status(404).json({
    message: error.message,
  });
}
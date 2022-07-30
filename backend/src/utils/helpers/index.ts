import { JwtUserPayload } from "@utils/types/interfaces";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const sendDefaultError = (err: unknown, res: Response) => {
  const error = err as { message: string };
  res.status(404).json({
    message: error.message,
  });
};

export const getUserFromJwt: (token: string) => JwtUserPayload = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtUserPayload;
};

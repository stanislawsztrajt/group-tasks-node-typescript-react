import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Iuser } from "../models";
import { TypedRequest } from "@utils/types";
import { saltRounds } from '@utils/constants'

export const hashPassword = (
  req: TypedRequest<Iuser>,
  res: Response,
  next: NextFunction
) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  next();
};

interface JwtPayload {
  user: Iuser
};

export const verifyUser = (
  req: TypedRequest<Iuser>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if(typeof req.token === 'undefined') return res.sendStatus(401)
    const { user } = jwt.verify(req.token, process.env.JWT_SECRET as string) as JwtPayload
    if (user._id !== id) return res.sendStatus(401);

    next();
  } catch {
    res.sendStatus(401);
  }
};
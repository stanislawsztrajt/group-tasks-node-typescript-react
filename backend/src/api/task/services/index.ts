import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

import Task, { Itask } from "@api/task/models";
import { Iuser } from "@api/user/models";
import { TypedRequest } from "@utils/types";

interface JwtPayload {
  user: Iuser
};

export const verifyOwner = async (
  req: TypedRequest<Itask>,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    if(typeof req.token === 'undefined') return res.sendStatus(401)
    const { authorId, solversIds } = await Task.findById(id) as Itask;
    const { user } = jwt.verify(req.token, process.env.JWT_SECRET as string) as JwtPayload
    if (user._id !== authorId || solversIds?.includes(user._id)) return res.sendStatus(401);

    next();
  } catch {
    res.sendStatus(401);
  }
};
import { Response, NextFunction } from "express";

import Group, { Igroup } from "../models";
import { TypedRequest } from "@utils/types";
import { getUserFromJwt, sendDefaultError } from "@utils/helpers";

export const verifyAdmin = async (
  req: TypedRequest<Igroup>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { adminId } = (await Group.findById(id)) as Igroup;
    const { user } = getUserFromJwt(req.token as string);
    if (user._id !== adminId) return res.sendStatus(401);

    next();
  } catch {
    res.sendStatus(401);
  }
};

export const verifyUsers = async (
  req: TypedRequest<Igroup>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { adminId, usersIds } = (await Group.findById(id)) as Igroup;
    const { user } = getUserFromJwt(req.token as string);

    if (adminId === user._id) return next();
    if (!usersIds?.includes(user._id)) return res.sendStatus(401);
    next();
  } catch (err) {
    sendDefaultError(err, res);
  }
};

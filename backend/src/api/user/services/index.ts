import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import { Iuser } from "../models";
import { TypedRequest } from "@utils/types";
import { saltRounds } from "@utils/constants";
import { getUserFromJwt, sendDefaultError } from "@utils/helpers";

export const hashPassword = (
  req: TypedRequest<Iuser>,
  res: Response,
  next: NextFunction
) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  next();
};

export const verifyUser = (
  req: TypedRequest<Iuser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { user } = getUserFromJwt(req.token as string);
    if (user._id !== id) return res.sendStatus(401);

    next();
  } catch(err) {
    sendDefaultError(err, res);
  }
};

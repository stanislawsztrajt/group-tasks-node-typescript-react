import { Response, NextFunction } from "express";

import { Itask } from "@api/task/models";
import { Iuser } from "@api/user/models";
import { Igroup } from "@api/group/models";
import { TypedRequest } from "@utils/types";

export const verifyToken = (
  req: TypedRequest<Iuser | Itask | Igroup>,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

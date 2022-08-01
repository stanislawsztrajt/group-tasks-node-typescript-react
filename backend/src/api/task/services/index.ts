import { Response, NextFunction } from "express";

import Group, { Igroup } from "@api/group/models";
import Task, { Itask } from "@api/task/models";
import { TypedRequest } from "@utils/types";
import { getUserFromJwt, sendDefaultError } from "@utils/helpers";

export const verifyOwner = async (
  req: TypedRequest<Itask>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      authorId,
      solversIds,
      groupId
    } = (await Task.findById( id )) as Itask;
    const { adminId } = (await Group.findOne({ _id: groupId })) as Igroup;
    const { user } = getUserFromJwt(req.token as string);

    if(authorId === user._id) return next()
    if(adminId === user._id) return next()

    if (
      !solversIds?.includes(user._id)
    )
      return res.sendStatus(401);


    next();
  } catch(err) {
    sendDefaultError(err, res);
  }
};

import { Response, Request } from "express";
import Entity, { Igroup } from "../models";
import { TypedRequest } from "@utils/types";
import { getUserFromJwt, sendDefaultError } from "@utils/helpers";
import User, { Iuser } from "@api/user/models";
import Task, { Itask } from "@api/task/models";

export const getUserGroups = async (
  req: TypedRequest<Igroup>,
  res: Response
) => {
  try {
    const { user } = getUserFromJwt(req.token as string);
    const entities = (await Entity.find({ usersIds: user._id })) as Igroup[];

    res.status(200).json(entities);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const getAdminGroups = async (
  req: TypedRequest<Igroup>,
  res: Response
) => {
  try {
    const { user } = getUserFromJwt(req.token as string);
    const entities = (await Entity.find({
      adminId: { $eq: user._id },
    })) as Igroup[];

    res.status(200).json(entities);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const getGroupUsers = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const { adminId, usersIds } = (await Entity.findById(_id)) as Igroup;

    const userAdmin = (await User.findById(adminId)) as Iuser;
    const users = (await User.find({ _id: { $in: usersIds } })) as Iuser[];

    users.unshift(userAdmin);

    res.status(200).json(users);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const getGroupTasks = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const tasks = (await Task.find({ groupId: _id })) as Itask[];

    res.status(200).json(tasks);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const entities = (await Entity.find()) as Igroup[];
    res.status(200).json(entities);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const create = async (req: TypedRequest<Igroup>, res: Response) => {
  try {
    const entity = new Entity({ ...req.body, createdAt: new Date() });
    const newEntity = await entity.save();
    res.status(200).json(newEntity);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const get = async (req: TypedRequest<Igroup>, res: Response) => {
  try {
    const id = req.params.id;
    const entity = (await Entity.findById(id)) as Igroup;
    res.status(200).json(entity);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const update = async (req: TypedRequest<Igroup>, res: Response) => {
  try {
    const _id = req.params.id;
    const entity = (await Entity.findByIdAndUpdate(_id, req.body)) as Igroup;
    const updatedEntity = Object.assign(entity, req.body);

    res.status(200).json(updatedEntity);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const remove = async (req: TypedRequest<Igroup>, res: Response) => {
  try {
    const _id = req.params.id;
    const entity = (await Entity.findByIdAndDelete(_id)) as Igroup;
    res.status(200).json(entity);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

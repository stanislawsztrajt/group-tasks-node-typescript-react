import { Response, Request } from "express";
import Entity, { Itask } from "../models";
import { TypedRequest } from "@utils/types";
import { getUserFromJwt, sendDefaultError } from "@utils/helpers";
import User, { Iuser } from "@api/user/models";


export const getAuthorTasks = async (
  req: TypedRequest<Itask>,
  res: Response
) => {
  try {
    const { user } = getUserFromJwt(req.token as string);
    const entities = (await Entity.find({ authorId: user._id })) as Itask[];

    res.status(200).json(entities);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const getUserTasks = async (
  req: TypedRequest<Itask>,
  res: Response
) => {
  try {
    const { user } = getUserFromJwt(req.token as string);
    const entities = (await Entity.find({ solversIds: user._id })) as Itask[];

    res.status(200).json(entities);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const getTaskUsers = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { authorId, solversIds } = (await Entity.findById(id)) as Itask;
    
    const taskAuthor = await User.findById(authorId) as Iuser
    const solvers = await User.find({ _id: { $in: solversIds } }) as Iuser[]
    
    solvers.unshift(taskAuthor);

    res.status(200).json(solvers);
  } catch (err) {
    sendDefaultError(err, res);
  }
};


export const getAll = async (req: Request, res: Response) => {
  try {
    const entities = (await Entity.find()) as Itask[];
    res.status(200).json(entities);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const create = async (req: TypedRequest<Itask>, res: Response) => {
  try {
    const entity = new Entity({...req.body, createdAt: new Date()});
    const newEntity = await entity.save();
    res.status(200).json(newEntity);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const entity = (await Entity.findById(id)) as Itask;
    res.status(200).json(entity);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const update = async (req: TypedRequest<Itask>, res: Response) => {
  try {
    const _id = req.params.id;
    const entity = (await Entity.findByIdAndUpdate(_id, req.body)) as Itask;
    const updatedEntity = Object.assign(entity, req.body);

    res.status(200).json(updatedEntity);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

export const remove = async (req: TypedRequest<Itask>, res: Response) => {
  try {
    const _id = req.params.id;
    const entity = (await Entity.findByIdAndDelete(_id)) as Itask;
    res.status(200).json(entity);
  } catch (err) {
    sendDefaultError(err, res);
  }
};

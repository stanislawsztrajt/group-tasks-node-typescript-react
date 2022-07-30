import { Response, Request } from "express";

import Entity, { Iuser } from "../models";
import { TypedRequest } from "@utils/types";
import { sendDefaultError } from "@utils/helpers";

export const get = async (req: Request, res: Response) => {
  try {
    const entities = (await Entity.find()) as Iuser[];
    res.status(200).json(entities);
  } catch (err) {
    sendDefaultError(err, res)
  }
};

export const create = async (req: TypedRequest<Iuser>, res: Response) => {
  try {
    const entity = new Entity(req.body);
    const newEntity = await entity.save();
    res.status(200).json(newEntity);
  } catch (err) {
    sendDefaultError(err, res)
  }
};

export const getAll = async (req: TypedRequest<Iuser>, res: Response) => {
  try {
    const id = req.params.id;
    const entity = (await Entity.findById(id)) as Iuser;
    res.status(200).json(entity);
  } catch (err) {
    sendDefaultError(err, res)
  }
};

export const update = async (req: TypedRequest<Iuser>, res: Response) => {
  try {
    const _id = req.params.id;
    const entity = (await Entity.findByIdAndUpdate(_id, req.body)) as Iuser;
    const updatedEntity = Object.assign(entity, req.body);

    res.status(200).json(updatedEntity);
  } catch (err) {
    sendDefaultError(err, res)
  }
};

export const remove = async (req: TypedRequest<Iuser>, res: Response) => {
  try {
    const _id = req.params.id;
    const entity = (await Entity.findByIdAndDelete(_id)) as Iuser;
    res.status(200).json(entity);
  } catch (err) {
    sendDefaultError(err, res)
  }
};

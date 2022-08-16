import { TtaskPiority, TtaskStatus, TtaskType } from "types";

export interface Iuser {
  _id: string;
  name: string;
  email: string;
}

export interface IuserLogin extends Iuser {
  password: string;
}

export interface IsignUpValues {
  name: string;
  email: string;
  password: string;
  repeatedPassword: string;
}

export interface IsignUp {
  name: string;
  email: string;
  password: string;
}

export interface IloginValues {
  email: string;
  password: string;
}

export interface ItaskData {
  title: string;
  description: string;
  authorId: string;
  groupId: string;
  solversIds?: string[];
  piority: TtaskPiority;
  type: TtaskType;
  status: TtaskStatus;
}

export interface Itask extends ItaskData {
  _id: string;
  createdAt: Date | string;
}

export interface IgroupData {
  adminId: string;
  usersIds?: string[];
  name: string;
  description: string;
}

export interface Igroup extends IgroupData {
  _id: string;
  createdAt: Date;
}

export interface Iresponse<T> {
  data: T;
}

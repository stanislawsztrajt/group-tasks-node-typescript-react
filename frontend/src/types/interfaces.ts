export interface Iuser {
  _id: string;
  name: string;
  email: string;
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

export interface Itask {
  _id: string;
  title: string;
  description: string;
  createdAt: Date | string;
  authorId: string;
  groupId?: string;
  solversIds?: string[];
  piority: "small" | "normal" | "high";
  type: "bug" | "update" | "creation";
  status: "pending" | "fulfilled" | "unfulfilled";
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

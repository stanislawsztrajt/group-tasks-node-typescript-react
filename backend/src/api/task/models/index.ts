import { Schema, model } from "mongoose";

export interface Itask {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  authorId: string;
  groupId?: string;
  solversIds?: string[];
  piority: "small" | "normal" | "high";
  type: "bug" | "update" | "creation";
  status: "pending" | "fulfilled" | "unfulfilled";
}

const taskSchema = new Schema<Itask>({
  title: {
    type: String,
    minLength: 4,
    maxLength: 150,
    required: true,
  },
  description: {
    type: String,
    minLength: 4,
    maxLength: 1000,
    required: true,
  },
  createdAt: {
    type: Date,
    minLength: 4,
    maxLength: 100,
    required: true,
  },
  type: {
    type: String,
    minLength: 1,
    maxLength: 50,
    required: true,
  },
  status: {
    type: String,
    minLength: 5,
    maxLength: 15,
    required: true,
  },
  authorId: {
    type: String,
    minLength: 4,
    maxLength: 100,
    required: true,
  },
  groupId: {
    type: String,
    maxLength: 100,
  },
  piority: {
    type: String,
    minLength: 3,
    maxLength: 7,
    required: true,
  },
  solversIds: {
    type: [String],
    maxLength: 25,
  },
});

const Task = model("Task", taskSchema);
export default Task;

import { Schema, model } from "mongoose";

export interface Igroup {
  _id: string;
  adminId: string;
  usersIds?: string[];
  name: string;
  description: string;
}

const taskSchema = new Schema<Igroup>({
  adminId: {
    type: String,
    minLength: 4,
    maxLength: 100,
    required: true,
  },
  usersIds: {
    type: [String],
    maxLength: 100,
  },
  name: {
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
});

const Group = model("Group", taskSchema);
export default Group;

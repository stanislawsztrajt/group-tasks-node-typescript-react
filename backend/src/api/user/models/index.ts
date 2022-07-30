import { Schema, model } from "mongoose";

export interface Iuser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<Iuser>({
  name: {
    type: String,
    unique: true,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    minLength: 3,
    maxLength: 30,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
    private: true,
  },
});

const User = model("User", userSchema);
export default User;

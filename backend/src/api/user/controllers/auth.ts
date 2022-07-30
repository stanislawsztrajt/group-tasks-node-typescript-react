import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Response } from "express";

import User, { Iuser } from "../models";
import { TypedRequest } from "@utils/types";

export const signIn = async (req: TypedRequest<Iuser>, res: Response) => {
  const { email, password } = req.body;
  const user: Iuser | null = await User.findOne({ email });
  const unhashedPassword: boolean | null = user
    ? bcrypt.compareSync(password, user.password)
    : null;

  if (!email || !password || !user || !unhashedPassword) {
    return res
      .status(401)
      .json({ message: "email or/and password is/are incorrect" });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
  res.status(200).json({ jwt: token, user });
};
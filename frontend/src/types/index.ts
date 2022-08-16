import { FC, PropsWithChildren } from "react";

// FC type with children
export type FCC<P = {}> = FC<PropsWithChildren<P>>;

export type TtaskPiority = "small" | "normal" | "high";
export type TtaskType = "bug" | "update" | "creation";
export type TtaskStatus = "pending" | "fulfilled" | "unfulfilled";

export type TresponseStatus = () => Promise<"success" | "error">
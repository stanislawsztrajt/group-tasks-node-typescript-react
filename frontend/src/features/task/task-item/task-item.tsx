import React, { FC } from "react";
import { Itask } from "types/interfaces";

interface Props {
  task: Itask;
}

const TaskItem: FC<Props> = ({ task }) => {
  const { authorId, createdAt, description, groupId, piority, solversIds, status, title } = task;

  return (
    <div>
      <div>{authorId}</div>
      <div>{String(createdAt)}</div>
      <div>{description}</div>
      <div>{groupId}</div>
      <div>{piority}</div>
      <div>{solversIds}</div>
      <div>{status}</div>
      <div>{title}</div>
    </div>
  );
};

export default TaskItem;

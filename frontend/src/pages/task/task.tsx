import React, { FC } from "react";
import useTasks from "./use-task";

const Task: FC = () => {
  const { task, solvers } = useTasks();
  const { authorId, createdAt, description, piority, status, title, type } =
    task;

  const solversList = solvers.map(({ name, email, _id }) => {
    return (
      <div key={_id}>
        {name}
        {email}
      </div>
    );
  });

  return (
    <div>
      edit, delete task as component
      <div>
        solvers
        {solversList}
      </div>
      {authorId}
      {String(createdAt)}
      {description}
      {piority}
      {status}
      {title}
      {type}
    </div>
  );
};

export default Task;

import React, { FC } from "react";

import useGroup from "./use-group";

import TaskList from "@features/task/task-list";

const Group: FC = () => {
  const { group, tasks, users } = useGroup();
  const { adminId, createdAt, description, name, usersIds } = group;

  const usersList = users.map(({ name, email, _id }) => {
    return (
      <div key={_id}>
        {name}
        {email}
      </div>
    );
  });

  return (
    <div>
      edit, delete group and task as component create task as component
      <TaskList tasks={tasks} text="Tasks of group" />
      {usersList}
      {adminId}
      {String(createdAt)}
      {description}
      {name}
      {usersIds}
    </div>
  );
};

export default Group;

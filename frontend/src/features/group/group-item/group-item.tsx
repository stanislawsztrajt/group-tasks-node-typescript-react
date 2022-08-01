import React, { FC } from "react";
import { Igroup } from "types/interfaces";

interface Props {
  group: Igroup;
}

const GroupList: FC<Props> = ({ group }) => {
  const { name, description, adminId, usersIds, createdAt } = group;

  return (
    <div>
      <div>{String(createdAt)}</div>
      <div>{name}</div>
      <div>{description}</div>
      <div>{adminId}</div>
      <div>{usersIds}</div>
    </div>
  );
};

export default GroupList;

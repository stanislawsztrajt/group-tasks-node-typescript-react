import React, { FC } from "react";
import { Igroup } from "types/interfaces";
import GroupItem from "../group-item";

interface Props {
  groups: Igroup[];
}

const GroupList: FC<Props> = ({ groups }) => {
  return (
    <div>
      {groups.map((group) => (
        <GroupItem key={group._id} group={group} />
      ))}
    </div>
  );
};

export default GroupList;

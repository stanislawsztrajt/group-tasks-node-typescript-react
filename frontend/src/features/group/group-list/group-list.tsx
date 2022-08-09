import React, { FC } from "react";

import { Igroup } from "types/interfaces";

import GroupItem from "../group-item";

interface Props {
  groups: Igroup[];
  text: string;
}

const GroupList: FC<Props> = ({ groups, text }) => {
  const groupsList = groups.map((group) => <GroupItem key={group._id} group={group} />);

  return (
    <div>
      <div className="mt-10 text-3xl font-medium text-center text-indigo-600 uppercase">{text}</div>
      {groups.length < 1 ? (
        <div className="text-lg text-center">You dont have any groups</div>
      ) : (
        groupsList
      )}
    </div>
  );
};

export default GroupList;

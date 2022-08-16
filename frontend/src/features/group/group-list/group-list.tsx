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
    <>
      <div className="p-4 mt-10 text-3xl font-medium text-center text-indigo-800 uppercase bg-white rounded-lg shadow-lg">
        {text}
      </div>
      {groups.length < 1 ? (
        <div className="text-lg text-center">You dont have any groups</div>
      ) : (
        <div className="flex flex-col items-center">{groupsList}</div>
      )}
    </>
  );
};

export default GroupList;

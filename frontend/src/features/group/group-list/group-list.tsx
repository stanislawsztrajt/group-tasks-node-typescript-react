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
      <div className="p-10 mt-10 text-3xl font-medium text-center bg-white rounded-lg shadow">
        {text}
      </div>
      {groups.length < 1 ? (
        <div className="mt-3 text-2xl text-center">You don&apos;t have any groups</div>
      ) : (
        <div className="flex flex-col items-center">{groupsList}</div>
      )}
    </>
  );
};

export default GroupList;

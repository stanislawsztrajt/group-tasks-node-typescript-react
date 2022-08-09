import React, { FC } from "react";
import { Link } from "react-router-dom";

import { user } from "constants/index";
import { modalDelete } from "helpers/api";
import { Igroup } from "types/interfaces";

import useGroupItem from "./use-group-item";
import GroupForm from "@features/group/group-form";
import { HandleModal } from "@features/ui";

interface Props {
  group: Igroup;
}

const GroupList: FC<Props> = ({ group }) => {
  const { name, description, adminId, createdAt, _id } = group;
  const { admin, deleteGroup } = useGroupItem(group);

  return (
    <>
      <Link to={`/groups/${_id}`}>
        <div className="mt-8 group-task-item">
          <div className="text-xs font-light ">{String(createdAt)}</div>
          <div className="text-xl font-medium">{name}</div>
          <div className="text-base">{description}</div>
          <div className="text-sm font-bold">
            {adminId === user._id ? <>You are admin</> : <>{admin?.name} is admin</>}
          </div>
        </div>
      </Link>
      {user._id === adminId ? (
        <>
          <button className="p-2 bg-red-500" onClick={() => modalDelete(deleteGroup)}>
            Delete
          </button>
          <HandleModal Modal={<GroupForm group={group}/>} buttonText="edit" />
        </>
      ) : null}
    </>
  );
};

export default GroupList;

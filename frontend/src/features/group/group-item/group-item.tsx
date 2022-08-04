import { user } from "constants/index";
import { modalDelete } from "helpers/api";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Igroup } from "types/interfaces";
import useGroupItem from "./use-group-item";

interface Props {
  group: Igroup;
}

const GroupList: FC<Props> = ({ group }) => {
  const { name, description, adminId, createdAt, _id } = group;
  const { admin, deleteGroup } = useGroupItem(group)  

  return (
    <Link to={`/groups/${_id}`}>
      { user._id === adminId ?
        <>
          <div>
            Edit
          </div>
          <div onClick={() => modalDelete(deleteGroup)}>
            Delete
          </div>
        </>
      : null }
        
      <div className="mt-8 group-task-item">
        <div className="text-xs font-light ">{String(createdAt)}</div>
        <div className="text-xl font-medium">{name}</div>
        <div className="text-base">{description}</div>
        <div className="text-sm font-bold">
          {adminId === user._id ? (
            <>You are admin</>
          ) : (
            <>{admin?.name} is admin</>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GroupList;

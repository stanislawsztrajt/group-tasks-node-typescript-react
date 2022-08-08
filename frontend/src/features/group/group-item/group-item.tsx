import { user } from "constants/index";
import { modalDelete } from "helpers/api";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Igroup } from "types/interfaces";
import useGroupItem from "./use-group-item";
import GroupForm from '@features/group/group-form';

interface Props {
  group: Igroup;
}

const GroupList: FC<Props> = ({ group }) => {
  const { name, description, adminId, createdAt, _id } = group;
  const { admin, deleteGroup } = useGroupItem(group)  
  const [isEditModal, setIsEditModal] = useState<boolean>(false)

  return (
    <>
      { isEditModal ?
        <>
          <div onClick={() => setIsEditModal(false)} className="fixed z-50 ml-48 bg-red-500 left-3/4">Close modal</div>
          <GroupForm group={group} />
        </>
      : null }
    
      <Link to={`/groups/${_id}`}>
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
          { user._id === adminId ?
            <Link to={''}>
              <button onClick={() => setIsEditModal(!isEditModal)} className="p-2 bg-blue-500">
                Edit
              </button>
              <button className="p-2 bg-red-500" onClick={() => modalDelete(deleteGroup)}>
                Delete
              </button>
            </Link>
          : null }
        </div>
      </Link>
    </>
  );
};

export default GroupList;

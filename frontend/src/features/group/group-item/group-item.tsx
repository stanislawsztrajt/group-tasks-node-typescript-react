import React, { FC } from "react";
import { Link } from "react-router-dom";

import { user } from "constants/index";
import { Igroup } from "types/interfaces";

import useGroupItem from "./use-group-item";
import GroupForm from "@features/group/group-form";
import { TaskForm } from "@features/task";
import { HandleModal, DeleteButton } from "@features/ui";
import { faCirclePlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface Props {
  group: Igroup;
}

const GroupList: FC<Props> = ({ group }) => {
  const { name, description, adminId, createdAt, _id } = group;
  const { admin, deleteGroup } = useGroupItem(group);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <div className="group-task-item">
        <Link to={`/groups/${_id}`}>
          <div className="text-xs font-light ">{String(createdAt)}</div>
          <div className="text-xl font-medium">{name}</div>
          <div className="text-base">{description}</div>
          <div className="text-sm font-bold">
            {adminId === user._id ? <>You are admin</> : <>{admin?.name} is admin</>}
          </div>
        </Link>
      </div>
      {user._id === adminId ? (
        <div>
          <DeleteButton deleteMethod={deleteGroup} />
          <HandleModal
            className="text-white duration-100 bg-blue-600 hover:bg-blue-700"
            Modal={<GroupForm group={group} />}
            buttonText="edit"
            icon={faPenToSquare}
          />
          <HandleModal
            className="text-white duration-100 bg-green-600 hover:bg-green-700"
            Modal={<TaskForm groupId={group._id} />}
            buttonText="Create Task in group"
            icon={faCirclePlus}
          />
        </div>
      ) : null}
    </div>
  );
};

export default GroupList;

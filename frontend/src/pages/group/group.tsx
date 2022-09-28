import React, { FC } from "react";

import useGroup from "./use-group";

import useGroupItem from "@features/group/group-item/use-group-item";
import { user } from "constants/index";
import { GroupForm } from "@features/group";
import { TaskForm, TaskList } from "@features/task";
import { HandleModal, DeleteButton } from "@features/ui";
import { faCirclePlus, faPenToSquare, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Group: FC = () => {
  const { group, tasks, users, admin } = useGroup();
  const { deleteGroup } = useGroupItem(group);
  const { adminId, createdAt, description, name } = group;

  const usersList = users.map(({ name, _id }) => {
    return <div key={_id}>{name}</div>;
  });

  return (
    <>
      <div className="p-4 mt-10 text-3xl font-medium text-center text-indigo-800 uppercase bg-white rounded-lg shadow-lg">
        {name}
      </div>

      <div className="flex flex-row justify-center mt-2">
        {user._id === adminId ? (
          <>
            <DeleteButton deleteMethod={deleteGroup} />
            <HandleModal
              className="text-white duration-100 bg-blue-600 hover:bg-blue-700"
              Modal={<GroupForm group={group} />}
              buttonText="edit"
              icon={faPenToSquare}
            />
          </>
        ) : null}
        <HandleModal
          className="text-white duration-100 bg-green-600 hover:bg-green-700"
          Modal={<TaskForm groupId={group._id} />}
          buttonText="Create Task in group"
          icon={faCirclePlus}
        />
      </div>
      <div className="group-task-top-box">
        <div className="mt-24 group-task-middle-box">
          <TaskList tasks={tasks} text="Tasks of group" />
        </div>
        <div className="mt-24 group-task-middle-box">
          <div className="p-4 mt-10 bg-white rounded-lg shadow-lg">
            <div className="text-xl font-bold">Admin is {admin.name}</div>
            <div className="text-2xl">{name}</div>
            <div className="text-sm font-thin">{String(createdAt)}</div>
            <p>{description}</p>
            <div className="mt-4">
              <div className="text-xl">
                <FontAwesomeIcon icon={faUsers} /> USERS
              </div>
              <div className="ml-4 text-base">{usersList}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Group;

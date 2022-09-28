import { TaskForm } from "@features/task";
import { faPenToSquare, faUsers } from "@fortawesome/free-solid-svg-icons";
import React, { FC } from "react";

import useTasks from "./use-task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DeleteButton, HandleModal } from "@features/ui";
import { user } from "constants/index";

const Task: FC = () => {
  const { task, solvers, author, deleteTask, adminId } = useTasks();
  const { createdAt, description, piority, status, title, type, groupId, solversIds, authorId } =
    task;

  const solversList = solvers.map(({ name, email, _id }) => {
    return (
      <div key={_id}>
        {name}
        {email}
      </div>
    );
  });

  return (
    <div>
      <>
        <div className="p-4 mt-10 text-3xl font-medium text-center text-indigo-800 uppercase bg-white rounded-lg shadow-lg">
          {title}
        </div>

        <div className="flex flex-row justify-center mt-2">
          {solversIds?.includes(user._id) || authorId === user._id || authorId === adminId}
          <>
            <DeleteButton deleteMethod={deleteTask} />
            <HandleModal
              className="text-white duration-100 bg-blue-600 hover:bg-blue-700"
              Modal={<TaskForm task={task} groupId={groupId} />}
              buttonText="edit"
              icon={faPenToSquare}
            />
          </>
        </div>
        <div className="group-task-top-box">
          <div className="mt-24 group-task-middle-box">
            <div className="p-4 mt-10 bg-white rounded-lg shadow-lg">
              <div className="text-xl font-bold">Admin is {author?.name}</div>
              <div className="text-2xl">{title}</div>
              <div className="text-sm font-thin">{String(createdAt)}</div>
              <div className="font-thin">Piority: {piority}</div>
              <div className="font-thin">Status: {status}</div>
              <div className="font-thin">Type: {type}</div>
              <p>{description}</p>
              <div className="mt-4">
                <div className="text-xl">
                  <FontAwesomeIcon icon={faUsers} /> USERS
                </div>
                <div className="ml-4 text-base">{solversList}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Task;

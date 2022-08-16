import React, { FC } from "react";
import { Link } from "react-router-dom";

import { Itask } from "types/interfaces";

import useTaskItem from "./use-task-item";
import { user } from "constants/index";
import { TaskForm } from "../index";
import { HandleModal, DeleteButton } from "@features/ui";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface Props {
  task: Itask;
}

const TaskItem: FC<Props> = ({ task }) => {
  const { authorId, createdAt, description, groupId, piority, status, title, _id } = task;
  const { author, deleteTask } = useTaskItem(task);

  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <div className="group-task-item">
        <Link to={`/groups/${groupId}/tasks/${_id}`}>
          <div className="text-xs text-light">{String(createdAt)}</div>
          <div className="text-xl font-medium">{title}</div>
          <div className="text-base">{description}</div>
          <div className="mt-2 text-sm">piority: {piority}</div>
          <div className="text-sm">status: {status}</div>
          <div className="text-sm font-bold">
            {authorId === user._id ? <>You are author</> : <>author: {author?.name}</>}
          </div>
        </Link>
      </div>
      {/* it is not necessary to condition whether the user can change the task */}
      <div>
        <DeleteButton deleteMethod={deleteTask} />
        <HandleModal
          className="text-white duration-100 bg-blue-600 hover:bg-blue-700"
          Modal={<TaskForm groupId={groupId} task={task} />}
          buttonText="edit"
          icon={faPenToSquare}
        />
      </div>
    </div>
  );
};

export default TaskItem;

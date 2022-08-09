import React, { FC } from "react";
import { Link } from "react-router-dom";

import { Itask } from "types/interfaces";
import { user } from "constants/index";
import { TaskForm } from '../index'
import { HandleModal } from "@features/ui";
import { modalDelete } from "helpers/api";
import useTaskItem from "./use-task-item";

interface Props {
  task: Itask;
}

const TaskItem: FC<Props> = ({ task }) => {
  const { authorId, createdAt, description, groupId, piority, status, title, _id } = task;
  const { author, deleteTask} = useTaskItem(task)

  return (
    <>
      <Link to={`/groups/${groupId}/tasks/${_id}`}>
        <div className="mt-8 group-task-item">
          <div className="text-xs text-light">{String(createdAt)}</div>
          <div className="text-xl font-medium">{title}</div>
          <div className="text-base">{description}</div>
          <div className="mt-2 text-sm">piority: {piority}</div>
          <div className="text-sm">status: {status}</div>
          <div className="text-sm font-bold">
            {authorId === user._id ? <>You are author</> : <>author: {author?.name}</>}
          </div>
        </div>
      </Link>
      {user._id === authorId ? (
        <>
          <HandleModal Modal={<TaskForm task={task}/>} buttonText="edit" />
          <button className="p-2 bg-red-500" onClick={() => modalDelete(deleteTask)}>
            Delete
          </button>
        </>
      ) : null}
    </>
  );
};

export default TaskItem;

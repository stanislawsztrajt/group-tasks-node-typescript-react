import React, { FC } from "react";
import { Itask } from "types/interfaces";
import TaskItem from "../task-item";

interface Props {
  tasks: Itask[];
}

const TaskList: FC<Props> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;

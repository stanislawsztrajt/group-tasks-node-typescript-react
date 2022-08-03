import React, { FC } from "react";
import { Itask } from "types/interfaces";
import TaskItem from "../task-item";

interface Props {
  tasks: Itask[];
  text: string;
}

const TaskList: FC<Props> = ({ tasks, text }) => {
  const taskList = tasks.map((task) => <TaskItem key={task._id} task={task} />);

  return (
    <div>
      <div className="mt-10 text-3xl font-medium text-center text-indigo-600 uppercase">
        {text}
      </div>
      {tasks.length < 1 ? (
        <div className="text-lg text-center">You dont have any task</div>
      ) : (
        taskList
      )}
    </div>
  );
};

export default TaskList;

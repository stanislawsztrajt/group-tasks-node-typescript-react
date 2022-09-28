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
      <div className="p-10 mt-10 text-3xl font-medium text-center bg-white rounded-lg shadow">
        {text}
      </div>
      {tasks.length < 1 ? (
        <div className="mt-3 text-2xl text-center">You don&apos;t have any tasks</div>
      ) : (
        taskList
      )}
    </div>
  );
};

export default TaskList;

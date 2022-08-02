import React, { FC } from "react";
import { Itask } from "types/interfaces";
import TaskItem from "../task-item";

interface Props {
  tasks: Itask[];
}

const TaskList: FC<Props> = ({ tasks }) => {
  return (
    <div>
      { tasks.length < 1 ? 
        <div className='text-lg text-center'>
          You dont have any tasks
        </div>
      : 
        <>
          {
            tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))
          }
        </>
      }
    </div>
  );
};

export default TaskList;

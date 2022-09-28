import { TaskList } from '@features/task';
import React, { FC } from 'react'
import useDashboard from '../dashboard/use-dashboard';

const Tasks: FC = () => {
  const { authorTasks, userTasks, isLoading } = useDashboard();
  
  return(
    <div className="group-task-top-box">
      {isLoading ? (
          <>Loading</>
        ) : (
          <>
            <div className="group-task-middle-box">
              <TaskList tasks={authorTasks} text="Tasks where you are author" />
            </div>
            <div className="group-task-middle-box">
              <TaskList tasks={userTasks} text="Tasks where you are solver" />
            </div>
          </>
        )}
      </div>
  )
}

export default Tasks
  
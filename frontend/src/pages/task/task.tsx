import React, { FC } from 'react';
import useTasks from './use-task';

const Task: FC = () => {
  const { task } = useTasks()
  const { authorId, createdAt, description, piority, solversIds, status, title, type } = task

  return (
    <div>
      {authorId}
      {String(createdAt)}
      {description}
      {piority}
      {solversIds}
      {status}
      {title}
      {type}
    </div>
  )
}

export default Task;
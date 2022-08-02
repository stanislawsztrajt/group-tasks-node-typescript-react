import axios from 'axios';
import { authorization } from 'constants/index';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Itask } from 'types/interfaces';

const Task: FC = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState<Itask>()

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, authorization)
      setTask(data)
      console.log(data)
    }
    fetchTask()
  }, [])

  const { authorId, createdAt, description, piority, solversIds, status, title, type } = task

  return (
    <div>
      
    </div>
  )
}

export default Task;
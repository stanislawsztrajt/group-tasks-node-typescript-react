import axios from 'axios';
import { authorization } from 'constants/index';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Itask } from 'types/interfaces';

const useTasks = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState<Itask>({ authorId: '', createdAt: new Date(), description: '', piority: 'normal', status: 'pending', title: '', type: 'creation', solversIds: [''], _id: '' })

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, authorization)
      setTask(data)
      console.log(data)
    }
    fetchTask()
  }, [])

  return {
    task
  }
}
export default useTasks;
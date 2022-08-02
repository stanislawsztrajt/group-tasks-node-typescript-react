import axios from 'axios';
import { authorization } from 'constants/index';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Igroup } from 'types/interfaces';

const useGroup = () => {
  const { id } = useParams()
  const [group, setGroup] = useState<Igroup>({ adminId: '', createdAt: new Date, description: '', name: '', usersIds: [''], _id: '' })

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/groups/${id}`, authorization)
      setGroup(data)
    }
    fetchTask()
  }, [])

  return {
    group
  }
}
export default useGroup;

// https://javascript.plainenglish.io/using-typescript-mapped-types-like-a-pro-be10aef5511a
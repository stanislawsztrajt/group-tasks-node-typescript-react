import React, { FC, useEffect, useState } from "react";
import { Itask, Iuser } from "types/interfaces";
import axios from 'axios';
import { user } from "constants/index";
import { Link } from "react-router-dom";

interface Props {
  task: Itask;
}

const TaskItem: FC<Props> = ({ task }) => {
  const { authorId, createdAt, description, groupId, piority, status, title, _id } = task;
  const [author, setAuthor] = useState<Iuser>()

  useEffect(() =>{
    if(authorId === user._id) return
    const fetchAdmin = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/${authorId}`)
      setAuthor(data)
    }
    fetchAdmin()
  }, [])
  return (
    <Link to={`/groups/${groupId}/tasks/${_id}`}>
      <div className="mt-8 group-task-item">
        <div className='text-xs text-light'>{String(createdAt)}</div>
        <div className='text-xl font-medium'>{title}</div>
        <div className='text-base'>{description}</div>
        <div className='mt-2 text-sm'>piority: {piority}</div>
        <div className='text-sm'>status: {status}</div>
        <div className='text-sm font-bold'>
          { authorId === user._id ?
            <>
              You are author
            </>
          :
            <>
            author: {author?.name}
            </>
          }
        </div>

        {/* <div>{solversIds}</div>
        <div>{groupId}</div> */}
      </div>
    </Link>
  );
};

export default TaskItem;

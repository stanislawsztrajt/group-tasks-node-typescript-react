import axios from "axios";
import { user } from "constants/index";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Igroup, Iuser } from "types/interfaces";

interface Props {
  group: Igroup;
}

const GroupList: FC<Props> = ({ group }) => {
  const { name, description, adminId, createdAt, _id } = group;
  const [admin, setAdmin] = useState<Iuser>()

  useEffect(() =>{
    if(adminId === user._id) return

    const fetchAdmin = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/${adminId}`)
      setAdmin(data)
    }
    fetchAdmin()
  }, [])

  return (
    <Link to={`/groups/${_id}`}>
      <div className='mt-8 group-task-item'>
        <div className='text-xs font-light '>{String(createdAt)}</div>
        <div className='text-xl font-medium'>{name}</div>
        <div className='text-base'>{description}</div>
        <div className="text-sm font-bold">
          { adminId === user._id ?
            <>
              You are admin
            </>
          :
            <>
              { admin?.name } is admin
            </>
          }
        </div>
      </div>
    </Link>
  );
};

export default GroupList;

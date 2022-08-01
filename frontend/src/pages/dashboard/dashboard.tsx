import React, { FC, useEffect, useState } from 'react';
import { user, authorization } from 'constants/index'
import axios from 'axios';
import { Igroup } from 'types/interfaces';

const Dashboard: FC = () => {
  const [userGroups, setUserGroups] = useState<Igroup[]>([])

  useEffect(() =>{
    const fetchUserGroups = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/groups/user-groups`, authorization)
      console.log("🚀 ~ file: dashboard.tsx ~ line 12 ~ fetchUserGroups ~ data", data)
      setUserGroups(data)
    }
    fetchUserGroups()

    const fetchAdminGroups = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/groups/admin-groups`, authorization)
      console.log("🚀 ~ file: dashboard.tsx ~ line 18 ~ fetchAdminGroups ~ data", data)
      setUserGroups(data)
    }
    fetchAdminGroups()

    const fetchUserTasks = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/user-tasks`, authorization)
      console.log("🚀 ~ file: dashboard.tsx ~ line 25 ~ fetchUserTasks ~ data", data)
      setUserGroups(data)
    }
    fetchUserTasks()

    const fetchAuthorTasks = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/author-tasks`, authorization)
      console.log("🚀 ~ file: dashboard.tsx ~ line 32 ~ fetchAuthorTasks ~ data", data)
      setUserGroups(data)
    }
    fetchAuthorTasks()
  }, [])

  const userGroupsList = userGroups.map(({ _id, name, description }) => {
    return (
      <div key={_id}>
        <div>
          {name}
        </div>
        <div>
          {description}
        </div>
      </div>
    )
  })

  return (
    <div>
      Hi { user.name }!
      <div>
        Groups where you are admin:
      </div>
      <div>
        Groups where you are user:
        {userGroupsList}
      </div>
      <div>
        Tasks where you are author
      </div>
      <div>
        Tasks where you are solver:
      </div>
    </div>
  )
}

export default Dashboard;
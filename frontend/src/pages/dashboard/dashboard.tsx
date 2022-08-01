import React, { FC, useEffect, useState } from 'react';
import { user, authorization } from 'constants/index'
import axios from 'axios';
import { Igroup, IgroupResponse, Itask, ItaskResponse } from 'types/interfaces';
import GroupList from '@features/group/group-list';
import TaskList from '@features/task/task-list';

const Dashboard: FC = () => {
  const [userGroups, setUserGroups] = useState<Igroup[]>([])
  const [adminGroups, setAdminGroups] = useState<Igroup[]>([])
  const [userTasks, setUserTasks] = useState<Itask[]>([])
  const [authorTasks, setAuthorTasks] = useState<Itask[]>([])

  useEffect(() =>{
    const fetchUserGroups = async () => {
      const { data }: IgroupResponse = await axios.get(`${process.env.REACT_APP_API_URL}/groups/user-groups`, authorization)
      setUserGroups(data)
    }
    fetchUserGroups()

    const fetchAdminGroups = async () => {
      const { data }: IgroupResponse = await axios.get(`${process.env.REACT_APP_API_URL}/groups/admin-groups`, authorization)
      setAdminGroups(data)
    }
    fetchAdminGroups()

    const fetchUserTasks = async () => {
      const { data }: ItaskResponse = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/user-tasks`, authorization)
      setUserTasks(data)
    }
    fetchUserTasks()

    const fetchAuthorTasks = async () => {
      const { data }: ItaskResponse = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/author-tasks`, authorization)
      setAuthorTasks(data)
    }
    fetchAuthorTasks()
  }, [])

  return (
    <div className='group-task-top-box'>
      <div className='group-task-middle-box'>
        <div className='group-task-down-box'>
          <div className='group-task-item'>
            Groups where you are admin:
            <GroupList groups={adminGroups}/>
          </div>
          <div>
            Groups where you are user:
            <GroupList groups={userGroups}/>
          </div>
        </div>
      </div>
      
      {/* <div className='flex flex-col'>
        <div>
          Tasks where you are author
          <TaskList tasks={authorTasks}/>
        </div>
        <div>
          Tasks where you are solver:
          <TaskList tasks={userTasks}/>
        </div>
      </div> */}
    </div>
  )
}

export default Dashboard;
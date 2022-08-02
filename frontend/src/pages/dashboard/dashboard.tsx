import React, { FC, useEffect, useState } from 'react';
import { user, authorization } from 'constants/index'
import axios from 'axios';
import { Igroup, IgroupResponse, Itask, ItaskResponse } from 'types/interfaces';
import GroupList from '@features/group/group-list';
import TaskList from '@features/task/task-list';
import './dashboard.css'


const Dashboard: FC = () => {
  const [userGroups, setUserGroups] = useState<Igroup[]>([]);
  const [adminGroups, setAdminGroups] = useState<Igroup[]>([]);
  const [userTasks, setUserTasks] = useState<Itask[]>([]);
  const [authorTasks, setAuthorTasks] = useState<Itask[]>([]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      const { data }: IgroupResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/user-groups`,
        authorization
      );
      setUserGroups(data);
    };
    fetchUserGroups();

    const fetchAdminGroups = async () => {
      const { data }: IgroupResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/admin-groups`,
        authorization
      );
      setAdminGroups(data);
    };
    fetchAdminGroups();

    const fetchUserTasks = async () => {
      const { data }: ItaskResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/user-tasks`,
        authorization
      );
      setUserTasks(data);
    };
    fetchUserTasks();

    const fetchAuthorTasks = async () => {
      const { data }: ItaskResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/author-tasks`,
        authorization
      );
      setAuthorTasks(data);
    };
    fetchAuthorTasks();
  }, []);

  return (
    <div className='group-task-top-box'>
      <div className='group-task-middle-box'>
        <GroupList groups={adminGroups} text="Groups where you are admin"/>
        <GroupList groups={userGroups} text="Groups where you are user"/>
      </div>
      <div className='group-task-middle-box'>
        <div className=''>
          <div className='mt-10 text-3xl font-medium text-center text-indigo-600 uppercase'> 
            Tasks where you are author
          </div>
          <TaskList tasks={authorTasks}/>
        </div>
        <div>
          <div className='mt-10 text-3xl font-medium text-center text-indigo-600 uppercase'> 
            Tasks where you are solver
          </div>
          <TaskList tasks={userTasks}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { FC, useState } from "react";
import GroupList from "@features/group/group-list";
import TaskList from "@features/task/task-list";
import GroupForm from "@features/group/group-form";
import "./dashboard.css";
import useDashboard from "./use-dashboard";

const Dashboard: FC = () => {
  const { adminGroups, userGroups, authorTasks, userTasks, isLoading } = useDashboard();
  const [isCreateGroup, setIsCreateGroup] = useState<boolean>(false)

  return (
    <div className="group-task-top-box">
      { isCreateGroup ?
        <>
          <div onClick={() => setIsCreateGroup(false)} className="fixed z-50 ml-48 bg-red-500 left-3/4">Close modal</div>
          <GroupForm />
        </>
      : null }
      <button onClick={() => setIsCreateGroup(true)}>
        Create group
      </button>
      <button>
        Create task in group
      </button>
      <div className="group-task-middle-box">
        <GroupList groups={adminGroups} text="Groups where you are admin" />
        <GroupList groups={userGroups} text="Groups where you are user" />
      </div>
      <div className="group-task-middle-box">
        <TaskList tasks={authorTasks} text="Tasks where you are author" />
        <TaskList tasks={userTasks} text="Tasks where you are solver" />
      </div>
    </div>
  );
};

export default Dashboard;

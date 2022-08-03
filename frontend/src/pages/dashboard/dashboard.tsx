import React, { FC } from "react";
import GroupList from "@features/group/group-list";
import TaskList from "@features/task/task-list";
import "./dashboard.css";
import useDashboard from "./use-dashboard";

const Dashboard: FC = () => {
  const { adminGroups, userGroups, authorTasks, userTasks } = useDashboard();

  return (
    <div className="group-task-top-box">
      edit, delete group and list as component
      create group and task as component
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

import React, { FC } from "react";

import "./dashboard.css";
import useDashboard from "./use-dashboard";

import { TaskList, TaskForm } from "@features/task";
import { GroupForm, GroupList } from "@features/group";
import { HandleModal } from "@features/ui";

const Dashboard: FC = () => {
  const { adminGroups, userGroups, authorTasks, userTasks, isLoading } = useDashboard();
  console.log(isLoading)
  return (
    <div className="group-task-top-box">
      <HandleModal Modal={<GroupForm />} buttonText="Create Group" />
      <HandleModal Modal={<TaskForm />} buttonText="Create Task in group" />

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

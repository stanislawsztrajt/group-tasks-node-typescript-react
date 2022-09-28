import React, { FC } from "react";

import "./dashboard.css";

import { GroupForm } from "@features/group";
import { HandleModal } from "@features/ui";
import UndrawProjections from "assets/undraw/undraw_projections.svg";
import UndrawTask from "assets/undraw/undraw_task.svg";
import { Link } from "react-router-dom";
import useDashboard from "./use-dashboard";
import { user } from "constants/index";

const Dashboard: FC = () => {
  const { logout } = useDashboard()
  
  return (
    <>
      <div className="flex flex-wrap justify-center w-full">
        <HandleModal
          className="p-8 mt-8 text-xl duration-100 bg-blue-600 lg:mt-20 hover:bg-blue-700"
          Modal={<GroupForm />}
          buttonText="Create Group"
        />
        <button
          onClick={logout}
          className="p-8 px-6 py-2 mt-8 ml-2 text-xl font-bold text-white uppercase duration-100 bg-blue-600 rounded lg:mt-20 hover:bg-blue-700"
        >
          Logout
        </button>
        <div
          className="p-8 px-6 py-2 mt-8 ml-2 text-xl font-bold text-white uppercase bg-blue-600 rounded lg:mt-20 "
        >
          Hi {user.name}
        </div>
      </div>

      <div className="group-task-top-box">
        <div className='flex flex-col items-center justify-center w-full mt-24 lg:flex-row lg:justify-evenly'>
          <Link to="/dashboard/groups">
            <div className='mt-2 group-task-choose-element'>
              <h2 className='group-task-choose-element-h2'>Groups</h2>
              <img src={UndrawProjections} alt="Groups" />
            </div>
          </Link>

          <Link to="/dashboard/tasks">
            <div className='mt-2 group-task-choose-element'>
              <h2 className='group-task-choose-element-h2'>Tasks</h2>
              <img src={UndrawTask} alt="Tasks" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import { GroupList } from '@features/group';
import React, { FC } from 'react'
import useDashboard from '../dashboard/use-dashboard';

const Groups: FC = () => {
  const { adminGroups, userGroups, isLoading } = useDashboard();

  return(
    <div className="group-task-top-box">
      {isLoading ? (
          <>Loading</>
        ) : (
          <>
            <div className="group-task-middle-box">
              <GroupList groups={adminGroups} text="Groups where you are admin" />
            </div>
            <div className="group-task-middle-box">
              <GroupList groups={userGroups} text="Groups where you are user" />
            </div>
          </>
        )}
      </div>
  )
}

export default Groups
  
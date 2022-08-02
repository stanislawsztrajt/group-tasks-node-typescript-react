import React, { FC } from 'react';
import useGroup from './use-group';

const Group: FC = () => {
  const { group } = useGroup()
  const { adminId, createdAt, description, name, usersIds } = group

  return (
    <div>
      {adminId}
      {String(createdAt)}
      {description}
      {name}
      {usersIds}
    </div>
  )
}

export default Group;
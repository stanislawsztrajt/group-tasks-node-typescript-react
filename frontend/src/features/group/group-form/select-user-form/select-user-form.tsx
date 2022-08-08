import React, { FC } from 'react';
import { Iuser } from 'types/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface Props {
  users: Iuser[],
  selectedUsers: Iuser[],
  addUser: (user: Iuser) => void,
  removeUser: (_id: string) => void
}

const SelectUserForm: FC<Props> = ({ users, selectedUsers, addUser, removeUser }) => {
  const usersList = users.map((user) => {
    return (
      <div className='px-2 py-1 duration-100 cursor-pointer bg-gray-50 hover:bg-gray-200' onClick={() => addUser(user)} key={user._id}>
        <FontAwesomeIcon icon={faPlus}/> {user.name}
      </div>
    )
  })

  const selectedUsersList = selectedUsers.map(({ name, _id }) => {
    return (
      <div className='px-2 py-1 duration-100 cursor-pointer bg-gray-50 hover:bg-gray-200' onClick={() => removeUser(_id)} key={Math.random() + _id}>
        <FontAwesomeIcon icon={faMinus}/> {name}
      </div>
    )
  })

  return (
    <>
      <h2 className='mt-2 text-xl'>Select users</h2>
      <div className='w-3/4 h-48 overflow-scroll lg:w-1/2 max-h-48'>
        {usersList}
      </div>
      <div className='mt-4 text-xl'>
        Selected users:
      </div>
      <div className='w-3/4 h-48 overflow-scroll lg:w-1/2 max-h-48'>
        {selectedUsersList}
      </div>
    </>
  )
}

export default SelectUserForm;
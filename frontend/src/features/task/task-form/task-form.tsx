import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { Iresponse, Iuser } from 'types/interfaces'

interface Props {
  _id?: string,
}

const TaskForm: FC<Props> = ({ _id }) => {
  
  // const updateTask = () => {

  // }

  // const createTask = () => {
    
  // }
  const [searchValue, setSearchValue] = useState<string>('')
  const [users, setUsers] = useState<Iuser[]>([])
  const [usersCopy, setUsersCopy] = useState<Iuser[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Iuser[]>([])

  const addUser = (user: Iuser) => {
    if(selectedUsers.includes(user)) return
    setSelectedUsers([...selectedUsers, user])
  }
  const removeUser = (_id: string) =>{
    const filteredUsers = selectedUsers.filter(user => user._id !== _id)
    setSelectedUsers(filteredUsers)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const { data }: Iresponse<Iuser[]> = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
      setUsers(data)
      setUsersCopy(data)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const filteredUsers = usersCopy.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
    setUsers(filteredUsers)
  }, [searchValue])

  const usersList = users.map((user) => {
    return (
      <div onClick={() => addUser(user)} key={user._id}>
        + {user.name}
      </div>
    )
  })

  const selectedUsersList = selectedUsers.map(({ name, _id }) => {
    return (
      <div className='px-2 py-1' onClick={() => removeUser(_id)} key={name+_id}>
        - {name}
      </div>
    )
  })

  return (
    <div className='fixed w-screen h-screen bg-black bg-opacity-30'>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='w-1/3 p-6 bg-white '>
          <form className='flex flex-col items-center'>
            <h1 className='text-2xl font-bold text-center'>Create task</h1>
            <input type="text" placeholder='Name' name='name' className='task-form-input' />
            <textarea  className='h-40 max-h-48 task-form-input' placeholder='Description' name="description"></textarea>
            <input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder='Find users' name='search' className='mt-4 task-form-input' />
            <h2 className='mt-2 text-xl'>Users</h2>
            <div className='w-1/2 h-40 overflow-scroll max-h-40'>
              {usersList}
            </div>
            <div className='mt-2 text-center'>
              Selected users: 
              <div className='flex flex-row flex-wrap'>
                {selectedUsersList}
              </div>
            </div>
            <button className='px-8 py-2 mt-6 text-lg font-medium text-white bg-indigo-600 rounded-full'>Create Task</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskForm;
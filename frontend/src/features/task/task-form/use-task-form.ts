import axios from 'axios'
import { authorization, user } from 'constants/index';
import { errorModal, successModal } from 'helpers/api';
import { useEffect, useState } from 'react'
import { Itask, ItaskData, Iresponse, Iuser } from 'types/interfaces'
import * as Yup from 'yup';

interface IinitialValues {
  title: string;
  description: string;
  piority: "small" | "normal" | "high";
  type: "bug" | "update" | "creation";
  status: "pending" | "fulfilled" | "unfulfilled";
}

const taskSchema = Yup.object().shape({});

const initialValues: IinitialValues = {
  title: "",
  description: "",
  piority: "normal",
  type: "creation",
  status: "pending"
};

type compareTwoUserArraysType = (firstArray: Iuser[], secondArray: Iuser[]) => Iuser[]
const compareTwoUserArrays: compareTwoUserArraysType = (firstArray, secondArray) => {
  return firstArray.filter(element => !secondArray.includes(element))
}

const useTaskForm = (task?: Itask) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [users, setUsers] = useState<Iuser[]>([])
  const [usersCopy, setUsersCopy] = useState<Iuser[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Iuser[]>([])

  const addUser = (user: Iuser) => {
    const newUsers = [...selectedUsers, user]
    const removeAddedUsers = compareTwoUserArrays(users, newUsers) 
    setUsers(removeAddedUsers)
    setSelectedUsers(newUsers)
  }
  const removeUser = (_id: string) =>{
    const filteredSelectedUsers = selectedUsers.filter(user => user._id !== _id)
    setSelectedUsers(filteredSelectedUsers)

    const user = usersCopy.find(user => user._id === _id) as Iuser
    setUsers([...users, user])
  }

  const formAction = async (values: IinitialValues) => {
    const selectedUsersIds = selectedUsers.map(({ _id }) => _id)
    const bodyData: ItaskData = {
      ...values,
      solversIds: selectedUsersIds,
      authorId: user._id
    }

    if(task) {
      // update task
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, bodyData, authorization)
        successModal()
      } catch {
        errorModal()
      }
    }

    else {
      // create task
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, bodyData, authorization)
        successModal()
      } catch {
        errorModal()
      }
    }

    window.location.reload()
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const { data }: Iresponse<Iuser[]> = await axios.get(`${process.env.REACT_APP_API_URL}/users`)
      const filteredData = data.filter(({ _id }) => _id !== user._id)
      setUsers(filteredData)
      setUsersCopy(filteredData)

      if(task) {
        const selectedUsersFromIds: Iuser[] = filteredData.filter(user => task.solversIds?.includes(user._id))
        setSelectedUsers(selectedUsersFromIds)
        const removeAddedUsers: Iuser[] = compareTwoUserArrays(filteredData, selectedUsersFromIds)
        setUsers(removeAddedUsers)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const filteredBySelectedUsers = compareTwoUserArrays(usersCopy, selectedUsers) 
    const filteredUsers = filteredBySelectedUsers.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
    setUsers(filteredUsers)
  }, [searchValue])

  return {
    setSearchValue, 
    addUser,
    removeUser,
    formAction,
    selectedUsers,
    users,
    taskSchema,
    initialValues
  }
}
export default useTaskForm;
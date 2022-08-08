import axios from 'axios'
import { authorization, user } from 'constants/index';
import { errorModal, successModal } from 'helpers/api';
import { useEffect, useState } from 'react'
import { Itask, ItaskData, Iresponse, Iuser } from 'types/interfaces'
import * as Yup from 'yup';


type compareTwoUserArraysType = (firstArray: Iuser[], secondArray: Iuser[]) => Iuser[]
const compareTwoUserArrays: compareTwoUserArraysType = (firstArray, secondArray) => {
  return firstArray.filter(element => !secondArray.includes(element))
}

const useSelectUserForm = () => {
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

  useEffect(() => {
    const filteredBySelectedUsers = compareTwoUserArrays(usersCopy, selectedUsers) 
    const filteredUsers = filteredBySelectedUsers.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase()))
    setUsers(filteredUsers)
  }, [searchValue])
  
  return {
  
  }
}
export default useSelectUserForm;
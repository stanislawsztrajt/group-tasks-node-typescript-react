import axios from 'axios'
import { authorization, user } from 'constants/index';
import { errorModal, successModal } from 'helpers/api';
import { useEffect, useState } from 'react'
import { Igroup, IgroupData, Iresponse, Iuser } from 'types/interfaces'
import * as Yup from 'yup';

interface IinitialValues {
  name: string;
  description: string;
}

const groupSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, "Password must be longer than 6 chars")
    .max(100, "Password must be shorter than 100 chars")
    .required("Required"),

  description: Yup.string()
    .min(6, "Password must be longer than 6 chars")
    .max(1000, "Password must be shorter than 1000 chars")
    .required("Required"),
});

const initialValues: IinitialValues = {
  name: '',
  description: '',
};

const useGroupForm = (group?: Igroup) => {
  initialValues.name = group?.name ?? ''
  initialValues.description = group?.description ?? ''

  const [searchValue, setSearchValue] = useState<string>('')
  const [users, setUsers] = useState<Iuser[]>([])
  const [usersCopy, setUsersCopy] = useState<Iuser[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Iuser[]>([])

  const addUser = (user: Iuser) => {
    const newUsers = [...selectedUsers, user]
    const removeAddedUsers = users.filter(userr => !newUsers.includes(userr))
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
    const bodyData: IgroupData = {
      ...values,
      usersIds: selectedUsersIds,
      adminId: user._id
    }

    if(group) {
      // update group
      try {
        await axios.put(`${process.env.REACT_APP_API_URL}/groups/${group._id}`, bodyData, authorization)
        successModal()
      } catch {
        errorModal()
      }
    }

    else {
      // create group
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/groups`, bodyData, authorization)
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

      if(group) {
        const selectedUsersFromIds: Iuser[] = filteredData.filter(user => group.usersIds?.includes(user._id))
        setSelectedUsers(selectedUsersFromIds)
        const removeAddedUsers = filteredData.filter(userr => !selectedUsersFromIds.includes(userr))
        setUsers(removeAddedUsers)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const filteredBySelectedUsers = usersCopy.filter(user => !selectedUsers.includes(user))
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
    groupSchema,
    initialValues
  }
}
export default useGroupForm;
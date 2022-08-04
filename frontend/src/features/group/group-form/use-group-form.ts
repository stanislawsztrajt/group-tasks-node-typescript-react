import axios from 'axios'
import { user } from 'constants/index';
import { errorModal } from 'helpers/api';
import { useEffect, useState } from 'react'
import { Igroup, IgroupData, Iresponse, Iuser } from 'types/interfaces'
import * as Yup from 'yup';

interface IinitialValues {
  name: string;
  description: string;
}

const groupSchema = Yup.object().shape({
  // email: Yup.string()
  //   .email("Invalid email")
  //   .min(6, "Password must be longer than 6 chars")
  //   .max(30, "Password must be shorter than 30 chars")
  //   .required("Required"),

  // password: Yup.string()
  //   .min(6, "Password must be longer than 6 chars")
  //   .max(30, "Password must be shorter than 30 chars")
  //   .required("Required"),
});

const initialValues: IinitialValues = {
  name: '',
  description: '',
};

const useGroupForm = (group?: Igroup) => {
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

  const formAction = (values: IinitialValues) => {
    const selectedUsersIds = selectedUsers.map(({ _id }) => _id)
    console.log(values)
    console.log(selectedUsersIds)
    if(group) {
      // update group
      console.log('do update')
    }

    else {
      // create group
      const data: IgroupData = {
        ...values,
        usersIds: selectedUsersIds,
        adminId: user._id
      }

      try {
        console.log(data)
      } catch {
        errorModal()
      }
    }
  }

  useEffect(() => {
    if(group) {
      const selectedUsersFromIds: Iuser[] = usersCopy.filter(user => group?.usersIds?.includes(user._id))      
      setSelectedUsers(selectedUsersFromIds)
    }

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
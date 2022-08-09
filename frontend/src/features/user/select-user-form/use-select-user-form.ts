import { useEffect, useState } from "react";
import axios from "axios";

import { user } from "constants/index";
import { Itask, Iresponse, Iuser, Igroup } from "types/interfaces";

type compareTwoUserArraysType = (firstArray: Iuser[], secondArray: Iuser[]) => Iuser[];

const compareTwoUserArrays: compareTwoUserArraysType = (firstArray, secondArray) => {
  return firstArray.filter((element) => !secondArray.includes(element));
};

const useSelectUserForm = (task?: Itask, group?: Igroup) => {
  const [searchValue, setSearchUserValue] = useState<string>("");
  const [users, setUsers] = useState<Iuser[]>([]);
  const [usersCopy, setUsersCopy] = useState<Iuser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Iuser[]>([]);

  const addUser = (user: Iuser) => {
    const newUsers = [...selectedUsers, user];
    setSelectedUsers(newUsers);

    const removeAddedUsers = compareTwoUserArrays(users, newUsers);
    setUsers(removeAddedUsers);
  };

  const removeUser = (_id: string) => {
    const filteredSelectedUsers = selectedUsers.filter((user) => user._id !== _id);
    setSelectedUsers(filteredSelectedUsers);

    const user = usersCopy.find((user) => user._id === _id) as Iuser;
    setUsers([...users, user]);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data }: Iresponse<Iuser[]> = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`
      );
      const filteredUsers = data.filter(({ _id }) => _id !== user._id);
      setUsers(filteredUsers);
      setUsersCopy(filteredUsers);

      if (task || group) {
        const selectedUsersFromIds: Iuser[] = filteredUsers.filter((user) => {
          if (task) return task.solversIds?.includes(user._id);
          if (group) return group.usersIds?.includes(user._id);
        });

        setSelectedUsers(selectedUsersFromIds);
        const removeAddedUsers: Iuser[] = compareTwoUserArrays(filteredUsers, selectedUsersFromIds);
        setUsers(removeAddedUsers);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const filteredBySelectedUsers = compareTwoUserArrays(usersCopy, selectedUsers);
    const filteredUsers = filteredBySelectedUsers.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setUsers(filteredUsers);
  }, [searchValue]);

  return {
    setSearchUserValue,
    addUser,
    removeUser,
    selectedUsers,
    users,
  };
};
export default useSelectUserForm;

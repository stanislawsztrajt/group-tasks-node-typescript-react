import { useEffect, useState } from "react";

import axios from "axios";

import { authorization } from "constants/index";
import { Igroup, Iresponse, Itask } from "types/interfaces";
import { checkIsNotLogin } from "helpers";
import { useNavigate } from "react-router-dom";

const useDashboard = () => {
  checkIsNotLogin();
  const navigation = useNavigate()

  const [userGroups, setUserGroups] = useState<Igroup[]>([]);
  const [adminGroups, setAdminGroups] = useState<Igroup[]>([]);
  const [userTasks, setUserTasks] = useState<Itask[]>([]);
  const [authorTasks, setAuthorTasks] = useState<Itask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserGroups = async () => {
      const { data }: Iresponse<Igroup[]> = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/user-groups`,
        authorization
      );
      setUserGroups(data);
    };
    fetchUserGroups();

    const fetchAdminGroups = async () => {
      const { data }: Iresponse<Igroup[]> = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/admin-groups`,
        authorization
      );
      setAdminGroups(data);
    };
    fetchAdminGroups();

    const fetchUserTasks = async () => {
      const { data }: Iresponse<Itask[]> = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/user-tasks`,
        authorization
      );
      setUserTasks(data);
    };
    fetchUserTasks();

    const fetchAuthorTasks = async () => {
      const { data }: Iresponse<Itask[]> = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/author-tasks`,
        authorization
      );
      setAuthorTasks(data);
      setIsLoading(false);
    };
    fetchAuthorTasks();
  }, []);

  const logout = () => {
    localStorage.clear()
    navigation('/')
    window.location.reload()
  }

  return {
    userGroups,
    adminGroups,
    userTasks,
    authorTasks,
    isLoading,
    logout
  };
};
export default useDashboard;

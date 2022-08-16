import axios from "axios";
import { authorization } from "constants/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Igroup, Iresponse, Itask, Iuser } from "types/interfaces";

const useGroup = () => {
  const { id } = useParams();
  const [group, setGroup] = useState<Igroup>({
    adminId: "",
    createdAt: new Date(),
    description: "",
    name: "",
    usersIds: [""],
    _id: "",
  });
  const [tasks, setTasks] = useState<Itask[]>([]);
  const [users, setUsers] = useState<Iuser[]>([]);
  const [admin, setAdmin] = useState<Iuser>({ name: '', email: '', _id: '' });

  useEffect(() => {
    const fetchGroup = async () => {
      const { data }: Iresponse<Igroup> = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/${id}`,
        authorization
      );
      setGroup(data);
    };
    fetchGroup();

    const fetchTasks = async () => {
      const { data }: Iresponse<Itask[]> = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/tasks/${id}`,
        authorization
      );
      setTasks(data);
    };
    fetchTasks();

    const fetchUsers = async () => {
      const { data }: Iresponse<Iuser[]> = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/users/${id}`,
        authorization
      );
      setUsers(data);
    };
    fetchUsers();

    const fetchAdmin = async () => {
      const { data }: Iresponse<Iuser> = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${group.adminId}`,
        authorization
      );
      setAdmin(data);
    }
    fetchAdmin()
  }, []);

  return {
    group,
    tasks,
    users,
    admin
  };
};
export default useGroup;

// https://javascript.plainenglish.io/using-typescript-mapped-types-like-a-pro-be10aef5511a

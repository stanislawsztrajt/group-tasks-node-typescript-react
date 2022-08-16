import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { authorization } from "constants/index";
import { Igroup, Iresponse, Itask, Iuser } from "types/interfaces";
import { TresponseStatus } from "types";

const useTasks = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<Itask>({
    authorId: "",
    createdAt: new Date(),
    description: "",
    groupId: "",
    piority: "normal",
    status: "pending",
    title: "",
    type: "creation",
    solversIds: [""],
    _id: "",
  });
  const [solvers, setSolvers] = useState<Iuser[]>([]);
  const [author, setAuthor] = useState<Iuser>();
  const [adminId, setAdminId] = useState<string>('');

  useEffect(() => {
    const fetchTask = async () => {
      const { data }: Iresponse<Itask> = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
        authorization
      );
      setTask(data);
    };
    fetchTask();

    const fetchTaskSolvers = async () => {
      const { data }: Iresponse<Iuser[]> = await axios.get(
        `${process.env.REACT_APP_API_URL}/tasks/solvers/${taskId}`,
        authorization
      );
      setSolvers(data);
    };
    fetchTaskSolvers();

    const fetchAuthorTask = async () => {
      const { data }: Iresponse<Iuser> = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/${task.authorId}`,
        authorization
      );
      setAuthor(data);
    };
    fetchAuthorTask();

    const fetchAdminId = async () => {
      const { data }: Iresponse<Igroup> = await axios.get(
        `${process.env.REACT_APP_API_URL}/groups/${task.groupId}`,
        authorization
      );
      setAdminId(data.adminId)
    };
    fetchAdminId();
  }, []);

  const deleteTask: TresponseStatus = async () => {
    return 'error'
  }

  return {
    task,
    solvers,
    author,
    deleteTask,
    adminId
  };
};
export default useTasks;

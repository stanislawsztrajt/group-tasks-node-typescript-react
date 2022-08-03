import axios from "axios";
import { authorization } from "constants/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Iresponse, Itask, Iuser } from "types/interfaces";

const useTasks = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState<Itask>({
    authorId: "",
    createdAt: new Date(),
    description: "",
    piority: "normal",
    status: "pending",
    title: "",
    type: "creation",
    solversIds: [""],
    _id: "",
  });
  const [solvers, setSolvers] = useState<Iuser[]>([]);

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
  }, []);

  return {
    task,
    solvers,
  };
};
export default useTasks;

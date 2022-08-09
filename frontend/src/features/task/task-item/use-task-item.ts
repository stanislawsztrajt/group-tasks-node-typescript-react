import { useEffect, useState } from "react";
import axios from "axios";

import { Itask, Iuser } from "types/interfaces";
import { authorization, user } from "constants/index";

const useTaskItem = (task: Itask) => {
  const { authorId, _id } = task;
  console.log(_id)
  const [author, setAuthor] = useState<Iuser>();

  useEffect(() => {
    if (authorId === user._id) return;
    const fetchAdmin = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/${authorId}`);
      setAuthor(data);
    };
    fetchAdmin();
  }, []);

  const deleteTask: () => Promise<"success" | "error"> = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${_id}`, authorization);
      return "success";
    } catch {
      return "error";
    }
  };


  return {
    author,
    deleteTask
  }
}

export default useTaskItem;
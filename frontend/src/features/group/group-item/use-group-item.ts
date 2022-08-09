import { useEffect, useState } from "react";
import axios from "axios";

import { authorization, user } from "constants/index";
import { Igroup, Iuser } from "types/interfaces";

const useGroupItem = (group: Igroup) => {
  const [admin, setAdmin] = useState<Iuser>();
  const { _id, adminId } = group;

  const deleteGroup: () => Promise<"success" | "error"> = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/groups/${_id}`, authorization);
      return "success";
    } catch {
      return "error";
    }
  };

  useEffect(() => {
    if (adminId === user._id) return;

    const fetchAdmin = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users/${adminId}`);
      setAdmin(data);
    };
    fetchAdmin();
  }, []);

  return {
    admin,
    deleteGroup,
  };
};
export default useGroupItem;

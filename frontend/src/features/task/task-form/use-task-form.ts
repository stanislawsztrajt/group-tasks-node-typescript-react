import axios from "axios";
import * as Yup from "yup";

import { authorization, user } from "constants/index";
import { errorModal, successModal } from "helpers/api";
import { Itask, ItaskData } from "types/interfaces";
import useSelectUserForm from "@features/user/select-user-form/use-select-user-form";

interface IinitialValues {
  title: string;
  description: string;
  piority: "small" | "normal" | "high";
  type: "bug" | "update" | "creation";
  status: "pending" | "fulfilled" | "unfulfilled";
}

const taskSchema = Yup.object().shape({});

const initialValues: IinitialValues = {
  title: "",
  description: "",
  piority: "normal",
  type: "creation",
  status: "pending",
};

const useTaskForm = (task?: Itask) => {
  initialValues.title = task?.title ?? ''
  initialValues.description = task?.description ?? ''
  initialValues.piority = task?.piority ?? 'normal'
  initialValues.type = task?.type ?? 'creation'
  initialValues.status = task?.status ?? 'pending'

  const { setSearchUserValue, addUser, removeUser, selectedUsers, users } = useSelectUserForm(
    task,
    undefined
  );

  const formAction = async (values: IinitialValues) => {
    const selectedUsersIds = selectedUsers.map(({ _id }) => _id);
    const bodyData: ItaskData = {
      ...values,
      solversIds: selectedUsersIds,
      authorId: user._id,
    };
    console.log(bodyData)

    try {
      if (task) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/tasks/${task._id}`,
          bodyData,
          authorization
        );
        successModal();
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, bodyData, authorization);
        successModal();
      }
      window.location.reload();
    } catch {
      errorModal();
    }

  };

  return {
    setSearchUserValue,
    addUser,
    removeUser,
    formAction,
    selectedUsers,
    users,
    taskSchema,
    initialValues,
  };
};
export default useTaskForm;

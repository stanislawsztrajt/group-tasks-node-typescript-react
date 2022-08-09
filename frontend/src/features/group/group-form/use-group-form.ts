import axios from "axios";
import * as Yup from "yup";

import { authorization, user } from "constants/index";
import { errorModal, successModal } from "helpers/api";
import { Igroup, IgroupData } from "types/interfaces";
import useSelectUserForm from "@features/user/select-user-form/use-select-user-form";

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
  name: "",
  description: "",
};

const useGroupForm = (group?: Igroup) => {
  initialValues.name = group?.name ?? "";
  initialValues.description = group?.description ?? "";

  const { setSearchUserValue, addUser, removeUser, selectedUsers, users } = useSelectUserForm(
    undefined,
    group
  );

  const formAction = async (values: IinitialValues) => {
    const selectedUsersIds = selectedUsers.map(({ _id }) => _id);
    const bodyData: IgroupData = {
      ...values,
      usersIds: selectedUsersIds,
      adminId: user._id,
    };
    console.log(bodyData)
    try {
      if (group) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/groups/${group._id}`,
          bodyData,
          authorization
        );
        successModal();
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/groups`, bodyData, authorization);
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
    groupSchema,
    initialValues,
  };
};
export default useGroupForm;

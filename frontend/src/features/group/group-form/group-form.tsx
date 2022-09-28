import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
// import UndrawNature from "src/images/undraw_nature.svg";
import { Igroup } from "types/interfaces";

import useGroupForm from "./use-group-form";
import { SelectUserForm } from "@features/user";
import { ModalLayout } from "@features/ui";

interface Props {
  group?: Igroup;
}

const GroupForm: FC<Props> = ({ group }) => {
  const {
    setSearchUserValue,
    addUser,
    removeUser,
    formAction,
    selectedUsers,
    users,
    groupSchema,
    initialValues,
  } = useGroupForm(group);

  const buttonText = group ? "Update" : "Create";

  return (
    <ModalLayout>
      <Formik initialValues={initialValues} validationSchema={groupSchema} onSubmit={formAction}>
        {() => (
          <Form className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center">{buttonText} Group</h1>
            <div className="mt-8"></div>

            <Field type="text" placeholder="Name" name="name" className="group-task-form-input" />
            <Field
              as="textarea"
              className="h-40 max-h-48 group-task-form-input"
              placeholder="Description"
              name="description"
            ></Field>
            <div className="mt-4"></div>
            <SelectUserForm
              setSearchUserValue={setSearchUserValue}
              addUser={addUser}
              removeUser={removeUser}
              users={users}
              selectedUsers={selectedUsers}
            />
            <button
              type="submit"
              className="px-8 py-2 mt-6 text-lg font-medium text-white bg-indigo-600 rounded-full"
            >
              {buttonText} Group
            </button>
          </Form>
        )}
      </Formik>
    </ModalLayout>
  );
};

export default GroupForm;

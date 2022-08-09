import React, { FC } from "react";
import { Field, Form, Formik } from "formik";
import Select from 'react-select'

import { Itask } from "types/interfaces";

import useTaskForm from "./use-task-form";
import { SelectUserForm } from "@features/user";
import { ModalLayout } from "@features/ui";
import { TtaskPiority, TtaskStatus, TtaskType } from "types";

interface Props {
  task?: Itask;
}

const options = {
  piority: [
    { value: 'small', label: 'Small' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' }
  ],
  type: [
    { value: 'bug', label: 'Bug' },
    { value: 'update', label: 'Update' },
    { value: 'creation', label: 'Creation' }

  ],
  status: [
    { value: 'pending', label: 'Pending' },
    { value: 'fulfilled', label: 'fulfilled' },
    { value: 'unfulfilled', label: 'Unfulfilled' }
  ]
}

const TaskForm: FC<Props> = ({ task }) => {
  const {
    setSearchUserValue,
    addUser,
    removeUser,
    formAction,
    selectedUsers,
    users,
    taskSchema,
    initialValues,
  } = useTaskForm(task);

  const buttonText = task ? "Update" : "Create";

  return (
    <ModalLayout>
      <Formik initialValues={initialValues} validationSchema={taskSchema} onSubmit={formAction}>
          {({ errors, touched, values }) => (
            <>
              <Form className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-center">{buttonText} Task</h1>
                <div className="mt-8"></div>
                <Field type="text" placeholder="Name" name="title" className="task-task-form-input" />
                <Field
                  as="textarea"
                  className="h-40 max-h-48 task-task-form-input"
                  placeholder="Description"
                  name="description"
                ></Field>
                <Select onChange={(e) => {
                  values.piority = e?.value as TtaskPiority
                }} name="piority" placeholder={initialValues.piority} options={options.piority}/>
                <Select onChange={(e) => {
                  values.type = e?.value as TtaskType
                }} name="type" placeholder={initialValues.type} options={options.type}/>
                <Select onChange={(e) => {
                  values.status = e?.value as TtaskStatus
                }} name="status" placeholder={initialValues.status} options={options.status}/>

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
                  {buttonText} Task
                </button>
              </Form>
            </>
          )}
      </Formik>
    </ModalLayout>
  );
};

export default TaskForm;

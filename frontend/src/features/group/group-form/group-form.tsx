import React, { ChangeEvent, FC } from 'react'
import { Igroup } from 'types/interfaces'
// import UndrawNature from "src/images/undraw_nature.svg";
import { Field, Form, Formik } from "formik";
import SelectUserForm from './select-user-form';
import useGroupForm from './use-group-form'

interface Props {
  group?: Igroup
}

const GroupForm: FC<Props> = ({ group }) => {
  const {
    setSearchValue, 
    addUser,
    removeUser,
    formAction,
    selectedUsers,
    users,
    groupSchema,
    initialValues
  } = useGroupForm(group)

  const buttonText = group ? 'Update' : 'Create'

  return (
    <div className='fixed top-0 left-0 z-40 w-screen h-screen bg-black bg-opacity-30'>
      <div className='flex items-center justify-center w-full h-full px-4'>
        <div className='w-full p-6 bg-white rounded-md lg:w-2/3 xl:w-1/3'>
          <Formik
            initialValues={initialValues}
            validationSchema={groupSchema}
            onSubmit={formAction}
          >
            <Form className='flex flex-col items-center'>
              <h1 className='text-2xl font-bold text-center'>{buttonText} Group</h1>
              <div className='mt-8'></div>

              <Field type="text" placeholder='Name' name='name' className='group-task-form-input' />
              <Field as="textarea" className='h-40 max-h-48 group-task-form-input' placeholder='Description' name="description"></Field>
              <Field onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} type="text" placeholder='Find users' name='search' className='mt-4 group-task-form-input' />
              

              <SelectUserForm addUser={addUser} removeUser={removeUser} users={users} selectedUsers={selectedUsers} />
              
              <button type="submit" className='px-8 py-2 mt-6 text-lg font-medium text-white bg-indigo-600 rounded-full'>{buttonText} Group</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default GroupForm;
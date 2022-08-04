import React, { ChangeEvent, FC } from 'react'
import { Igroup } from 'types/interfaces'
import useGroupForm from './use-group-form'
// import UndrawNature from "src/images/undraw_nature.svg";
import { Field, Form, Formik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
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

  const usersList = users.map((user) => {
    return (
      <div className='px-2 py-1 duration-100 cursor-pointer bg-gray-50 hover:bg-gray-200' onClick={() => addUser(user)} key={user._id}>
        <FontAwesomeIcon icon={faPlus}/> {user.name}
      </div>
    )
  })

  const selectedUsersList = selectedUsers.map(({ name, _id }) => {
    return (
      <div className='px-2 py-1 duration-100 cursor-pointer bg-gray-50 hover:bg-gray-200' onClick={() => removeUser(_id)} key={name+_id}>
        <FontAwesomeIcon icon={faMinus}/> {name}
      </div>
    )
  })

  return (
    <div className='fixed z-50 w-screen h-screen bg-black bg-opacity-30'>
      <div className='flex items-center justify-center w-full h-full px-4'>
        <div className='w-full p-6 bg-white rounded-md lg:w-2/3 xl:w-1/3'>
          <Formik
            initialValues={initialValues}
            validationSchema={groupSchema}
            onSubmit={formAction}
          >
            <Form className='flex flex-col items-center'>
              <h1 className='text-2xl font-bold text-center'>Create Group</h1>
              <div className='mt-8'></div>
              <Field type="text" placeholder='Name' name='name' className='group-task-form-input' />
              <Field as="textarea" className='h-40 max-h-48 group-task-form-input' placeholder='Description' name="description"></Field>
              <Field onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} type="text" placeholder='Find users' name='search' className='mt-4 group-task-form-input' />
              <h2 className='mt-2 text-xl'>Select users</h2>
              <div className='w-3/4 h-48 overflow-scroll lg:w-1/2 max-h-48'>
                {usersList}
              </div>
              <div className='mt-4 text-xl'>
                Selected users:
              </div>
              <div className='w-3/4 h-48 overflow-scroll lg:w-1/2 max-h-48'>
                {selectedUsersList}
              </div>
              <button type="submit" className='px-8 py-2 mt-6 text-lg font-medium text-white bg-indigo-600 rounded-full'>Create Group</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default GroupForm;
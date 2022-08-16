import { modalDelete } from 'helpers/api'
import React, { FC } from 'react'
import { TresponseStatus } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  deleteMethod: TresponseStatus;
}

const DeleteButton: FC<Props> = ({ deleteMethod }) => {
  return(
    <button
      className="px-6 py-2 mt-2 ml-2 font-medium text-white uppercase duration-100 bg-red-600 rounded hover:bg-red-700"
      onClick={() => modalDelete(deleteMethod)}
    >
      <FontAwesomeIcon icon={faXmark}/>
      <span className='ml-2'>
        Delete
      </span>
    </button>
  )
}

export default DeleteButton
  
import React, { ReactNode, useState } from 'react'
import type { FCC } from 'types/index'

interface Props {
  Modal: ReactNode,
  buttonText: string
}

const HandleModal: FCC<Props> = ({Modal, buttonText}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  
  return (
    <>
      {isModalOpen ? (
        <>
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed z-50 ml-48 bg-red-500 left-3/4"
          >
            Close Modal
          </div>
          {Modal}
        </>
      ) : null}
      <button onClick={() => setIsModalOpen(true)}>{buttonText}</button>
    </>
  )
}

export default HandleModal;
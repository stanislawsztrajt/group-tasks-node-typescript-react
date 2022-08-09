import React, { ReactNode } from 'react'
import type { FCC } from 'types/index'
interface Props {
  children: ReactNode
}

const ModalLayout: FCC<Props> = ({children}: Props) => {
  return (
    <div className="fixed top-0 left-0 z-40 w-screen h-screen bg-black bg-opacity-30">
      <div className="flex items-center justify-center w-full h-full px-4">
        <div className="z-40 w-full p-6 bg-white rounded-md lg:w-2/3 xl:w-1/3">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ModalLayout;
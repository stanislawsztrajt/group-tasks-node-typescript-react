import { faXmark, faXmarkSquare, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import type { FCC } from "types/index";

interface Props {
  Modal: ReactNode;
  buttonText: string;
  className?: string;
  icon?: IconDefinition;
}

const HandleModal: FCC<Props> = ({ Modal, buttonText, className, icon }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen ? (
        <>
          <div onClick={() => setIsModalOpen(false)} className="fixed top-0 left-0 z-50">
            <FontAwesomeIcon className="w-16 h-16" icon={faXmark} />
          </div>
          {Modal}
        </>
      ) : null}
      <button
        className={`px-6 mt-2 py-2 ml-2 text-white rounded font-bold uppercase ${className}`}
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={icon as IconDefinition} />
        <span className="ml-2">{buttonText}</span>
      </button>
    </>
  );
};

export default HandleModal;

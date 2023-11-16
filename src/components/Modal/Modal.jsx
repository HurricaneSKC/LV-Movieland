import React from "react";
import FocusTrap from "focus-trap-react";
import useModal from "../../hooks/useModal";
import "./Modal.scss";

const Modal = ({ modal }) => {
  const { modal: activeModal, closeModal } = useModal();

  return (
    <FocusTrap active={!!activeModal}>
      <div className="modal">
        <div className="outer-container">
          <div className="content-container">
            {modal}
          </div>
          <button
            className="modal-btn"
            aria-label="Close Modal"
            onClick={closeModal}
          >
            &times;
          </button>
        </div>
      </div>
    </FocusTrap>
  );
};

export default Modal;
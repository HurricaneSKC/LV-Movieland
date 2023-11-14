import React, { createContext, useState } from "react";
import Modal from "../components/Modal";

export const ModalContext = createContext({
  modal: null,
  renderModal: () => {},
  closeModal: () => {},
});

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null);

  const renderModal = (el) => setModal(el);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, renderModal, closeModal }}>
      {modal && <Modal modal={modal} />}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
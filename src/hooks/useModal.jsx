import { useCallback, useContext, useEffect } from "react";
import { ModalContext } from "../context/ModalContext";

const useModal = () => {
  const context = useContext(ModalContext);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        context.closeModal();
      }
    },
    [context]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (context.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
  }, [context.modal]);

  return context;
};

export default useModal;

import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
  confirmButton?: ReactNode;
  closeButton?: ReactNode;
}

const Modal = ({
  open,
  onClose,
  title,
  content,
  confirmButton,
  closeButton,
}: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className={styles.overlayStyle} />
      <div className={styles.modalStyle}>
        <h2>{title}</h2>
        <p>{content}</p>
        {confirmButton && <button>{confirmButton}</button>}
        {closeButton && <button onClick={onClose}>{closeButton}</button>}
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement
  );
};

export default Modal;

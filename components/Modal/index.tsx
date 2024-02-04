import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
  confirmButton?: ReactNode;
  closeButton?: ReactNode;
  confirmEvent?: () => void;
}

const Modal = ({
  open,
  onClose,
  title,
  content,
  confirmButton,
  closeButton,
  confirmEvent,
}: ModalProps) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[60]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-[70] w-[288px] rounded-xl">
        <div className="flex flex-col items-center justify-center py-8 gap-y-2 border-b border-[#E3E3E3]">
          <h2 className="font-semibold">{title}</h2>
          <p className="text=[#777] text-sm">{content}</p>
        </div>
        <div
          className={`${
            confirmButton ? "grid-cols-2" : "grid-cols-1"
          } grid py-4`}
        >
          {confirmButton && (
            <div className="relative flex items-center justify-center">
              <button
                className="text-center text-[#777] text-sm"
                onClick={confirmEvent}
              >
                {confirmButton}
              </button>
              <div className="w-px h-full bg-[#E3E3E3] absolute top-0 right-0"></div>
            </div>
          )}
          {closeButton && (
            <button
              onClick={onClose}
              className="font-semibold text-sm text-[#00C37D]"
            >
              {closeButton}
            </button>
          )}
        </div>
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement
  );
};

export default Modal;

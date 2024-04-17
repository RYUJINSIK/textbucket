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
        <div
          className={`flex flex-col items-center justify-center py-8 px-6 border-b border-[#E3E3E3] ${
            content === undefined ? "" : "gap-y-2"
          }`}
        >
          <h2 className="font-semibold text-center">{title}</h2>
          <p className="text=[#777] text-sm">{content}</p>
        </div>
        <div
          className={`${
            confirmButton !== undefined && closeButton !== undefined
              ? "grid-cols-2"
              : "grid-cols-1"
          } grid py-4`}
        >
          {closeButton && (
            <div className="relative flex items-center justify-center">
              <button
                className={`text-center  
                ${
                  confirmButton === undefined
                    ? "font-semibold text-sm text-[#00C37D]"
                    : "text-[#777] text-sm"
                }`}
                onClick={onClose}
              >
                {closeButton}
              </button>
              <div
                className={`w-px h-full bg-[#E3E3E3] absolute top-0 right-0`}
              ></div>
            </div>
          )}
          {confirmButton && (
            <button
              onClick={confirmEvent}
              className="font-semibold text-sm text-[#00C37D]"
            >
              {confirmButton}
            </button>
          )}
        </div>
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement
  );
};

export default Modal;

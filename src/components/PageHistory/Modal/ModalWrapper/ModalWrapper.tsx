import { useEffect } from "react";

import Button from "../../../../shared/buttons/button";

import close from "./../../../../../public/images/cross-cancel.svg";
import style from "./style.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalWrapper({
  isOpen,
  onClose,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <Button onClick={onClose} classes={["closeButton", "close"]}>
          <img src={close} alt="" />
        </Button>
        <div className={style.modalBody}>{children}</div>
      </div>
    </div>
  );
}

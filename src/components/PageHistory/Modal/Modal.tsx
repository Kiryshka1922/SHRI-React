import { useEffect } from "react";
import ReactDOM from "react-dom";

import getReport from "../../../api/localStorage/getReport";
import Statistic from "../../PageAnalytics/Statistics/Statistics";

import ModalWrapper from "./ModalWrapper/ModalWrapper";

import type { PropsWriting } from "../../../types/types";

export default function Modal({
  id,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const report: PropsWriting | null = getReport(id);

  const portalContainer = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(portalContainer);

    return () => {
      document.body.removeChild(portalContainer);
    };
  }, [portalContainer]);

  if (!report || !isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <ModalWrapper onClose={onClose} isOpen={isOpen}>
      <Statistic isModal={true} stat={report.state} />
    </ModalWrapper>,
    portalContainer,
  );
}

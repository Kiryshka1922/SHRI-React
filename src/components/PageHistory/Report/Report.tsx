import { useState } from "react";

import removeReportFromStorage from "../../../api/localStorage/DeleteReport";
import Button from "../../../shared/buttons/button";
import { type typeReport } from "../../../types/types";
import Modal from "../Modal/Modal";

import document from "./../../../../public/images/document.svg";
import good from "./../../../../public/images/good-sad.svg";
import sad from "./../../../../public/images/sad-mood.svg";
import cart from "./../../../../public/images/Trash.svg";
import style from "./style.module.css";

export default function Report({
  date,
  filename,
  isSuccessful,
  onDelete,
  id,
  testId
}: typeReport) {
  const [isModal, setModal] = useState<boolean>();
  const handleDelete = () => {
    try {
      removeReportFromStorage({
        id,
      });
      setTimeout(onDelete, 100);
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  return (
    <div data-testid={testId} className={style.report} onClick={() => {}}>
      <div className={style.report__info} onClick={() => {
        if(isSuccessful){
          setModal(true);
        }
      }}>
        <div className={style.report__info__document}>
          <img src={document} alt="file" />
          {filename}
        </div>
        <span>{String(date)}</span>
        <div
          className={style.report__info__status}
          style={isSuccessful ? { opacity: 1 } : { opacity: 0.5 }}
        >
          {" "}
          <span>Обработан успешно</span>
          <img src={good} alt="good" />
        </div>
        <div
          className={style.report__info__status}
          style={isSuccessful ? { opacity: 0.5 } : { opacity: 1 }}
        >
          <span>Не удалось обработать</span>
          <img src={sad} alt="sad" />
        </div>
      </div>
      <Button testId={`delete-${id}`} onClick={handleDelete} classes={["cart"]}>
        <img src={cart} alt="Cart" />
      </Button>
      {isModal && (
        <Modal
          isOpen={isModal}
          onClose={() => setModal((prev) => !prev)}
          id={id}
        />
      )}
    </div>
  );
}

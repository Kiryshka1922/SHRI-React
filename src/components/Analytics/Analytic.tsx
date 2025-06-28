import {
  useCallback,
  useState,
  type DragEvent,
  type ChangeEvent,
  useEffect,
} from "react";

import useStore from "../../api/hooks/useStore";
import writeReportToLocalStorage from "../../api/localStorage/WriteReport";
import Button from "../../shared/buttons/button";
import CustomError from "../../shared/States/Error/Error";
import Loader from "../../shared/States/Loader/Loader";
import Success from "../../shared/States/Suscess/Success";

import close from "./../../../public/images/cross-cancel.svg";
import Statistic from "./../PageAnalytics/Statistics/Statistics";
import style from "./style.module.css";

const ACCEPTED_FILE_TYPES = [
  "text/csv",
  "application/csv",
  "application/vnd.ms-excel",
  "text/x-csv",
  "text/comma-separated-values",
];

const validation = (file: File) => {
  return (
    ACCEPTED_FILE_TYPES.includes(file.type) &&
    file.name.toLowerCase().endsWith(".csv")
  );
};

const getFormatedDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Месяцы 0-11, поэтому +1
  const year = currentDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;

  return formattedDate;
};

export default function Analytic() {
  const [isDraging, setDragging] = useState<boolean>(false);
  const [validate, setValidate] = useState<boolean>(false);
  const {
    clearError,
    stat,
    getStatistics,
    setSuccessStatistics,
    metricsStatistics,
    clearStore,
    file,
    setFile,
  } = useStore();

  const { loading, error, isSuccess } = metricsStatistics;

  useEffect(() => {
    return () => {
      if (error || isSuccess) {
        const formattedDate = getFormatedDate();
        writeReportToLocalStorage({
          filename: file?.name,
          date: formattedDate,
          state: stat,
          isSuccess: error ? false : true,
        });
      }
      if (!loading) {
        clearError();
        clearStore();
        setValidate(false);
      }
      if (isSuccess) {
        setSuccessStatistics();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (file || validate) return;
      e.preventDefault();
      setDragging(true);
    },
    [file, validate],
  );

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (file || validate) return;
      e.preventDefault();
      setDragging(false);
    },
    [file, validate],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (file || validate) return;
      e.preventDefault();
      setDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (!droppedFile) return;

      if (validation(droppedFile)) {
        setFile(droppedFile);
        setValidate(false);
      } else {
        setFile(droppedFile);
        setValidate(true);
      }
    },
    [file, validate, setFile],
  );
  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    await getStatistics(formData);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFile = e.target.files[0];
    if (validation(selectedFile)) {
      setFile(selectedFile);
      setValidate(false);
    } else {
      setFile(selectedFile);
      setValidate(true);
    }
  };

  return (
    <div className={style.menu}>
      <div className={style.menu__settings}>
        <p>
          Загрузите <span>csv</span> файл и получите{" "}
          <span>полную информацию</span> о нём за сверхнизкое время
        </p>
        <div
          className={style.menu__settings__dropzone}
          style={
            validate
              ? {
                  background: "#FCE2FF",
                  border: "1px solid #FF5F00",
                  borderRadius: "40px",
                }
              : isDraging
                ? { background: "#D4FAE6" }
                : Boolean(file)
                  ? {
                      background: "#FCE2FF",
                      border: "1px solid black",
                      borderRadius: "40px",
                    }
                  : {}
          }
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {loading ? <Loader title="идет парсинг файла" /> : null}
          {error ? (
            <CustomError
              title={"Ошибка при парсинге"}
              errorTitle={file?.name}
              onClick={() => {
                const formattedDate = getFormatedDate();
                writeReportToLocalStorage({
                  filename: file?.name,
                  date: formattedDate,
                  state: stat,
                  isSuccess: false,
                });

                clearError();
                setFile(null);
                setValidate(false);
                clearStore();
              }}
            />
          ) : null}
          {isSuccess ? (
            <Success
              title="готово!"
              buttonTitle={file?.name}
              onClick={() => {
                const formattedDate = getFormatedDate();
                writeReportToLocalStorage({
                  filename: file?.name,
                  date: formattedDate,
                  state: stat,
                  isSuccess: true,
                });
                clearError();
                setFile(null);
                setValidate(false);

                setSuccessStatistics();
                clearStore();
              }}
            />
          ) : null}
          {!loading && !isSuccess && !error ? (
            <>
              {validate ? (
                <CustomError
                  title="Упс, не то ..."
                  errorTitle={file?.name}
                  onClick={() => {
                    setValidate(false);
                    setFile(null);
                  }}
                />
              ) : (
                <>
                  {!validate && file ? (
                    <div className={style.successful__buttons}>
                      <div>
                        <Button classes={["file"]}>{file.name}</Button>
                        <Button
                          classes={["close"]}
                          onClick={() => setFile(null)}
                        >
                          <img src={close} alt="close" />
                        </Button>
                      </div>
                      <span>файл загружен!</span>
                    </div>
                  ) : (
                    <>
                      <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileInputChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="fileInput">Загрузить файл</label>
                      <span>или перетащите сюда</span>
                    </>
                  )}
                </>
              )}
            </>
          ) : null}
        </div>
        <Button
          disabled={validate || !file}
          classes={["button-send"]}
          onClick={handleSubmit}
        >
          Отправить
        </Button>
      </div>
      <div className={style.menu__results}>
        {isSuccess || loading ? (
          <Statistic stat={stat} />
        ) : (
          <span>
            Здесь <br /> появятся хайлайты
          </span>
        )}
      </div>
    </div>
  );
}

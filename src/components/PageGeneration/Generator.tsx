import useStore from "../../api/hooks/useStore";
import Button from "../../shared/buttons/button";
import CustomError from "../../shared/States/Error/Error";
import Loader from "../../shared/States/Loader/Loader";
import Success from "../../shared/States/Suscess/Success";

import style from "./style.module.css";

export default function Generator() {
  const { metricsGeneration, clearError, getReport, setSuccessGeneration } =
    useStore();
  const { loading, isSuccess, error } = metricsGeneration;

  const handleSubmit = async () => {
    await getReport();
  };

  return (
    <div className={style.generate}>
      <p>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>

      {loading ? <Loader title="Идет процесс генерации" /> : null}
      {error ? (
        <CustomError
          title="Упс, не то ..."
          errorTitle="Ошибка"
          onClick={() => {
            clearError();
          }}
        />
      ) : null}

      {isSuccess ? (
        <Success
          title="Файл сгенерирован!"
          buttonTitle="Done!"
          onClick={() => {
            setSuccessGeneration();
          }}
        ></Success>
      ) : null}
      {!!isSuccess || !!error || !!loading || (
        <Button
          onClick={() => {
            handleSubmit();
          }}
          classes={["button-send"]}
        >
          Начать генерацию
        </Button>
      )}
    </div>
  );
}

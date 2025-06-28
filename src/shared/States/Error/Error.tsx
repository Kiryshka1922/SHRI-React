import close from "./../../../../public/images/cross-cancel.svg";
import Button from "./../../buttons/button";
import style from "./style.module.css";

type Props = {
  title: string;
  errorTitle: string | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function CustomError({ title, errorTitle, onClick }: Props) {
  return (
    <div className={style.error}>
      <div>
        <Button classes={["button-orange"]}>{errorTitle}</Button>
        <Button classes={["close"]} onClick={onClick}>
          <img src={close} alt="close" />
        </Button>
      </div>
      <span>{title}</span>
    </div>
  );
}

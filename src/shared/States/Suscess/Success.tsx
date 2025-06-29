import Button from "../../buttons/button";

import close from "./../../../../public/images/cross-cancel.svg";
import style from "./style.module.css";

type Props = {
  title: string;
  buttonTitle: string | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  testId?: string
};

export default function Success({ title, onClick, buttonTitle, testId }: Props) {
  return (
    <div>
      <div data-testid={testId} className={style.success}>
        <div>
          <Button classes={["button-done"]}>{buttonTitle}</Button>
          <Button testId="close-button" classes={["close"]} onClick={onClick}>
            <img src={close} alt="close" />
          </Button>
        </div>
        <span>{title}</span>
      </div>
    </div>
  );
}

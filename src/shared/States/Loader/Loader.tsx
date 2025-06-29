import Button from "../../buttons/button";

import loader from "./../../../../public/images/loader.svg";
import style from "./style.module.css";

export default function Loader({ title, testId }: { title: string, testId?: string }) {
  return (
    <div data-testid={testId} className={style.loader}>
      <Button classes={["file"]}>
        <img src={loader} alt="loader" />
      </Button>
      <span>{title}</span>
    </div>
  );
}

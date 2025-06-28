import Button from "../../buttons/button";

import loader from "./../../../../public/images/loader.svg";
import style from "./style.module.css";

export default function Loader({ title }: { title: string }) {
  return (
    <div className={style.loader}>
      <Button classes={["file"]}>
        <img src={loader} alt="��������" />
      </Button>
      <span>{title}</span>
    </div>
  );
}

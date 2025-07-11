import classNames from "classnames";
import { type ReactNode, type MouseEvent } from "react";

import styles from "./button.module.css";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  classes?: (keyof typeof styles | string)[];
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  children,
  disabled = false,
  onClick,
  classes = [],
}: Props) {
  const buttonClass = classNames(
    styles.button,
    ...classes.map((cls) => styles[cls as keyof typeof styles] || cls),
    {
      [styles.disabled]: disabled,
    },
  );

  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
}

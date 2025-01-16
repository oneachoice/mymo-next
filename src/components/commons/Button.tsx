import styles from "./Button.module.scss";

import { MouseEventHandler } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={styles["button"]} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

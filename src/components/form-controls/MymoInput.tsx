import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute
} from "react";

import styles from "./MymoInput.module.scss";

interface MymoInputProps {
  labelContent: string;
  id?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  feedback?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
}

/**
 * input을 관리하기 위한 컴포넌트입니다.
 */
export default function MymoInput(props: MymoInputProps) {

  return (
    <div className={styles["input-con"]}>
      <label className={styles["label"]} htmlFor={props.id}>
        {props.labelContent}
      </label>
      <input
        className={styles["input"]}
        name={props.name}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onBlur={props.onBlur}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        value={props.value}
      />
      {props.feedback && (
        <div className={styles["feedback"]}>{props.feedback}</div>
      )}
    </div>
  );
}

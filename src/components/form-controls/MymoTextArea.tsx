import styles from "./MymoTextarea.module.scss";

import { ChangeEventHandler, FocusEventHandler } from "react";

interface MymoTextAreaProps {
  labelContent: string;
  id?: string;
  name?: string;
  feedback?: string;
  placeholder?: string;
  regExp?: string;
  required?: boolean;
  defaultValue?: string;
  rows?: number;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  value?: string | number | readonly string[];
}

/**
 * textarea를 관리하기 위한 컴포넌트입니다.
 */
export default function MymoTextArea(props: MymoTextAreaProps) {
  return (
    <div className={styles["text-area-con"]}>
      <label className={styles["label"]} htmlFor={props.id}>
        {props.labelContent}
      </label>
      <textarea
        className={styles["text-area"]}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        required={props.required}
        defaultValue={props.defaultValue}
        onBlur={props.onBlur}
        rows={props.rows}
        value={props.value}
        onChange={props.onChange}
      />
      {props.feedback && (
        <div className={styles["feedback"]}>{props.feedback}</div>
      )}
    </div>
  );
}

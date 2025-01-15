import styles from "./MymoTextarea.module.scss";

import { FocusEventHandler, useCallback, useRef, useState } from "react";

interface MymoTextAreaProps {
  labelContent: string;
  id?: string;
  name?: string;
  feedback?: string;
  placeholder?: string;
  regExp?: string;
  required?: boolean;
  value?: string;
  rows?: number;
}

/**
 * textarea를 관리하기 위한 컴포넌트입니다.
 */
export default function MymoTextArea(props: MymoTextAreaProps) {
  const [isValid, setIsValid] = useState(true);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onBlurTextArea = useCallback<
    FocusEventHandler<HTMLTextAreaElement>
  >(() => {
    if (!props.regExp) return;
    const regExp = new RegExp(props.regExp);

    if (!textAreaRef.current || !textAreaRef.current.value) return;

    const textAreaValue = textAreaRef.current.value;

    setIsValid(() => regExp.test(textAreaValue));
  }, [props.regExp]);

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
        ref={textAreaRef}
        value={props.value}
        onBlur={onBlurTextArea}
        rows={props.rows}
      />
      <div className={styles["feedback"]} hidden={isValid}>
        {props.feedback}
      </div>
    </div>
  );
}

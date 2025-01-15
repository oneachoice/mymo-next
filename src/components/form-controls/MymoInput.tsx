import {
  FocusEventHandler,
  HTMLInputTypeAttribute,
  useCallback,
  useRef,
  useState,
} from "react";

import styles from "./MymoInput.module.scss";

interface MymoInputProps {
  labelContent: string;
  id?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  feedback?: string;
  placeholder?: string;
  regExp?: string;
  required?: boolean;
  value?: string;
}

/**
 * input을 관리하기 위한 컴포넌트입니다.
 */
export default function MymoInput(props: MymoInputProps) {
  const [isValid, setIsValid] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const onBlurInput = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (!props.regExp) return;
    const regExp = new RegExp(props.regExp);

    if (!inputRef.current || !inputRef.current.value) return;

    const inputValue = inputRef.current.value;

    setIsValid(() => regExp.test(inputValue));
  }, [props.regExp]);

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
        onBlur={onBlurInput}
        ref={inputRef}
        value={props.value}
      />
      <div className={styles["feedback"]} hidden={isValid}>
        {props.feedback}
      </div>
    </div>
  );
}

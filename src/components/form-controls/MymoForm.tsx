import styles from "./MymoForm.module.scss";

import { FormEventHandler, MouseEventHandler, PropsWithChildren } from "react";

interface MymoFormProps {
  cancelText?: string;
  submitText: string;
  formTitle: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onCancelClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmitClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * form을 관리하기 위한 컴포넌트입니다.
 */
export default function MymoForm(props: PropsWithChildren<MymoFormProps>) {
  return (
    <form onSubmit={props.onSubmit} className={styles["form-con"]}>
      <h1 className={styles["form__title"]}>{props.formTitle}</h1>
      {props.children}
      <div className={styles["button-con"]}>
        {props.cancelText && (
          <button
            onClick={props.onCancelClick}
            className={styles["cancel-button"]}
            type="button"
          >
            {props.cancelText}
          </button>
        )}
        <button
          onClick={props.onSubmitClick}
          className={styles["submit-button"]}
          type="submit"
        >
          {props.submitText}
        </button>
      </div>
    </form>
  );
}

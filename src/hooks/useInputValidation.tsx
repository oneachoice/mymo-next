import { ChangeEventHandler, FocusEventHandler, useCallback, useState } from "react";

export default function useInputValidation(regExp: RegExp, feedback: string) {
  const [feedbackState, setFeedbackState] = useState("");
  const [valueState, setValueState] = useState("");

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValueState(() => event.target.value);
    },
    []
  );

  const onBlur = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (regExp.test(valueState)) {
      setFeedbackState("");
    } else {
      setFeedbackState(feedback);
    }
  }, [feedback, regExp, valueState]);

  return {
    onChange,
    onBlur,
    feedbackState,
    valueState,
  };
}

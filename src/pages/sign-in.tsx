import MymoForm from "@/components/form-controls/MymoForm";
import MymoInput from "@/components/form-controls/MymoInput";
import AuthService from "@/service/AuthService";
import { FormEventHandler, useCallback } from "react";

import { useRouter } from "next/router";
import useInputValidation from "@/hooks/useInputValidation";

/**
 * 로그인 페이지입니다.
 */
export default function SignIn() {
  const router = useRouter();

  const {
    feedbackState: emailFeedback,
    valueState: emailValue,
    onBlur: onEmailBlur,
    onChange: onEmailChange,
  } = useInputValidation(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    "잘못된 이메일 양식"
  );

  const {
    feedbackState: passwordFeedback,
    valueState: passwordValue,
    onBlur: onPasswordBlur,
    onChange: onPasswordChange,
  } = useInputValidation(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$/,
    "특수문자, 대문자, 소문자, 숫자를 포함한 8자리 이상의 비밀번호여야합니다."
  );

  const isFormValid = !(emailFeedback || passwordFeedback);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      if (!isFormValid) return;

      (async () => {
        const authService: AuthService = AuthService.instance;

        try {
          const response = await authService.signIn(event.currentTarget);

          if (response.status >= 200 && response.status < 300) {
            router.push("/");
          }
        } catch {
          router.push("/sign-in");
        }
      })();
    },
    [router, isFormValid]
  );

  return (
    <div>
      <MymoForm onSubmit={onSubmit} submitText="확인" formTitle="로그인">
        <MymoInput
          labelContent="이메일"
          id="email"
          type="email"
          placeholder="mymo@mymo.com"
          name="email"
          required={true}
          feedback={emailFeedback}
          value={emailValue}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        <MymoInput
          labelContent="비밀번호"
          id="password"
          type="password"
          placeholder="********"
          name="password"
          required={true}
          feedback={passwordFeedback}
          value={passwordValue}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
        />
      </MymoForm>
    </div>
  );
}

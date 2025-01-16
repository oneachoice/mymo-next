import MymoForm from "@/components/form-controls/MymoForm";
import MymoInput from "@/components/form-controls/MymoInput";
import useInputValidation from "@/hooks/useInputValidation";
import AuthService from "@/service/AuthService";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback } from "react";

/**
 * 회원가입 페이지입니다.
 */
export default function SignUp() {
  const router = useRouter();

  const {
    feedbackState: nameFeedback,
    valueState: nameValue,
    onBlur: onNameBlur,
    onChange: onNameChange,
  } = useInputValidation(
    /^[가-힣a-zA-Z]+$/,
    "이름에는 한글 또는 영문만 올 수 있습니다."
  );

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

  const {
    feedbackState: passwordCheckFeedback,
    valueState: passwordCheckValue,
    onBlur: onPasswordCheckBlur,
    onChange: onPasswordCheckChange,
  } = useInputValidation(
    new RegExp(`^${passwordValue}$`),
    "입력하신 비밀번호와 일치하지 않습니다."
  );

  const isFormValid = !(
    nameFeedback ||
    emailFeedback ||
    passwordFeedback ||
    passwordCheckFeedback
  );

  const isPasswordEqual = passwordValue === passwordCheckValue;

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      if (!isFormValid) return;
      
      if (!isPasswordEqual) return;

      (async () => {
        const authService: AuthService = AuthService.instance;

        try {
          const response = await authService.signUp(event.currentTarget);

          if (response.status >= 200 && response.status < 300) {
            router.push("/sign-in");
          }

        } catch {
          router.push("/sign-up");
        }
      })();
    },
    [router, isPasswordEqual, isFormValid]
  );

  return (
    <div>
      <MymoForm onSubmit={onSubmit} submitText="확인" formTitle="회원가입">
        <MymoInput
          labelContent="이름"
          id="name"
          type="text"
          placeholder="Mymo"
          name="name"
          feedback={nameFeedback}
          value={nameValue}
          onChange={onNameChange}
          onBlur={onNameBlur}
          required={true}
        />
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
        <MymoInput
          labelContent="비밀번호 확인"
          id="password-check"
          placeholder="********"
          type="password"
          required={true}
          feedback={passwordCheckFeedback}
          value={passwordCheckValue}
          onChange={onPasswordCheckChange}
          onBlur={onPasswordCheckBlur}
        />
      </MymoForm>
    </div>
  );
}

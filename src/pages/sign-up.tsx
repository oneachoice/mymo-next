import MymoForm from "@/components/form-controls/MymoForm";
import MymoInput from "@/components/form-controls/MymoInput";
import AuthService from "@/service/AuthService";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback } from "react";

/**
 * 회원가입 페이지입니다.
 */
export default function SignUp() {
  const router = useRouter();

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      const authService: AuthService = AuthService.instance;

      authService.signUp(event.currentTarget).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          router.push("/sign-in");
        }
      });
    },
    [router]
  );

  return (
    <div>
      <MymoForm onSubmit={onSubmit} submitText="Sign Up" formTitle="Sign Up">
        <MymoInput
          labelContent="Name"
          id="name"
          type="text"
          feedback="Wrong name format"
          regExp="^[가-힣a-zA-Z]+$"
          required={true}
          placeholder="Mymo"
          name="name"
        />
        <MymoInput
          labelContent="Email"
          id="email"
          type="email"
          feedback="Wrong email format"
          regExp="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          required={true}
          placeholder="mymo@mymo.com"
          name="email"
        />
        <MymoInput
          labelContent="Password"
          id="password"
          type="password"
          feedback="Wrong password format"
          regExp="^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$"
          required={true}
          placeholder="********"
          name="password"
        />
        <MymoInput
          labelContent="Password Check"
          id="password-check"
          type="password"
          feedback="Wrong password format"
          regExp="^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,30}$"
          required={true}
          placeholder="********"
        />
      </MymoForm>
    </div>
  );
}

import MymoForm from "@/components/form-controls/MymoForm";
import MymoInput from "@/components/form-controls/MymoInput";
import AuthService from "@/service/AuthService";
import { FormEventHandler, useCallback } from "react";

import { useRouter } from "next/router";

/**
 * 로그인 페이지입니다.
 */
export default function SignIn() {
  const router = useRouter();

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      const authService: AuthService = AuthService.instance;

      authService.signIn(event.currentTarget).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          router.push("/");
        }
      });
    },
    [router]
  );

  return (
    <div>
      <MymoForm onSubmit={onSubmit} submitText="Sign In" formTitle="Sign In">
        <MymoInput
          labelContent="Email"
          id="email"
          name="email"
          type="email"
          feedback="Wrong email format"
          regExp="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          required={true}
          placeholder="mymo@mymo.com"
        />
        <MymoInput
          labelContent="Password"
          id="password"
          name="password"
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

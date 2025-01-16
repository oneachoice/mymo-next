import AuthRedirectionContainer from "@/components/containers/AuthRedirectionContainer";
import MymoForm from "@/components/form-controls/MymoForm";
import MymoInput from "@/components/form-controls/MymoInput";
import MymoTextArea from "@/components/form-controls/MymoTextArea";
import MemoService from "@/service/MemoService";
import { useRouter } from "next/router";
import { FormEventHandler, useCallback } from "react";

/**
 * 메모 작성 페이지
 */
export default function MymoWriting() {
  const router = useRouter();

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      MemoService.instance.create(event.currentTarget).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          router.push("/mymo");
        }
      });
    },
    [router]
  );

  return (
    <AuthRedirectionContainer redirect="/sign-in">
      <div>
        <MymoForm onSubmit={onSubmit} submitText="작성" formTitle="메모">
          <MymoInput
            labelContent="제목"
            name="title"
            required={true}
            id="title"
            type="text"
          />
          <MymoTextArea
            labelContent="내용"
            name="content"
            required={true}
            id="content"
            rows={25}
          />
        </MymoForm>
      </div>
    </AuthRedirectionContainer>
  );
}

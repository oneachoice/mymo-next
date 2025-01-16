import AuthRedirectionContainer from "@/components/containers/AuthRedirectionContainer";
import MymoForm from "@/components/form-controls/MymoForm";
import MymoInput from "@/components/form-controls/MymoInput";
import MymoTextArea from "@/components/form-controls/MymoTextArea";
import MemoDto from "@/dto/MemoDto";
import MemoService from "@/service/MemoService";
import { useRouter } from "next/router";
import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function MymoDetail() {
  const router = useRouter();

  const [memoDto, setMemoDto] = useState<MemoDto>();

  useEffect(() => {
    const memoService: MemoService = MemoService.instance;

    if (!router.query.memoId) return;

    memoService.readOne(+router.query.memoId).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setMemoDto(response.data);
      }
    }).catch(() => {
        router.push("/mymo");
    });
  }, [router]);

  const onSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      MemoService.instance.change(event.currentTarget).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          router.push("/mymo");
        }
      });
    },
    [router]
  );

  const onCancelClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    if (!memoDto?.id) return;
    MemoService.instance.remove(+memoDto?.id).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        router.push("/mymo");
      }
    });
  }, [router, memoDto]);

  return (
    <AuthRedirectionContainer redirect="/sign-in">
      <div>
        <MymoForm
          onSubmit={onSubmit}
          onCancelClick={onCancelClick}
          submitText="Change"
          cancelText="Delete"
          formTitle="Mymo"
        >
          <input name="id" type="text" value={memoDto?.id} hidden />
          <MymoInput
            labelContent="Title"
            name="title"
            required={true}
            id="title"
            type="text"
            defaultValue={memoDto?.title}
          />

          <MymoTextArea
            labelContent="Content"
            name="content"
            required={true}
            id="content"
            rows={25}
            defaultValue={memoDto?.content}
          />
        </MymoForm>
      </div>
    </AuthRedirectionContainer>
  );
}

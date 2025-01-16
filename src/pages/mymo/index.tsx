import LinkButton from "@/components/commons/LinkButton";
import PaginationBar from "@/components/commons/PaginationBar";
import AuthRedirectionContainer from "@/components/containers/AuthRedirectionContainer";
import MemoItem from "@/components/memo/MemoItem";
import MemoPageDto from "@/dto/MemoPageDto";
import AuthService from "@/service/AuthService";
import MemoService from "@/service/MemoService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * 메모 리스트 페이지
 */
export default function MymoList() {
  const router = useRouter();

  const [memoPageDto, setMemoPageDto] = useState<MemoPageDto>();

  useEffect(() => {
    if (!AuthService.instance.isSessionValid()) return;

    const memoService: MemoService = MemoService.instance;

    const page: number = router.query.page ? +router.query.page : 0;
    const size: number = router.query.size ? +router.query.size : 0;

    memoService.read(page, size).then((response) => {
      setMemoPageDto(response.data);
    });
  }, [router]);

  return (
    <AuthRedirectionContainer redirect="/sign-in">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginBottom: "1rem",
          }}
        >
          <LinkButton href="/mymo/write" text="Write" />
        </div>
        <ul>
          {memoPageDto?.content.map((memoDto) => {
            return <MemoItem key={memoDto.id} memoDto={memoDto} />;
          })}
        </ul>
        <PaginationBar
          number={memoPageDto?.number || 1}
          totalPages={memoPageDto?.totalPages || 1}
        />
      </div>
    </AuthRedirectionContainer>
  );
}

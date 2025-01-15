import { RootState } from "@/redux/store";
import { PropsWithChildren, ReactNode } from "react";
import { useSelector } from "react-redux";

interface AuthContainerProps {
  /** 로그아웃 상태에서 보여줄 컴포넌트 */
  fallback?: ReactNode;
}


/**
 * 로그인 여부에 따라 다르게 컴포넌트를 보여줄 때 사용합니다.
 */
export default function AuthFallbackContainer(
  props: PropsWithChildren<AuthContainerProps>
) {
  const status = useSelector((state: RootState )=> state.sign.status)

  return status ? props.children : props.fallback;
}

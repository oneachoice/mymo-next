import AuthService from "@/service/AuthService";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";

interface AuthRedirectionContainerProps {
  redirect: string;
}

export default function AuthRedirectionContainer(
  props: PropsWithChildren<AuthRedirectionContainerProps>
) {
  const router = useRouter();

  useEffect(() => {
    if (!AuthService.instance.isSessionValid()) router.push(props.redirect);
  }, [router, props.redirect]);

  return props.children;
}

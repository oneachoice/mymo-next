import AppLayout from "@/layouts/AppLayout";

import "@/styles/globals.scss";
import "@/styles/variables.scss";

import type { AppProps } from "next/app";

import { signIn, signOut } from "@/redux/signSlice";
import { store } from "@/redux/store";
import AuthService from "@/service/AuthService";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // 처음 접속 시 세션 체크 후 로그인 상태 관리
    if (AuthService.instance.isSessionValid()) {
      store.dispatch(signIn());
    } else {
      store.dispatch(signOut());
    }
  }, []);

  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

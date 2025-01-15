import AppHeader from "@/components/globals/AppHeader"; 

import styles from "./AppLayout.module.scss";

import { Varela_Round } from "next/font/google";
import { PropsWithChildren } from "react";


const verelaRound = Varela_Round({
  weight: ["400"],
  subsets: ["latin", "latin-ext"],
});

/**
 * 앱의 글로벌 레이아웃입니다.
 */
export default function AppLayout(props: PropsWithChildren) {
  return (
    <div className={styles["container"]} style={verelaRound.style}>
      <AppHeader />
      <main className={styles["main"]}>{props.children}</main>
    </div>
  );
}

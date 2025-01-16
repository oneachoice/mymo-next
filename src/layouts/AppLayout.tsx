import AppHeader from "@/components/globals/AppHeader";

import styles from "./AppLayout.module.scss";

import { Nanum_Gothic } from "next/font/google";
import { PropsWithChildren } from "react";



const nanumGothic = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

/**
 * 앱의 글로벌 레이아웃입니다.
 */
export default function AppLayout(props: PropsWithChildren) {
  return (
    <div className={styles["container"]} style={nanumGothic.style}>
      <AppHeader />
      <main className={styles["main"]}>{props.children}</main>
    </div>
  );
}
